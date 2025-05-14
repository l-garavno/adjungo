import { http } from '../dist/index.js';

http.request({
  config: {
    url: 'https://postman-echo.com/get?test=123',
  },
});
