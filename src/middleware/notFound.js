const notFound = (request, response, next) => {
  console.error('Resource not found');
  response.status(404).send({ message: 'Resource not found' });
};

module.exports = notFound;
