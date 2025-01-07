const routes = async (fastify, options) => {
  fastify.get('/', async (request, reply) => {
    return reply.view('index.ejs', {
      title: 'Main Page',
      content: 'This is main page.'
    });
  });

  fastify.get('/information', async (request, reply) => {
    if (request.user) { console.log("user: " + request.user) }
    return reply.view('information.ejs', {
      title: 'Information',
      content: 'This is information page.'
    });
  });

  fastify.get('/contact', async (request, reply) => {
    return reply.view('contact.ejs', {
      title: 'Contact',
      content: 'This is contact page.'
    });
  });
};

export default routes;