import test from 'node:test'
import assert from 'node:assert'
import { promisify } from 'node:util'
test('Movie Integration Test Suit', async(t) => {
  const testPort  = 9000

  // bad practice to set env variable in test
  process.env.PORT = testPort
  const {server} = await import('../../src/index.js')
  
  const testServerAddress = `http://localhost:${testPort}/movies`

  await t.test('it should create a movie list', async (t) => {
    const data ={
      title: "john wick",
      actor: "john@doe.com",
      genre: "action",
      year: "2014"
    }

    const request = await fetch(testServerAddress, {
      method: 'POST',
      body: JSON.stringify(data)
    })

    assert.deepStrictEqual(
      request.headers.get('content-type'),
      'application/json'
    )

    assert.strictEqual(request.status, 201)

    const result = await request.json()
    assert.deepStrictEqual(
      result.success, 
      "you created a movie",
      "It should return a valid text message"
    )

    assert.ok(
      result.id.length > 30,
      'id should ba a valid uuid'
    )
  })

  await promisify(server.close.bind(server))()
})