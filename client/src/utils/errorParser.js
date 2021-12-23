const errorParser = error => {
  try {
    if (error.response) {
      if (error.response.data) {
        if (error.response.data.message) {
          const str = error.response.data.message;
          if (typeof str !== 'string') throw new Error();
          return str;
        } else {
          const str = error.message;
          if (typeof str !== 'string') throw new Error();
          return str;
        }
      } else {
        const str = error.message;
        if (typeof str !== 'string') throw new Error();
        return str;
      }
    } else {
      const str = error.message;
      if (typeof str !== 'string') throw new Error();
      return str;
    }
  } catch (e) {
    return 'Request failed';
  }
};

export const messageParser = message => {
  try {
    if (message.message) {
      if (typeof message.message === 'string') {
        return message.message;
      }
      if (message.message.text) {
        const str = message.message.text;
        if (typeof str !== 'string') throw new Error();
        return str;
      }
      throw new Error();
    }
    throw new Error();
  } catch (error) {
    return String('Failed to parse message');
  }
};

export default errorParser;
