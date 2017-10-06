import Ember from 'ember';

export default Ember.Component.extend({
  skillsService: Ember.inject.service('skills'),
  skillOptions: Ember.computed('character.NT', function(){
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
  NTSkills:Ember.computed('character.skills', 'character.skills.@each.name', function(){
    console.log('update optional');
    let skills = this.get('character.skills');
    if (! skills){
      return;
    }
    return this.get('skillsService').getNTSkills(skills);
  }),
  optionalSkills:Ember.computed('character.skills', function(){

    let skills = this.get('character.skills');
    if (! skills){
      return;
    }

    return this.get('skillsService').getOptionalSkills(skills);
  }),
  skillUpdate: Ember.observer('character.skills.@each.level', function() {
    let character = this.get('character');
    let skills = this.get('character.skills');
    let PD = this.get('skillsService').skillsPD(skills);
    character.set('skillsPD', PD);
  })
});
