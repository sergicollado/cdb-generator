import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home');
  this.route('about');
  this.route('characters');
  this.route('generation-step1',{ path: '/' });
  this.route('statistics');
});

export default Router;
