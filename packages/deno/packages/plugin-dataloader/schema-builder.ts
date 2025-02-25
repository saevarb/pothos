// @ts-nocheck
import SchemaBuilder, { InterfaceParam, ObjectParam, SchemaTypes, ShapeFromTypeParam, } from '../core/index.ts';
import { ImplementableLoadableNodeRef } from './refs/index.ts';
import { ImplementableLoadableInterfaceRef } from './refs/interface.ts';
import { ImplementableLoadableObjectRef } from './refs/object.ts';
import { LoadableUnionRef } from './refs/union.ts';
import { DataloaderObjectTypeOptions, LoadableNodeOptions } from './types.ts';
import { dataloaderGetter, DataloaderKey, LoadableInterfaceOptions, LoadableUnionOptions } from './index.ts';
const schemaBuilderProto = SchemaBuilder.prototype as PothosSchemaTypes.SchemaBuilder<SchemaTypes>;
schemaBuilderProto.loadableObjectRef = function loadableObjectRef(name, options) {
    return new ImplementableLoadableObjectRef(this, name, options);
};
schemaBuilderProto.loadableInterfaceRef = function loadableInterfaceRef(name, options) {
    return new ImplementableLoadableInterfaceRef(this, name, options);
};
schemaBuilderProto.loadableNodeRef = function loadableNodeRef(name, options) {
    return new ImplementableLoadableNodeRef(this, name, options);
};
schemaBuilderProto.loadableObject = function loadableObject<Shape extends NameOrRef extends ObjectParam<SchemaTypes> ? ShapeFromTypeParam<SchemaTypes, NameOrRef, false> : object, Key extends DataloaderKey, Interfaces extends InterfaceParam<SchemaTypes>[], NameOrRef extends ObjectParam<SchemaTypes> | string, CacheKey = Key>(nameOrRef: NameOrRef, options: DataloaderObjectTypeOptions<SchemaTypes, Shape, Key, Interfaces, NameOrRef, CacheKey>) {
    const name = typeof nameOrRef === "string"
        ? nameOrRef
        : (options as {
            name?: string;
        }).name ?? (nameOrRef as {
            name: string;
        }).name;
    const ref = new ImplementableLoadableObjectRef<SchemaTypes, Shape | Key, Shape, Key, CacheKey>(this, name, options);
    ref.implement(options);
    if (typeof nameOrRef !== "string") {
        this.configStore.associateRefWithName(nameOrRef, name);
    }
    return ref;
};
schemaBuilderProto.loadableInterface = function loadableInterface<Shape extends NameOrRef extends InterfaceParam<SchemaTypes> ? ShapeFromTypeParam<SchemaTypes, NameOrRef, false> : object, Key extends DataloaderKey, Interfaces extends InterfaceParam<SchemaTypes>[], NameOrRef extends InterfaceParam<SchemaTypes> | string, CacheKey = Key>(nameOrRef: NameOrRef, options: LoadableInterfaceOptions<SchemaTypes, Shape, Key, Interfaces, NameOrRef, CacheKey>) {
    const name = typeof nameOrRef === "string"
        ? nameOrRef
        : (options as {
            name?: string;
        }).name ?? (nameOrRef as {
            name: string;
        }).name;
    const ref = new ImplementableLoadableInterfaceRef<SchemaTypes, Shape, Shape, Key, CacheKey>(this, name, options);
    ref.implement(options);
    if (typeof nameOrRef !== "string") {
        this.configStore.associateRefWithName(nameOrRef, name);
    }
    return ref;
};
schemaBuilderProto.loadableUnion = function loadableUnion<Key extends DataloaderKey, Member extends ObjectParam<SchemaTypes>, CacheKey = Key, Shape = ShapeFromTypeParam<SchemaTypes, Member, false>>(name: string, { load, toKey, sort, cacheResolved, loaderOptions, ...options }: LoadableUnionOptions<SchemaTypes, Key, Member, CacheKey, Shape>) {
    const getDataloader = dataloaderGetter<Key, Shape, CacheKey>(loaderOptions, load, toKey, sort);
    const ref = new LoadableUnionRef<SchemaTypes, Shape, Shape, Key, CacheKey>(name, getDataloader);
    this.unionType(name, {
        ...options,
        extensions: {
            getDataloader,
            cacheResolved: typeof cacheResolved === "function" ? cacheResolved : cacheResolved && toKey,
        },
    });
    this.configStore.associateRefWithName(ref, name);
    return ref;
};
const TloadableNode = schemaBuilderProto.loadableNode;
schemaBuilderProto.loadableNode = function loadableNode<Shape extends NameOrRef extends ObjectParam<SchemaTypes> ? ShapeFromTypeParam<SchemaTypes, NameOrRef, false> : object, Key extends DataloaderKey, Interfaces extends InterfaceParam<SchemaTypes>[], NameOrRef extends ObjectParam<SchemaTypes> | string, CacheKey = Key>(this: PothosSchemaTypes.SchemaBuilder<SchemaTypes>, nameOrRef: NameOrRef, options: LoadableNodeOptions<SchemaTypes, Shape, Key, Interfaces, NameOrRef, CacheKey>) {
    if (typeof (this as PothosSchemaTypes.SchemaBuilder<SchemaTypes> & Record<string, unknown>)
        .nodeInterfaceRef !== "function") {
        throw new TypeError("builder.loadableNode requires @pothos/plugin-relay to be installed");
    }
    const name = typeof nameOrRef === "string"
        ? nameOrRef
        : (options as {
            name?: string;
        }).name ?? (nameOrRef as {
            name: string;
        }).name;
    const ref = new ImplementableLoadableNodeRef<SchemaTypes, Shape, Shape, Key, CacheKey>(this, name, options);
    ref.implement(options);
    if (typeof nameOrRef !== "string") {
        this.configStore.associateRefWithName(nameOrRef, name);
    }
    return ref;
} as unknown as typeof TloadableNode;
