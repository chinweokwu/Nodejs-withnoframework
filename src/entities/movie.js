import {randomUUID} from 'node:crypto';
export default class Movie {
  constructor({ title, actor, genre, year}){
    this.id = randomUUID()
    this.title = title
    this.actor = actor
    this.genre = genre
    this.year = year
  }
}