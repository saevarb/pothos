import {
  DocumentNode,
  GraphQLResolveInfo,
  GraphQLSchema,
  Kind,
  OperationDefinitionNode,
  parse,
} from 'graphql';
import { complexityFromSelectionSet } from './calculate-complexity';

export const DEFAULT_COMPLEXITY = 1;
export const DEFAULT_LIST_MULTIPLIER = 10;

export function complexityFromQuery(
  query: string | DocumentNode,
  options: {
    schema: GraphQLSchema;
    ctx?: {};
    variables?: Record<string, unknown>;
  },
) {
  const parsedQuery = typeof query === 'string' ? parse(query) : query;

  const operation = parsedQuery.definitions.find(
    (def) => def.kind === Kind.OPERATION_DEFINITION,
  ) as OperationDefinitionNode;

  if (!operation) {
    throw new Error('No operation found');
  }

  const fragments = parsedQuery.definitions.reduce<GraphQLResolveInfo['fragments']>(
    (fragments, def) => {
      if (def.kind === Kind.FRAGMENT_DEFINITION) {
        // eslint-disable-next-line no-param-reassign
        fragments[def.name.value] = def;
      }

      return fragments;
    },
    {},
  );

  const rootType = options.schema.getType(
    operation.operation.slice(0, 1).toUpperCase() + operation.operation.slice(1),
  );

  if (!rootType) {
    throw new Error(`No root type found for operation ${operation.operation}`);
  }

  const info = {
    schema: options.schema,
    fragments,
    variableValues: options.variables ?? {},
  };

  return complexityFromSelectionSet(options.ctx ?? {}, info, operation.selectionSet, rootType);
}
