import MovieRepository from '../repositories/movieRepository.js';
import MovieService from '../services/movieService.js';

const generateInstance = ({
  filePath
}) => {
  const movieRepository = new MovieRepository({
    file: filePath
  })

  const movieService = new MovieService({
    movieRepository
  })
  return movieService
}

export { generateInstance }