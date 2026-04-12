export const config = {
  baseURL: process.env.BASE_URL || 'https://sauce-demo.myshopify.com',

  credentials: {
    email: process.env.USER_EMAIL || '',
    password: process.env.USER_PASSWORD || '',
  },

  timeouts: {
    defaultTimeout: Number(process.env.DEFAULT_TIMEOUT) || 30000,
    navigationTimeout: Number(process.env.NAVIGATION_TIMEOUT) || 30000,
    actionTimeout: Number(process.env.ACTION_TIMEOUT) || 10000,
  },
};
