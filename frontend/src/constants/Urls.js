export const baseUrl = 'http://localhost:3000/api';

const urls = {
   todos	: `${baseUrl}/todos`,
   login	: `${baseUrl}/Users/login?include=user`,
   getByName : (name, token) => {
     return `${urls[name]}${token ? `?access_token=${token}`: ''}`
   }
};

export default urls;
