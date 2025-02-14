import { Request, Response } from 'express';

export const handleError = (res: Response, error: any, customMessage?: string) => {
  res.status(500).json({
    errors: [
      {
        type: "server",
        msg: error.message || "An internal server error occurred. Please try again later.",
        details: customMessage || "Unknown error",
        timestamp: new Date().toISOString(),
      },
    ],
  })
}
