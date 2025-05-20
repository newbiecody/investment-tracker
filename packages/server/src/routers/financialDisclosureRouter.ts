import {z} from 'zod';
import {router, publicProcedure } from '../trpc';

export const fdRouter = router({
    getAllFdReports: publicProcedure.input(z.object({name: z.string()}))
})