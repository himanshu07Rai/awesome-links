export const resolvers = {
  Query: {
    links: (_parent, _args, ctx) => {
      // console.log(ctx);
      // console.log("g", global);

      return ctx.prisma.link.findMany();
    },
  },
};
