import { GraphQLResolveInfo } from 'graphql';
import {
  brandWithType,
  createContextCache,
  MaybePromise,
  ObjectParam,
  OutputType,
  SchemaTypes,
} from '@pothos/core';
import { NodeObjectOptions } from '../types';
import { internalDecodeGlobalID, internalEncodeGlobalID } from './internal';

const getRequestCache = createContextCache(() => new Map<string, MaybePromise<unknown>>());

export async function resolveNodes<Types extends SchemaTypes>(
  builder: PothosSchemaTypes.SchemaBuilder<Types>,
  context: object,
  info: GraphQLResolveInfo,
  globalIDs: (string | null | undefined)[],
): Promise<MaybePromise<unknown>[]> {
  const requestCache = getRequestCache(context);
  const idsByType: Record<string, Map<string, string>> = {};
  const results: Record<string, unknown> = {};

  globalIDs.forEach((globalID, i) => {
    if (globalID == null) {
      return;
    }

    if (requestCache.has(globalID)) {
      results[globalID] = requestCache.get(globalID)!;
      return;
    }

    const { id, typename } = internalDecodeGlobalID(builder, globalID);

    idsByType[typename] = idsByType[typename] || new Map();
    idsByType[typename].set(id, globalID);
  });

  await Promise.all(
    Object.keys(idsByType).map(async (typename) => {
      const ids = [...idsByType[typename].keys()];
      const globalIds = [...idsByType[typename].values()];

      const config = builder.configStore.getTypeConfig(typename, 'Object');
      const options = config.pothosOptions as NodeObjectOptions<Types, ObjectParam<Types>, []>;
      const shouldBrandObjects =
        options.brandLoadedObjects ?? builder.options.relayOptions.brandLoadedObjects ?? false;

      const resultsForType = await resolveUncachedNodesForType(
        builder,
        context,
        info,
        ids,
        typename,
      );

      resultsForType.forEach((val, i) => {
        if (shouldBrandObjects) {
          brandWithType(val, typename as OutputType<Types>);
        }

        results[globalIds[i]] = val;
      });
    }),
  );

  return globalIDs.map((globalID) => (globalID == null ? null : results[globalID] ?? null));
}

export async function resolveUncachedNodesForType<Types extends SchemaTypes>(
  builder: PothosSchemaTypes.SchemaBuilder<Types>,
  context: object,
  info: GraphQLResolveInfo,
  ids: string[],
  type: OutputType<Types> | string,
): Promise<unknown[]> {
  const requestCache = getRequestCache(context);
  const config = builder.configStore.getTypeConfig(type, 'Object');
  const options = config.pothosOptions as NodeObjectOptions<Types, ObjectParam<Types>, []>;

  if (options.loadMany) {
    const loadManyPromise = Promise.resolve(options.loadMany(ids, context));

    return Promise.all(
      ids.map((id, i) => {
        const globalID = internalEncodeGlobalID(builder, config.name, id);
        const entryPromise = loadManyPromise
          .then((results: unknown[]) => results[i])
          .then((result: unknown) => {
            requestCache.set(globalID, result);

            return result;
          });

        requestCache.set(globalID, entryPromise);

        return entryPromise;
      }),
    );
  }

  if (options.loadOne) {
    return Promise.all(
      ids.map((id) => {
        const globalID = internalEncodeGlobalID(builder, config.name, id);
        const entryPromise = Promise.resolve(options.loadOne!(id, context)).then(
          (result: unknown) => {
            requestCache.set(globalID, result);

            return result;
          },
        );

        requestCache.set(globalID, entryPromise);

        return entryPromise;
      }),
    );
  }

  if (options.loadManyWithoutCache) {
    return options.loadManyWithoutCache(ids, context);
  }

  if (options.loadWithoutCache) {
    return Promise.all(
      ids.map((id) => Promise.resolve(options.loadWithoutCache!(id, context, info))),
    );
  }

  throw new Error(`${config.name} does not support loading by id`);
}
