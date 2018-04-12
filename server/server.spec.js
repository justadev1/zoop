const request = require('supertest');
const assert = require('assert');

describe('loading express', function () {
  let server;

  beforeEach(function () {
    server = require('./server');
  });

  afterEach(function () {
    server.close();
  });

  it('Should respond to /search', (done) => {
    request(server)
      .get('/search')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200, done);
  });

  it('Should return a list of properties', (done) => {
    const expected = {
      num_bedrooms: '5',
      agent_address: '4-6 Station Road, New Barnet',
      property_type: 'Detached house',
      description: ' Built in 1949 on the site of the former Friern Barnet junior school this substantial five bedroom home sits on a large corner plot occupying approximately one third of an acre. Situated behind secure electronic gates the property which has a south west',
      agent_postcode: 'EN5 1QW',
      details_url: 'http://www.zoopla.co.uk/for-sale/details/39782877',
      price: '1800000',
      agent_name: 'Your Move - Spencer & Sener',
      agent_logo: 'http://st.zoocdn.com/zoopla_static_agent_logo_(326525).png',
      agent_phone: '020 3478 3306',
      image_url: 'https://lid.zoocdn.com/354/255/655d446550a9f141484fa97562f79d9b89c6bed8.jpg'
    };

    request(server)
      .get('/results/N11')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .then(response => {
          assert.equal(response.body.listing.length, 5);
          assert.deepEqual(response.body.listing[0], expected);
          done();
      });
  });

  it('Should return 404 when wront params are sent', (done) => {
    request(server)
      .get('/results/SE1')
      .expect(404)
      .then(response => {
          assert.deepEqual(response.body, { error : 'No result found' });
          done();
      });
  });

  it('404 everything else', (done) => {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});