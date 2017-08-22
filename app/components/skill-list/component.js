import Ember from 'ember';

export default Ember.Component.extend({
  skillsService: Ember.inject.service('skills'),
  skillOptions: Ember.computed('character.NT', 'skillsService', function(){
    let skillService = this.get('skillsService');
    return skillService.getOptionalSkillsByNT(this.get('character.NT'));
  }),
  baseSkills:Ember.computed('character.skills', 'skillsServices', function(){
    let skills = this.get('character.skills');
    if (! skills){
      return;
    }
    return this.get('skillsService').getBaseSkills(skills);
  }),
  NTSkills:Ember.computed('character.skills', 'skillsServices', 'character.skills.@each.name', function(){
    console.log('update optional');
    let skills = this.get('character.skills');
    if (! skills){
      return;
    }
    return this.get('skillsService').getNTSkills(skills);
  }),
  optionalSkills:Ember.computed('character.skills', 'skillsServices', function(){

    let skills = this.get('character.skills');
    if (! skills){
      return;
    }

    return this.get('skillsService').getOptionalSkills(skills);
  }),
  skillUpdate: Ember.observer('character.skills.@each.PD', function() {
    let character = this.get('character');
    let PD = this.get('skillsService').skillsPD(this.get('character.skills'));
    character.set('skillsPD', PD);
  })
});
