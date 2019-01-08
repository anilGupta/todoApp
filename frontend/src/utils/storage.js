const isAvailable = (function isAvailableIffe() {
  const test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
})();

const Stroage = {
  get(key) {
    if (isAvailable) {
      const val = localStorage.getItem(key);
      try {
        return JSON.parse(val);
      } catch (error) {
        return val;
      }
    }
    return null;
  },

  set(key, value) {
    if (isAvailable) {
      return localStorage.setItem(key, JSON.stringify(value));
    }
    return null;
  },

  delete(key) {
    if (isAvailable) {
      localStorage.removeItem(key);
    }
    return null;
  },
};

export default Stroage;
