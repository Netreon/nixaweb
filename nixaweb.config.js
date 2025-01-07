export default {
  port: 3000,
  siteTitle: "Nixaut",
  security: {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
    rateLimit: {
      max: 120,
      timeWindow: '1 minute'
    },
    helmet: {
      contentSecurityPolicy: false 
    }
  },
  speed: {
    compression: { 
      global: true,
      zlibOptions: { level: 9 }
    }
  },
  auth: {
    providers: [],
  },
};
