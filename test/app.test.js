'use strict';

const assert = require('assert');
const request = require('request');
const status_code = {200: 200, 201:201, 400:400, 404:404, 500:500}
const category = {
  name: "Abdool",
  id:"1233"
};

describe('Categories', function () {

  describe('POST', function () {
    ///////////////////////////////////////// 
    describe(''+status_code[201], function () {
      it('http://localhost:3030/categories', function (done) {
        request({
          method :"POST",
          headers: {"content-type": "application/json",},
          url:     'http://localhost:3030/categories',
          body:    category,
          json: true
        },
        function(err, res, body){
          assert.equal(status_code[201], res.statusCode);
          assert.equal(body.hasOwnProperty("name"), true);
          assert.equal(body.name, category.name);
          assert.equal(body.hasOwnProperty("id"), true);
          assert.equal(body.id, category.id);
          assert.equal(body.hasOwnProperty("updatedAt"), true);
          assert.equal(body.hasOwnProperty("createdAt"), true);
          done(err);
          });
      });
    });

    describe(''+status_code[400], function () {
      it('http://localhost:3030/categories', function (done) {
        request({
          method :"POST",
          headers: {"content-type": "application/json",},
          url:     'http://localhost:3030/categories',
          body:    category,
          json: true
        }, 
         function (err, res, body) {
          assert.equal(res.statusCode, status_code[400]);
          assert.equal(body.hasOwnProperty("errors"), true);
          assert.equal(body.errors[0].hasOwnProperty("message"), true);
          assert.equal(body.errors[0].message, "id must be unique");
          done(err);
        });
      });
    });
  
    ///////////////////////////////////////// 
  });

  describe('GET', function () {
    ///////////////////////////////////////// 



    describe(''+status_code[200], function () {

      it('allows pagination', function (done) {
        request({
          url: 'http://localhost:3030/categories?$limit=10&$skip=5', 
        },
        function (err, res, body) {
          body = JSON.parse(body)
          assert.equal(res.statusCode, status_code[200]);
          assert.equal(body.hasOwnProperty("data"), true);
          assert.equal(body.skip, 5);
          assert.equal(body.data.length, 10);
          done(err);
        });
      });
    
      it('http://localhost:3030/categories', function (done) {
        request({
          url: 'http://localhost:3030/categories', 
        },
        function (err, res, body) {
          body = JSON.parse(body)
          assert.equal(res.statusCode, status_code[200]);
          assert.equal(body.hasOwnProperty("data"), true);
          // assert.equal(body.total, 4309);
          done(err);
        });
      });    

      it('http://localhost:3030/categories/'+category.id, function (done) {
        request({
          url: 'http://localhost:3030/categories/'+category.id, 
        },
        function (err, res, body) {
          body = JSON.parse(body)
          assert.equal(res.statusCode, status_code[200]);
          assert.equal(body.hasOwnProperty("id"), true);
          assert.equal(body.id, ""+category.id);
          done(err);
        });
      });

      it('http://localhost:3030/categories?$limit=1', function (done) {
        request({
          url: 'http://localhost:3030/categories?$limit=1', 
        },
        function (err, res, body) {
          body = JSON.parse(body)
          assert.equal(res.statusCode, status_code[200]);
          assert.equal(body.hasOwnProperty("limit"), true);
          assert.equal(body.limit, 1);
          assert.equal(body.hasOwnProperty("skip"), true);
          assert.equal(body.skip, 0);
          done(err);
        });
      });    

      it('http://localhost:3030/categories?$skip=100', function (done) {
        request({
          url: 'http://localhost:3030/categories?$skip=100', 
        },
        function (err, res, body) {
          body = JSON.parse(body)
          assert.equal(res.statusCode, status_code[200]);
          assert.equal(body.hasOwnProperty("limit"), true);
          assert.equal(body.limit, 10);
          assert.equal(body.hasOwnProperty("skip"), true);
          assert.equal(body.skip, 100);
          done(err);
        });
      });    
    });

    describe(''+status_code[500], function () {
      it('http://localhost:3030/categories?$limit=asd', function (done) {
        request({
          url: 'http://localhost:3030/categories?$limit=asd', 
        },
        function (err, res, body) {
          body = JSON.parse(body)
          assert.equal(res.statusCode, status_code[500]);
          assert.equal(body.hasOwnProperty("name"), true);
          assert.equal(body.name, "GeneralError");
          done(err);
        });
      });    
  
    })

    describe(''+ status_code[404], function () {
      it('http://localhost:3030/categories/1', function (done) {
        request({
          url: 'http://localhost:3030/categories/1', 
        },
        function (err, res, body) {
          body = JSON.parse(body)
          assert.equal(res.statusCode,  status_code[404]);
          assert.equal(body.hasOwnProperty("name"), true);
          assert.equal(body.name, "NotFound");
          done(err);
        });
      });
    })
    ///////////////////////////////////////// 
  });

  describe('PATCH', function () {
    // let category = {name: "EDIT ME", id:"1234"}

    describe(''+status_code[404], function () {
      it('http://localhost:3030/categories/12334', function (done) {
          request({
            method :"PATCH",
            headers: {"content-type": "application/json",},
            url:     'http://localhost:3030/categories/12334',
            body:    category,
            json: true
          },
          function(err, res, body){
            assert.equal(res.statusCode, status_code[404]);
            assert.equal(body.hasOwnProperty("name"), true);
            assert.equal("NotFound", body.name);
            done(err);
            });
        });

    })

    describe(''+status_code[200], function () {
      it('http://localhost:3030/categories/'+category.id, function (done) {
          request({
            method :"PATCH",
            headers: {"content-type": "application/json",},
            url:     'http://localhost:3030/categories/'+category.id,
            body:    category,
            json: true
          },
          function(err, res, body){
            assert.equal(status_code[200], res.statusCode);
            assert.equal(body.hasOwnProperty("name"), true);
            assert.equal(body.name, category.name);
            assert.equal(body.hasOwnProperty("id"), true);
            assert.equal(body.id, category.id);
            assert.equal(body.hasOwnProperty("updatedAt"), true);
            assert.equal(body.hasOwnProperty("createdAt"), true);
            done(err);
            });
        });
      });

    ///////////////////////////////////////// 
  });

  
  describe('DELETE', function () {
    ///////////////////////////////////////// 
      describe(""+status_code[200], function () {
        it('http://localhost:3030/categories', function (done) {
          request({
            method :"DELETE",
            headers: {"content-type": "application/json",},
            url:     `http://localhost:3030/categories/${category.id}`,
            json: true
          }, 
          function(err, res, body){
            assert.equal(res.statusCode, status_code[200]);
            assert.equal(body.hasOwnProperty("name"), true);
            assert.equal(body.name, category.name);
            assert.equal(body.hasOwnProperty("id"), true);
            assert.equal(body.id, category.id);
            assert.equal(body.hasOwnProperty("updatedAt"), true);
            assert.equal(body.hasOwnProperty("createdAt"), true);
            done(err);
            });
        });
      });
  
      describe(''+status_code[404], function () {
        it('http://localhost:3030/categories', function (done) {
          request({
            method :"POST",
            headers: {"content-type": "application/json",},
            url:     `http://localhost:3030/categories/1235`,
            json: true
          }, 
           function (err, res, body) {
            assert.equal(res.statusCode, status_code[404]);
            assert.equal(body.hasOwnProperty("name"), true);
            assert.equal("NotFound", body.name);
            done(err);
          });
        });
      });

    ///////////////////////////////////////// 
  });

});
