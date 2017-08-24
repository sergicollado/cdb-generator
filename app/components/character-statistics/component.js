import Ember from 'ember';

export default Ember.Component.extend({
  totalPDClass:Ember.computed('character.totalPD', 'character.powerLevel.points',function(){
    return( this.get('character.totalPD') > this.get('character.powerLevel.points'));
  }),
  actions: {
    modifyDestiny: function(name) {
      $('.ui.' + name + '.modal').modal('show');
    },
  }
});
