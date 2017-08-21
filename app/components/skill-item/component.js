import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  skillsService: Ember.inject.service('skills'),
  isReadOnly: Ember.computed('skill.type', 'skillsServices', function(){
    let type = this.get('skill.type');
    return type !== this.get('skillsService').NT_SKILL;
  }),
  isLevelReadonly:Ember.computed('skill.isTrainning', function(){
    return !this.get('skill.isTrainning');
  }),
  trainningChange: Ember.observer('skill.isTrainning', function() {
      if(this.get('skill.isTrainning')){
        this.set('skill.level',0);
      }else{
        this.set('skill.level',undefined);
      }
    }
  )
});
