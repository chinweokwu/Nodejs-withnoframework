import { readFile, writeFile } from 'node:fs/promises';

export default class MovieRepository {
  constructor({ file }) {
    this.file = file;
  }

  async #currentFileContent() {
    return JSON.parse(await readFile(this.file));
  }

  async find() {
    return this.#currentFileContent()
  }

  async create(data) {
    const currentFile = await this.#currentFileContent();
    currentFile.push(data);
    await writeFile(this.file, JSON.stringify(currentFile));
    return data.id;
  }
}

// const movieRepository = new MovieRepository({
//   file: "./../database/data.json"
// })

// console.log(
//   await movieRepository.create({
//     id: 2,
//     title: 'Avatar the way of water'
//   })
// )

// console.log(
//  await movieRepository.find()
// )

  