const
  request = (url, options) =>{
    return new Promise((resolve, reject) => {
      if (!url) reject(new Error('URL parameter required'));
      if (!options) reject(new Error('Options parameter required'));
      fetch(url, options)
        .then(response => {
          return response.json();
        })
        .then(response => {
          if (response.errors) reject(response.errors);
          else resolve(response);
        })
        .catch(res => {
          reject(res)
        });
    });
  },
  defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  getDefaultHeader = (authToken) => {
    return {
      headers : Object.assign({}, defaultHeaders, {'Authorization': `Bearer ${authToken}`})
    }
  },
  network = {
    /**
     * @function get
     * @description Make a HTTP GET request.
     * @param {string} path
     * @returns {promise}
     */
    get: (path, authToken) => {
      return request(path, Object.assign(
        {method: 'GET'},
        getDefaultHeader(authToken)
      ));
    },

    /**
     * @function post
     * @description Make a HTTP POST request.
     * @param {string} path
     * @param {object} body
     * @param {string} authToken
     * @returns {promise}
     */
    post: (path, body, authToken='') => {
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
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
     * @param {string} authToken
     * @returns {promise}
     */
    put: (path, body, authToken='') => {
      const options = {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
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
     * @param {string} authToken
     * @returns {promise}
     */
    patch: (path, body, authToken='') => {
      const options = {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
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
     * @param {string} authToken
     * @returns {promise}
     */
    delete: (path, body, authToken='') => {
      const options = {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(body),
      };
      return request(path, options);
    },
    postForm: (path, body, authToken) => {
      const options = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: body,
      };
      return request(path, options)
    }
  }

export default network;
