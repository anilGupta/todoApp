const helper = {
  getToken: state => {
    const {
      auth: {
        user: { token },
      },
    } = state();
    return token;
  },
};

export default helper;
