import axios from 'axios';

const createClient = ({ host, port }) => {
  return axios.create({
    baseURL: `http://${host}:${port}`,
  })
}

export default createClient;
