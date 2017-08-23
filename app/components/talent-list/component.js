import Ember from 'ember';

export default Ember.Component.extend({
  init: function(){
    this._super(...arguments);
    let self = this;
    Ember.$.getJSON("talents.json").then(function(data){
      let talents = data.map(function(obj){
        return Ember.Object.create(obj);
      });
      self.set('dataTalents',talents);
    })
  },
  store: Ember.inject.service(),
  talentService: Ember.inject.service('talents'),
  isShowingTalentSelector:false,
  actions: {
    toogleDataTalents() {
      this.toggleProperty('isShowingTalentSelector');
    },
    removeTalent(talent){
      this.get('character.talents').removeObject(talent);
      this.get('dataTalents').findBy('name',talent.get('name')).set('isSelected',false);
    },
    setTalent(talent){
      if(talent.get('isSelected')){
        return;
      }
      talent.set('isSelected',true);
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
