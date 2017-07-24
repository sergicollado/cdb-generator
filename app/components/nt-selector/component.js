import Ember from 'ember';

export default Ember.Component.extend({
    NTList: Ember.inject.service('technological-levels'),
    skillsServices: Ember.inject.service('skills'),
    store: Ember.inject.service(),
    init() {
      this._super(...arguments);
      let store = this.get('store');
      let skills = this.get('character.skills');
      this.get('skillsServices').base.forEach(function(skill){
          let sk = store.createRecord('skill',{name:skill,level:0, isBase: true});
          skills.addObject(sk);
      });

    }
    // NTChange: Ember.observer('character.NT', function() {
    //   console.log('NTChange');
    //   let skills = this.get('character.skills');
    //   debugger
    //   skills.clear();
    //   this.get('skillsServices').getOptionalSkillsByNT(this.get('currentNT')).forEach(function(skillName){
    //     skills.addObject(this.get('store').createRecord('skill'),{name: skillName,level: 0})
    //   });
    //  })
});
