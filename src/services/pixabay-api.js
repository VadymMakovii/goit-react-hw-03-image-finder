import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '30847367-b1dc05b2e3ce029cb21abd284';

export const getImages = async request => {
  const response = await axios.get(
    `?key=${API_KEY}&q=${request}&page=1&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};

export const addImages = async (request, page) => {
  const response = await axios.get(
    `?key=${API_KEY}&q=${request}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};
