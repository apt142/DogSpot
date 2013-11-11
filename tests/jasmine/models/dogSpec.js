/*global beforeEach, afterEach */
/*global describe, it, expect */
/*global window, eb, loadFixtures */
/*global spyOn, xit, xdescribe, runs, waitsFor */
// Unit testing Banks module

define([
  'models/dog'
],
function (
  DogModel
) {
  "use strict";

  describe('Dog Model', function() {

    it('should instantiate.', function() {
      var model;
      model = new DogModel({
        color: 'brown'
      });
      expect(model.get('color')).toEqual('brown');
    });

  });

});

/* End of file dogSpec.js */
