import SchemaBuilder from '@giraphql/core';
import '../../../src';

import { Character, ContextType, Droid, Human } from './backing-models';

type Types = {
  Objects: { Droid: Droid; Human: Human; String: string };
  Interfaces: { Character: Character };
  Context: ContextType;
};

export default new SchemaBuilder<Types>({
  plugins: ['GiraphQLMocks'],
});
