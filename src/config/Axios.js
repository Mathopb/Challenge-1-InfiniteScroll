import axios from 'axios';

export default axios.create({
    baseURL: 'https://rinkeby-api.opensea.io/api/v1/'
});