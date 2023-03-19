
import axios from 'axios';
import { Urls } from '../config';

export const apiInstance = axios.create({
    baseURL: Urls.ApiUrl,
});