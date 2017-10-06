import Ember from 'ember';

export default Ember.Component.extend({
  showRequeriments:Ember.computed('skillsLimitations', 'hide',function(){
    return this.get('skillsLimitations') && !this.get('hide');
  }),
  hide:false,
  powerLevelsService: Ember.inject.service('power-levels'),
  skillsLimitations:Ember.computed('character.skills.@each.level',function(){
    let character = this.get('character');
    this.set('hide', false);
    return !this.get('powerLevelsService').checkSkillsLimits(character);
  }),
  actions: {
    click() {
      this.set('hide', true);
      console.log('click');
    }
  }
});
