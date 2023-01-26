export default class movieService {
  constructor({
    movieRepository
  }){
    this.movieRepository = movieRepository
  }

  find(){
    return this.movieRepository.find()
  }
  
  create(data){
    return this.movieRepository.create(data)
  }
}