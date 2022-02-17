import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '25752976-c432b2b3d55e7cabed38c70ac';
const PARAMETERS = 'image_type=photo&orientation=horizontal&safesearch=true';
const PER_PAGE = 'per_page=40';
let PAGE = 1;

const getImages = (value) => {
   return axios.get(`?${API_KEY}&q=${value}&${PARAMETERS}&page=${PAGE}&${PER_PAGE}`).then(res => res.data);
}