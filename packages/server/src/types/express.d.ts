// types/express.d.ts
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; name: string }; // Adjust the type based on your actual user model
    }
  }
}
