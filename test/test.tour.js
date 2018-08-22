/* global window,require,describe,it */
import { assert } from 'chai';
import Shepherd from '../src/js/shepherd';
// since importing non UMD, needs assignment
window.Shepherd = Shepherd;

describe('Tour', function() {
  const defaults = {
    classes: 'shepherd-theme-arrows',
    scrollTo: true
  };

  after(function() {
    instance.cancel();
  });

  const instance = new Shepherd.Tour({
    defaults,
  });

  it('creates a new tour instance', function() {
    assert.isOk(instance instanceof Shepherd.Tour);
  });

  it('returns the default options on the instance', function() {
    assert.isOk(instance.options);
  });

  describe('.addStep()', function() {
    it('adds tour steps', function() {
      instance.addStep('test', {
        id: 'test',
        title: 'This is a test step for our tour'
      });

      assert.equal(instance.steps.length, 1);
    });

    // this is not working as documented
    it('returns the step options', function() {
      assert.equal(instance.options.defaults, defaults);
    });

    it('returns the step by ID with the right title', function() {
      instance.addStep('test2', {
        id: 'test2',
        title: 'Another Step'
      });

      instance.addStep('test3', {
        id: 'test3',
        title: 'Yet, another test step'
      });
      assert.equal(instance.steps.length, 3);
      assert.equal(instance.getById('test').options.title, 'This is a test step for our tour');
    });

  });

  describe('.start()', function() {
    it('starts a tour that is the current active', function() {
      instance.start();

      assert.equal(instance, Shepherd.activeTour);
    });
  });

  describe('.getCurrentStep()', function() {
    it('returns the currently shown step', function() {
      assert.equal(instance.getCurrentStep().id, 'test');
    });
  });

  describe('.next()', function() {
    it('goes to the next step after next() is invoked', function() {
      instance.next();
      assert.equal(instance.getCurrentStep().id, 'test2');
    });
  });

  describe('.back()', function() {
    it('goes to the previous step after back() is invoked', function() {
      instance.back();
      assert.equal(instance.getCurrentStep().id, 'test');
    });
  });
});
