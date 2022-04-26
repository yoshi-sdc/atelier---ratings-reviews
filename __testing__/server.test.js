const request = require('supertest');
const assert = require('assert');
const express = require('express');

const { app } = require('../server/index.js')
jest.setTimeout(20000);

describe('Reviews endpoint', (done) => {
  test('should return reviews for product_id', async () => {
    const mockRequest = {
      body: {
        "product_id": 5,
        "count": 2,
        "page": 2,
        "sort": "helpful"
      }
    }
    const res = await request(app)

    .get('/reviews').send(mockRequest)
    .set("accept", "application/json")
    .type('json')
      expect(res.statusCode).toBe(200)
  })
})
// Reviews endpoint receives an object
// describe('Reviews endpoint', (done) => {
//   test('should return reviews for product_id', async () => {
//     const mockRequest = {
//       body: {
//         "product_id": 5,
//         "count": 2,
//         "page": 2,
//         "sort": "helpful"
//       }
//     }
//     const res = await request(app)

//     .get('/reviews').send(mockRequest)
//     .set("accept", "application/json")
//     .type('json')
//       expect(res).toBe()
//   })
// })

// // tests sending a review
// describe('Reviews endpoint', (done) => {
//   test('should return reviews for product_id', async () => {
//     const mockRequest = {
//       body: {
//         "product_id": 2,
//         "count": 2,
//         "page": 2,
//         "sort": "helpful"
//       }
//     }
//     const res = await request(app)
//     .post('/reviews')
//       expect(res.statusCode).toBe(200)
//   })
// })


describe('Helpfulness endpoint status code', (done) => {
  test('should return "succesfully posted"', async () => {
    const res = await request(app)
    .put('/reviews/2/helpful')
      expect(res.statusCode).toBe(200)
    })
  })

  describe('Helpfulness endpoint response', (done) => {
    test('should return "succesfully posted"', async () => {
      const res = await request(app)
      .put('/reviews/2/helpful')
        expect(res.text).toBe('helpful')
      })
    })


describe('Report endpoint status code', (done) => {
  test('should return "succesfully reported!"', async () => {
    const res = await request(app)
    .put('/reviews/2/report')
      expect(res.statusCode).toBe(200)
    })
  })

describe('Report endpoint response', (done) => {
  test('should return "succesfully reported!"', async () => {
    const res = await request(app)
    .put('/reviews/2/report')
      expect(res.text).toBe('successfully reported!')
    })
  })



  // {
  //   product: 2,
  //   page: 1,
  //   count: '5',
  //   results: [
  //     {
  //       review_id: 5774953,
  //       rating: 1,
  //       summary: 'this is summary',
  //       recommend: true,
  //       response: null,
  //       body: 'this is the body',
  //       date: '1650917401000',
  //       reviewer_name: 'this is a name',
  //       helpfulness: '0',
  //       photos: null
  //     },
  //     {
  //       review_id: 5,
  //       rating: 3,
  //       summary: "I'm enjoying wearing these shades",
  //       recommend: true,
  //       response: 'null',
  //       body: 'Comfortable and practical.',
  //       date: '1615987717620',
  //       reviewer_name: 'shortandsweeet',
  //       helpfulness: '5',
  //       photos: [Array]
  //     },
  //     {
  //       review_id: 7,
  //       rating: 2,
  //       summary: 'This product was ok!',
  //       recommend: false,
  //       response: 'null',
  //       body: "They're fine but I wouldn't buy again.",
  //       date: '1609522845466',
  //       reviewer_name: 'anyone',
  //       helpfulness: '0',
  //       photos: null
  //     },
  //     {
  //       review_id: 3,
  //       rating: 4,
  //       summary: 'I am liking these glasses',
  //       recommend: true,
  //       response: "Glad you're enjoying the product!",
  //       body: "They are very dark.  But that's good because I'm in very sunny spots",
  //       date: '1609325851021',
  //       reviewer_name: 'bigbrotherbenjamin',
  //       helpfulness: '5',
  //       photos: null
  //     },
  //     {
  //       review_id: 4,
  //       rating: 4,
  //       summary: 'They look good on me',
  //       recommend: true,
  //       response: 'null',
  //       body: 'I so stylish and just my aesthetic.',
  //       date: '1593628485253',
  //       reviewer_name: 'fashionperson',
  //       helpfulness: '1',
  //       photos: null
  //     }
  //   ]
  // }