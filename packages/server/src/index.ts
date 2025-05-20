import { initTRPC } from "@trpc/server";
import express from "express";
import { z } from "zod";
import { readAllFdXml } from "./scripts/retrieveFinancialDisclosureCollections";
import { router, publicProcedure } from "trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";

const app = express();

// Create context to add user information or other custom context
const createContext = ({
  req,
  res,
}: {
  req: express.Request;
  res: express.Response;
}) => {
  // Example of adding user data or any other custom context logic
  console.log("creating context");
  //   return {
  //     user: req.user, // Assuming req.user is populated by your authentication middleware
  //   };
};

// Initialize tRPC with context
const t = initTRPC.context<typeof createContext>().create();

const appRouter = router({
  userList: publicProcedure
    .input((val: unknown) => {
      return val as { name: string };
    })
    .query(async () => {
      // Retrieve users from a datasource, this is an imaginary database
      // const users = await db.user.findMany();
      // return users;
    }),
});
export type AppRouter = typeof appRouter;
// Define the tRPC router
// const appRouter = t.router({
//   getUserById: t.procedure
//     .input(z.string()) // Validate that the input is a string
//     .query(({ input, ctx }) => {
//       // `input` is validated to be a string, and `ctx` contains the context (e.g., user info)
//       console.log(input);
//       //   const userId = input;
//       //   const user = ctx.user || 'Unknown User'; // Access user info from context
//       //   return `User ID: ${userId}, User: ${user}`;
//     }),
// });

// Express setup
app.use(express.json());

// Setup the /trpc endpoint to handle requests
app.get("/trpc", async (req, res) => {
  const xmlData = await readAllFdXml();
  res.send(xmlData);
  //   try {
  //     // Create a caller for the tRPC router with the context (e.g., req, res)
  //     const caller = appRouter.createCaller({ req, res });

  //     // Call the getUserById procedure with the input from the request body
  //     const response = await caller.getUserById(req.body);

  //     res.json(response); // Send the response back to the client
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
});
app.listen(4000, () => {});
// const server = createHTTPServer({
//   router: appRouter,
// });

// server.listen(4000);
