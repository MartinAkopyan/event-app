import axios from 'axios'

export const http = axios.create({
  baseURL: 'https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// const apiClient = axios.create({
//   baseURL: 'https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3',
//   withCredentials: false,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json'
//   }
// })

// export default {
//   getEvents() {
//     return apiClient.get('/events')
//   }
// }
