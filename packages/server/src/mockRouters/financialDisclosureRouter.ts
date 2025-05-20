import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const mockRouter = router({
  getAllFdReports: publicProcedure.query(() => {
    return [
        
    ];
  }),
});
