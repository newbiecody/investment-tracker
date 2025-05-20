// import { TRPCError } from "@trpc/server";
// import { middleware } from "trpc";

// export const isAuthed = middleware<Context>(async ({ ctx, next }) => {
//     if (!ctx.user) {
//       throw new TRPCError({ code: 'UNAUTHORIZED' });
//     }
  
//     return next({
//       ctx: {
//         // Narrow down the context to say user is definitely present
//         user: ctx.user,
//       },
//     });
//   });