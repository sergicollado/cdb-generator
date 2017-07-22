import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    modifyDestiny: function(name) {
      $('.ui.' + name + '.modal').modal('show');
    },
  }
});
