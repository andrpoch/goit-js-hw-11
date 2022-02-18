import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = 'key=25752976-c432b2b3d55e7cabed38c70ac';
const PARAMETERS = 'image_type=photo&orientation=horizontal&safesearch=true';
const PER_PAGE = 'per_page=40';

const fetchImages = async (value,page) => {
   const res = await axios.get(`?${API_KEY}&q=${value}&${PARAMETERS}&page=${page}&${PER_PAGE}`);
   return res.data;
}

export { fetchImages };
