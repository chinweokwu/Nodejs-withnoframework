import {once} from 'node:events';
import Movie from '../entities/movie.js';
import { DEFAULT_HEADER } from '../utils/util.js';

const routes = ({movieService}) => ({
  // GET routes
  '/movies:get':  async (req, res) => {
    const movies = await movieService.find()
    res.writeHead(200, {"content-type":"application/json"})
    res.write(JSON.stringify({result: movies}))
    return res.end()
  },

  '/movies:post':  async (req, res) => {
    const data  = await once(req, 'data')
    const item = JSON.parse(data)
    const movie = new Movie(item)
    const id = await movieService.create(movie)
    res.writeHead(201, DEFAULT_HEADER)
    res.write(JSON.stringify({
      id,
      success: "you created a movie"}))
    res.end()
  }
})

export {routes}
