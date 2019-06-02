var app = require('../app')
var request = require('supertest')
var shell = require('shelljs')

describe("Application", () => {
  describe("Root path", () => {
    test("Shows a welcome page", () => {
      return request(app).get("/")
        .then(response => {
          expect(response.status).toBe(200)
        })
    })
  })
})
