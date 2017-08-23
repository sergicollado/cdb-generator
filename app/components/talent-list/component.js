import Ember from 'ember';

export default Ember.Component.extend({

  init: function(){
    this._super(...arguments);
    let self = this;
    Ember.$.getJSON("talents.json").then(function(data){
      self.set('dataTalents',data);
    })
  },
  store: Ember.inject.service(),
  isShowingTalentSelector:false,
  actions: {
    toogleDataTalents() {
      this.toggleProperty('isShowingTalentSelector');
    },
    setTalent(talent){
      let store = this.get('store');
      this.get('character.talents').addObject(store.createRecord('talent',{
          name: talent.name,
          description: talent.description ,
          requirements: talent.requirements,
          requirementRule: talent.requirementRule,
          PD: talent.PD
        })
      );
    }
  }
});
