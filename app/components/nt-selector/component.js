import Ember from 'ember';

export default Ember.Component.extend({
    NTList: Ember.inject.service('technological-levels'),
    skillsServices: Ember.inject.service('skills'),
    store: Ember.inject.service(),
    NTChange: Ember.observer('character.NT', function() {
      let skills = this.get('character.skills');
      let skillServices = this.get('skillsServices');

      skills.clear();
      let base = skillServices.get('base');
      let optionalSkills = skillServices.getOptionalSkillsByNT(this.get('character.NT'));
      let NTSkills = skillServices.getNTSkillsByNT(this.get('character.NT'));
      let store = this.get('store');



      base.forEach(function(skill){
        let baseType = skillServices.get('BASE_SKILL');
        skills.addObject(store.createRecord('skill',{name:skill,level:0, type: skillServices.BASE_SKILL }));
      });
      optionalSkills.forEach(function(skillName){
        skills.addObject(store.createRecord('skill',{name: skillName[0],level: 0, type: skillServices.OPTIONAL_SKILLS}))
      });
      NTSkills.forEach(function(skillName){
        skills.addObject(store.createRecord('skill',{name: skillName , type: skillServices.NT_SKILL}))
      });
     })
});
