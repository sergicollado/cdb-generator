import Ember from 'ember';

export default Ember.Component.extend({
  showRequeriments:Ember.computed('skillsLimitations', 'talentsMaxPDLimitations', 'hide',function(){
    return (this.get('skillsLimitations') || this.get('talentsMaxPDLimitations')
      || this.get('talentsRequirementsLimitations')) && !this.get('hide');
  }),
  hide:false,
  powerLevelsService: Ember.inject.service('power-levels'),
  talentsValidators: Ember.inject.service('talents-validators'),
  PDLimitations:Ember.computed('character.totalPD',function(){
    let character = this.get('character');
    this.set('hide', false);
    console.log('update PD limits');
    return !this.get('powerLevelsService').checkPointsLimits(character);
  }),
  talentsMaxPDLimitations:Ember.computed('character.talents.[]',function(){
    let character = this.get('character');
    this.set('hide', false);
    console.log('update message talent limits');
    return !this.get('powerLevelsService').checkTalentsPDLimits(character);
  }),
  skillsLimitations:Ember.computed('character.skills.@each.level',function(){
    let character = this.get('character');
    this.set('hide', false);
    return !this.get('powerLevelsService').checkSkillsLimits(character);
  }),
  talentsRequirementsLimitations:Ember.computed('character.talents.[]','character.skills.@each.level',function(){
    let character = this.get('character');
    this.set('hide', false);
    console.log('update message talent requirements limitations');
    return !this.get('talentsValidators').checkCharacterTalents(character);
  }),
  actions: {
    click() {
      this.set('hide', true);
      console.log('click');
    }
  }
});
