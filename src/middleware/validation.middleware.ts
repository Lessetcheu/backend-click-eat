import { NextFunction, Response, Request } from "express";
import type { FileArray } from "express-fileupload";
import ApiResponse from "../helpers/response.js";

export interface ValidationSchema<T = unknown> {
  validate(
    data: unknown,
    options?: {
      abortEarly?: boolean;
      stripUnknown?: boolean;
    },
  ): Promise<T>;
}


const validate = (schema: ValidationSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const requestWithFiles = req as Request & { files?: FileArray };
    try {
      const data = {
        body: req.body || {},
        params: req.params || {},
        query: req.query || {},
        files: requestWithFiles.files || {},
      };

      await schema.validate(
        data,
        {
          abortEarly: false,
          stripUnknown: true,
        },
      ) as {
        body?: unknown;
        params?: unknown;
        query?: unknown;
        files?: unknown;
      };

      next();
    } catch (error: any) {
      if (error.inner && Array.isArray(error.inner) && error.inner.length > 0) {
        const _error = error.inner.reduce((acc: Record<string, unknown>, currValue: { path?: string; message: string }) => {
          if (currValue.path) {
            // Supprime le préfixe (body., params., query., files.)
            const cleanPath = currValue.path.replace(/^(body|params|query|files)\./, '');
            const message = currValue.message.replace(/^(body|params|query|files)\./, '');

            if (!acc[cleanPath]) {
              acc[cleanPath] = message;
            }
          }
          return acc;
        }, {} as Record<string, unknown>);
        return;
      }

      // For other errors (eg: ValidationError files)
      const rawPath = typeof error.path === 'string' ? error.path : 'error';
      const rawMessage = typeof error.message === 'string' ? error.message : 'Validation error';

      const cleanPath = rawPath.replace(/^(body|params|query|files)\./, '');
      const message = rawMessage.replace(/^(body|params|query|files)\./, '');

      ApiResponse.error(res, "Échec de la validation.", { [cleanPath]: message }, 422);
    }
  };
};

export default validate;
