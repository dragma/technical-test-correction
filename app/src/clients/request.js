import axios from 'axios';

const createClient = ({ host, port }) => axios.create({
  baseURL: `http://${host}:${port}`,
});

export default createClient;
