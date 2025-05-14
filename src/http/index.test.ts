import { describe, expect, test, vi } from 'vitest';
import { get, request } from './index.js';

describe('http', () => {
  describe('get', () => {
    test('should able to get data', async () => {
      const testString = `test@${Date.now()}.${Math.random()}`;
      const response = await get<{
        args: {
          test: string;
        };
      }>(`https://postman-echo.com/get?test=${testString}`);
      expect(response).toBeDefined();
      expect(response?.args.test).toBe(testString);
    });

    test('should thro w an error if the request fails', async () => {
      await expect(get('https://postman-echo.com/get121')).rejects.toThrow();
    });

    test('should handle errors', async () => {
      const errorHandler = vi.fn();
      await get('https://postman-echo.com/get123', {
        errorHandler,
      });
      expect(errorHandler).toHaveBeenCalled();
    });
  });

  describe('request', () => {
    test('should able to request data', async () => {
      const testString = `test@${Date.now()}.${Math.random()}`;
      const response = await request<{
        data: {
          test: string;
        };
      }>({
        method: 'POST',
        url: 'https://postman-echo.com/post',
        data: JSON.stringify({ test: testString }),
      });
      expect(response).toBeDefined();
      expect(response?.data.test).toBe(testString);
    });

    test('should throw an error if the request fails', async () => {
      await expect(
        request({
          method: 'POST',
          url: 'https://postman-echo.com/post123',
        }),
      ).rejects.toThrow();
    });

    test('should handle errors', async () => {
      const errorHandler = vi.fn();
      await request({
        method: 'POST',
        url: 'https://postman-echo.com/post123',
        errorHandler,
      });
      expect(errorHandler).toHaveBeenCalled();
    });
  });
});
