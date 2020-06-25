import axios from 'axios';
import { api } from '../settings';

export const getIPLatLng = () => axios.get(`${api.rest}geo/`);
