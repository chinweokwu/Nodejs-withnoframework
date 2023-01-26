import {parse} from "node:url"
import { DEFAULT_HEADER } from "./utils/util.js"
import {routes} from './routes/movieRoute.js'
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url'
import { generateInstance} from './factories/movieFactory.js'

const currentDir = dirname(
  fileURLToPath(
    import.meta.url
  )
)
  
const filePath = join(currentDir, './../database', 'data.json')

const movieService = generateInstance({
  filePath
})

const movieRoutes = routes({
  movieService
})

const allRoutes =  {
  ...movieRoutes,

  // 404 routes
  default: (req, res) => {
    res.writeHead(404,  DEFAULT_HEADER)
    res.write("oops!, 404 error not found")
    res.end()
  }
}


function handler(req, res) {
  const {url, method} = req;
  const {pathname}  = parse(url,true);
  const key = `${pathname}:${method.toLowerCase()}`
  const chosen = allRoutes[key] || allRoutes.default
  return Promise.resolve(chosen(req, res))
  .catch(handlerError(res))
}

function handlerError(res){
  return error => {
    console.log("bad request", error.stack)
    res.writeHead(500, DEFAULT_HEADER)
    res.write(JSON.stringify({error: "Internal Server Error"}))
  }
  return res.end()
}

export default handler

