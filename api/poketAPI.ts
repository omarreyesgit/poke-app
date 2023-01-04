import axios from 'axios'

const poketAPI = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
})
export default poketAPI
