/**
 * @jest-environment node
 */

import Shepherd, { NoOp } from '../../src/js/shepherd';

describe('Server Side Render', function () {
  describe('Tour constructor', function () {
    it('does not start a tour when window is undefined', () => {
      const instance = new Shepherd.Tour();

      expect(instance instanceof NoOp).toBeTruthy();
    });
  });
});
