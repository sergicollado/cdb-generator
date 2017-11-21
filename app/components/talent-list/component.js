import Ember from 'ember';

export default Ember.Component.extend({
  talentService: Ember.inject.service('talents'),
  talentsValidators: Ember.inject.service('talents-validators'),
  init: function(){
    this._super(...arguments);
    let self = this;
    this.get('talentService').loadTalents().then(function(talents){
      self.set('dataTalents',talents);
    });
  },

  isShowingTalentSelector:false,
  getLevelNameRequirement:function(talent, index){
    if (index==0){
      return '';
    }
    return talent.levelsName[index-1];
  },
  getStepClass:function(talent, index){
    if( index <=  talent.get('currentLevel')){
      return 'completed';
    }
    return 'active';
  },
  actions: {
    toogleDataTalents() {
      this.toggleProperty('isShowingTalentSelector');
    },
    removeTalent(talent){
      this.get('character.talents').removeObject(talent);
      this.get('dataTalents').findBy('name',talent.get('name')).set('isSelected',false);
      this.decrementProperty('character.talentsPD',talent.get('PD'));
    },
    setLevel(talent, level){
      talent.set('currentLevel',level+1);
      console.log(level,'LEVEL');
      console.log('set level', talent.get('currentLevel'))
    },
    setTalent(talent){
      if(talent.get('isSelected')){
        return;
      }

      talent.set('isSelected',true);
      let talentRecord = this.get('talentService').assembleTalent(talent);
      this.get('character.talents').addObject(talentRecord);
      this.incrementProperty('character.talentsPD',talent.PD);
    }
  }
});
