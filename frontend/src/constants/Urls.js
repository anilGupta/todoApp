export const baseUrl = 'http://localhost:3000/api';

const urls = {
   todos	: `${baseUrl}/Todos`,
   login	: `${baseUrl}/Users/login?include=user`,
   signup	: `${baseUrl}/Users`,
   logout	: `${baseUrl}/Users/logout`,
   remove	: `${baseUrl}/Attachments/CONTAINER_NAME/files`,
   upload	: `${baseUrl}/Attachments/CONTAINER_NAME/upload`,
   getByName : (name, token) => {
     return `${urls[name]}${token ? `?access_token=${token}`: ''}`
   }
};

export default urls;
