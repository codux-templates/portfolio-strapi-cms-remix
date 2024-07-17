module.exports = () => ({
  //https://docs.strapi.io/dev-docs/plugins/documentation
  documentation: {
    enabled: true,
    servers: [{ url: 'http://localhost:5000/api', description: 'Development server' }],
    config: {
      'x-strapi-config': {
        plugins: []
      }
    }
  }
});
