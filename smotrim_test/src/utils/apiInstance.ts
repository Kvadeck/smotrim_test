import axios from 'axios'

const cdnApiInstance = axios.create({
  baseURL: 'https://cdnapi.smotrim.ru',
  timeout: 10000,
})

export default cdnApiInstance
