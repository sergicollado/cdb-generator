import Ember from 'ember';

export default Ember.Component.extend({
  talentService: Ember.inject.service('talents'),
  talentsValidators: Ember.inject.service('talents-validators'),
  init: function(){
    this._super(...arguments);
    let self = this;
    this.get('talentService').loadTalents().then(function(talents){
      self.set('dataTalents',talents);
    })
  },

  isShowingTalentSelector:false,
  actions: {
    toogleDataTalents() {
      this.toggleProperty('isShowingTalentSelector');
    },
    removeTalent(talent){
      this.get('character.talents').removeObject(talent);
      this.get('dataTalents').findBy('name',talent.get('name')).set('isSelected',false);
      this.decrementProperty('character.talentsPD',talent.get('PD'));
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
