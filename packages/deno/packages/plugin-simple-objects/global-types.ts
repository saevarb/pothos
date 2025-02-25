// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FieldMap, FieldNullability, InputFieldMap, InterfaceParam, InterfaceRef, Normalize, ObjectRef, ParentShape, SchemaTypes, TypeParam, } from '../core/index.ts';
import { OutputShapeFromFields, SimpleObjectFieldsShape } from './types.ts';
import { PothosSimpleObjectsPlugin } from './index.ts';
declare global {
    export namespace PothosSchemaTypes {
        export interface Plugins<Types extends SchemaTypes> {
            simpleObjects: PothosSimpleObjectsPlugin<Types>;
        }
        export interface SchemaBuilder<Types extends SchemaTypes> {
            simpleObject: <Interfaces extends InterfaceParam<Types>[], Fields extends FieldMap, Shape extends Normalize<OutputShapeFromFields<Fields> & ParentShape<Types, Interfaces[number]>>>(name: string, options: SimpleObjectTypeOptions<Types, Interfaces, Fields, Shape>) => ObjectRef<Shape>;
            simpleInterface: <Fields extends FieldMap, Shape extends OutputShapeFromFields<Fields>, Interfaces extends InterfaceParam<SchemaTypes>[]>(name: string, options: SimpleInterfaceTypeOptions<Types, Fields, Shape, Interfaces>) => InterfaceRef<Shape>;
        }
        export interface PothosKindToGraphQLType {
            SimpleObject: "Object";
            SimpleInterface: "Interface";
        }
        export interface FieldOptionsByKind<Types extends SchemaTypes, ParentShape, Type extends TypeParam<Types>, Nullable extends FieldNullability<Type>, Args extends InputFieldMap, ResolveShape, ResolveReturnShape> {
            SimpleObject: Omit<ObjectFieldOptions<Types, ParentShape, Type, Nullable, Args, ResolveReturnShape>, "resolve">;
            SimpleInterface: Omit<InterfaceFieldOptions<Types, ParentShape, Type, Nullable, Args, ResolveReturnShape>, "resolve">;
        }
        export type SimpleObjectTypeOptions<Types extends SchemaTypes, Interfaces extends InterfaceParam<Types>[], Fields extends FieldMap, Shape> = Omit<ObjectTypeOptions<Types, Shape> | ObjectTypeWithInterfaceOptions<Types, Shape, Interfaces>, "fields"> & {
            fields?: SimpleObjectFieldsShape<Types, Fields>;
        };
        export interface SimpleInterfaceTypeOptions<Types extends SchemaTypes, Fields extends FieldMap, Shape extends OutputShapeFromFields<Fields>, Interfaces extends InterfaceParam<SchemaTypes>[]> extends Omit<InterfaceTypeOptions<Types, Shape, Interfaces>, "args" | "fields"> {
            fields?: SimpleObjectFieldsShape<Types, Fields>;
        }
    }
}
