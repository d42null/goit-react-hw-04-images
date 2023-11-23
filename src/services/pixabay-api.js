import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const searchParams = new URLSearchParams({
  key: '40338048-f2df00ec937fbdd3c696643bf',
  image_type: 'photo',
  orientation: 'horizontal',
  // per_page: 12,
});
export const getImagesBySearchQuery = async (q, p = 1, per_page = 12) => {
  searchParams.set('q', q);
  searchParams.set('per_page', per_page);
  searchParams.set('page', p);
  const resp = await axios.get(`?${searchParams}`);
  return await resp.data;
};
