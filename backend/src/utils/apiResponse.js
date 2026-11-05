/**
 * Unit IV: REST API Response Standardizer
 * Ensures uniform JSON structure across all API endpoints:
 * { success: true, statusCode: 200, message: "...", data: ..., pagination?: ... }
 */
export class ApiResponse {
  constructor(statusCode, data, message = 'Success', pagination = null) {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
    if (pagination) {
      this.pagination = pagination;
    }
  }
}
