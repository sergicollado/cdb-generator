import Ember from 'ember';

export default Ember.Component.extend({
  skillsService: Ember.inject.service('skills'),
  getSkills: function(){
    if(model.NT){
      return skillsService.getOptionalSkillsByNT(model.NT);
    }
    console.log(skillsService.base);
    return skillsService.base;
  }
});
