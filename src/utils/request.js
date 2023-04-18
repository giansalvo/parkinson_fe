import axios from 'axios';
import { GetItem } from "./storage";

const request = async (options, isAuthenticated = true, isMultipartFormData = false) => {

  let header = {
    'Content-Type': isMultipartFormData ? 'multipart/form-data' : 'application/json',
  }

  if (isAuthenticated) {
    const token = GetItem('auth_token')
    header['Authorization'] = `Bearer ${token}`
  }

  // console.log('header: ', header)
  // console.log('options: ', options)
  const client = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: header,
    timeout: 20000,
  });

  const onSuccess = (response) => {
    // log.info('request onSuccess')
    // log.debug('response data:', response.data)
    return response;
  };

  const onError = (error) => {
    // log.info('request onError', error)
    const errorKey = error.response?.data?.error?.localized_error || error.message
    // log.debug('errorKey: ', errorKey)
    // log.debug('error.response?.data', error.response?.data)
    // @ts-ignore
    // const errorMessage = strings(it[errorKey])
    const apiError = {
      localizedMessage: error.toString(),
      statusCode: error.response?.data?.status_code,
      errorCode: error.response?.data?.error?.code
    }
    // log.debug('ApiError: ', apiError)
    return Promise.reject(apiError);
  };

  return client(options)
    .then(onSuccess)
    .catch(onError);
};

export default request;
