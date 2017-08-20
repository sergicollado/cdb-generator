import Ember from 'ember';

export default Ember.Component.extend({
    NTList: Ember.inject.service('technological-levels'),
    skillsServices: Ember.inject.service('skills'),
    store: Ember.inject.service(),
    init() {
      this._super(...arguments);
      let store = this.get('store');
      let skills = this.get('character.skills');
      let skillServices = this.get('skillsServices');
      skillServices.addBaseSkills(skills);
    },
    NTChange: Ember.observer('character.NT', function() {
      let skills = this.get('character.skills');
      let skillServices = this.get('skillsServices');

      skillServices.cleanNTSkills(skills);
      let optionalSkills = skillServices.getOptionalSkillsByNT(this.get('character.NT'));
      let NTSkills = skillServices.getNTSkillsByNT(this.get('character.NT'));

      let store = this.get('store');
      optionalSkills.forEach(function(skillName){
        skills.addObject(store.createRecord('skill',{name: skillName[0],level: 0, type: skillServices.OPTIONAL_SKILLS}))
      });
      NTSkills.forEach(function(skillName){
        skills.addObject(store.createRecord('skill',{name: skillName, type: skillServices.NT_SKILL}))
      });
     })
});
