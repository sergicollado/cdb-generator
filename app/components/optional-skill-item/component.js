import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  currentOptions:  Ember.computed('currentSkill', 'options', function(){
    return this.get('options')[this.get('currentSkill')];
  })
});
