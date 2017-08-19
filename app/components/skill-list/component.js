import Ember from 'ember';

export default Ember.Component.extend({
  skillsService: Ember.inject.service('skills'),
  baseSkills:Ember.computed('character.skills', 'skillsServices', function(){
    let skills = this.get('character.skills');
    if (! skills){
      return;
    }
    return this.get('skillsService').getBaseSkills(skills);
  }),
  NTSkills:Ember.computed('character.skills', 'skillsServices', function(){
    let skills = this.get('character.skills');
    if (! skills){
      return;
    }
    return this.get('skillsService').getNTSkills(skills);
  }),
  otherSkills:Ember.computed('character.skills', 'skillsServices', function(){
    let skills = this.get('character.skills');
    if (! skills){
      return;
    }
    return this.get('skillsService').getOtherSkills(skills);
  })
});
