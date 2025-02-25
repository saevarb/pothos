import builder from '../builder';
import { db } from '../db';

const WithAuthInterface = builder.interfaceRef('WithAuthInterface').implement({
  fields: (t) => ({
    withAuthFromInterface: t.withAuth({ loggedIn: true }).boolean({
      nullable: true,
      resolve: (_, _args, ctx) => !!ctx.user.id,
    }),
  }),
});

const WithAuthObject = builder.objectRef('WithAuthObject').implement({
  interfaces: [WithAuthInterface],
  fields: (t) => ({
    withAuth: t.withAuth({ loggedIn: true }).boolean({
      nullable: true,
      resolve: (_, _args, ctx) => !!ctx.user.id,
    }),
  }),
});

builder.queryField('withAuth', (t) =>
  t.withAuth({ loggedIn: true }).boolean({
    nullable: true,
    resolve: (_, _args, ctx) => !!ctx.user.id,
  }),
);

builder.queryField('withAuthObject', (t) =>
  t.field({
    type: WithAuthObject,
    nullable: true,
    resolve: () => ({}),
  }),
);

builder.mutationField('withAuth', (t) =>
  t.withAuth({ loggedIn: true }).boolean({
    nullable: true,
    resolve: (_, _args, ctx) => !!ctx.user.id,
  }),
);

builder.subscriptionField('withAuth', (t) =>
  t.withAuth({ loggedIn: true }).boolean({
    nullable: true,
    // eslint-disable-next-line require-yield, @typescript-eslint/require-await
    subscribe: async function* subscribe() {
      return {};
    },
    resolve: (_, _args, ctx) => !!ctx.user.id,
  }),
);

builder.prismaObject('User', {
  authScopes: (user) => !!user.id,
  fields: (t) => ({
    id: t.exposeID('id'),
    firstName: t.exposeString('firstName'),
  }),
});

builder.queryField('withAuthPrismaUser', (t) =>
  t.withAuth({ loggedIn: true }).prismaField({
    type: 'User',
    nullable: true,
    resolve: (query, root, args, ctx) =>
      db.user.findUniqueOrThrow({
        ...query,
        where: { id: Number.parseInt(ctx.user.id, 10) },
      }),
  }),
);
