const request = (url, options) =>
  new Promise((resolve, reject) => {
    if (!url) reject(new Error('URL parameter required'));
    if (!options) reject(new Error('Options parameter required'));
    fetch(url, options)
      .then(response =>
        response.text().then(text => {
          try {
            return text ? JSON.parse(text) : {};
          } catch (e) {
            return {};
          }
        }),
      )
      .then(response => {
        if (response.errors) reject(response.errors);
        else resolve(response);
      })
      .catch(res => {
        reject(res);
      });
  });
const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
const getDefaultHeader = () => ({
  headers: Object.assign({}, defaultHeaders),
});
const network = {
  /**
   * @function get
   * @description Make a HTTP GET request.
   * @param {string} path
   * @returns {promise}
   */
  get: path =>
    request(path, Object.assign({ method: 'GET' }, getDefaultHeader())),

  /**
   * @function post
   * @description Make a HTTP POST request.
   * @param {string} path
   * @param {object} body
   * @returns {promise}
   */
  post: (path, body) => {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    return request(path, options);
  },

  /**
   * @function put
   * @description Make a HTTP PUT request.
   * @param {string} path
   * @param {object} body
   * @returns {promise}
   */
  put: (path, body) => {
    const options = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    return request(path, options);
  },
  /**
   * @function patch
   * @description Make a HTTP PATCH request.
   * @param {string} path
   * @param {object} body
   * @returns {promise}
   */
  patch: (path, body = {}) => {
    const options = {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    return request(path, options);
  },
  /**
   * @function delete
   * @description Make a HTTP DELETE request.
   * @param {string} path
   * @param {object} body
   * @returns {promise}
   */
  delete: (path, body = {}) => {
    const options = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    return request(path, options);
  },
  /**
   * @function postForm
   * @description Make a HTTP POST request.
   * @param {string} path
   * @param {object} body
   * @returns {promise}
   */
  postForm: (path, body) => {
    const options = {
      method: 'POST',
      body,
    };
    return request(path, options);
  },
};

export default network;
