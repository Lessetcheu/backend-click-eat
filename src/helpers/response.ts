import type { Response } from 'express';

/**
 * Standardized API Response Handler
 *
 * Provides consistent response formatting across the entire application
 * with comprehensive HTTP status code support, logging, and metadata.
 *
 * @class ApiResponse
 * @version 2.0.0
 *
 * @example
 * // Success response
 * ApiResponse.success(res, 'User created successfully', userData, 201);
 *
 * @example
 * // Error response
 * ApiResponse.error(res, 'Validation failed', validationErrors, 422);
 *
 * @example
 * // Paginated response
 * ApiResponse.paginated(res, 'Users retrieved', users, paginationMeta);
 */
class ApiResponse {


  /**
   * Format error for client response
   *
   * @private
   * @static
   * @param {*} error - Error to format
   * @returns {Object|string|null} Formatted error
   */
  static formatError(error: unknown) {
    if (!error) return null;

    if (typeof error === 'object' && !(error instanceof Error)) {
      return error;
    }

    if (error instanceof Error) {
      if (process.env.NODE_ENV === 'production') {
        return {
          name: error.name,
          message: error.message,
        };
      }

      return {
        name: error.name,
        message: error.message,
        stack: error.stack,
      };
    }

    return String(error);
  }


  /**
   * Successful response
   *
   * @static
   * @param {Object} res - Express response object
   * @param {string} message - Success message
   * @param {*} data - Response data (optional)
   * @param {number} status - HTTP status code (default: 200)
   * @param {Object} meta - Additional metadata (optional)
   *
   * @example
   * ApiResponse.success(res, 'Operation completed', { id: 1 }, 200, { version: '1.0' });
   */
  static success<T = unknown>(
    res: Response,
    message: string,
    data: T | null = null,
    status = 200,
    meta: Record<string, unknown> = {},
  ) {
    const response = {
      meta: {
        status,
        message,
        timestamp: new Date().toISOString(),
        ...meta,
      },
      data,
      error: null,
    };

    return res.status(status).json(response);
  }

  /**
   * Error response
   *
   * @static
   * @param {Object} res - Express response object
   * @param {string} message - Error message
   * @param {*} error - Error details (optional)
   * @param {number} status - HTTP status code (default: 500)
   * @param {Object} meta - Additional metadata (optional)
   *
   * @example
   * ApiResponse.error(res, 'Database connection failed', error.stack, 503);
   */
  static error(
    res: Response,
    message: string,
    error: unknown = null,
    status = 500,
    meta: Record<string, unknown> = {},
  ) {

  const response = {
      meta: {
        status,
        message: message || 'Internal server error',
        timestamp: new Date().toISOString(),
        ...meta,
      },
      data: null,
      error: this.formatError(error),
    };

    return res.status(status).json(response);
  }


  /**
   * Created response (201)
   *
   * @static
   * @param {Object} res - Express response object
   * @param {string} message - Success message
   * @param {*} data - Created resource data
   * @param {Object} meta - Additional metadata (optional)
   */
  static created<T = unknown>(
    res: Response,
    message = 'Resource created successfully',
    data: T | null = null,
    meta: Record<string, unknown> = {},
  ) {

    return this.success(res, message, data, 201, meta);
  }

  

  /**
   * Validation Error response (422)
   *
   * @static
   * @param {Object} res - Express response object
   * @param {string} message - Error message (optional)
   * @param {*} error - Validation errors
   * @param {Object} meta - Additional metadata (optional)
   */
  static validationError(
    res: Response,
    message = 'Validation failed',
    error: unknown = null,
    meta: Record<string, unknown> = {},
  ) {

    return this.error(res, message, error, 422, meta);
  }


}

export default ApiResponse;
