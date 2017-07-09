import Ember from 'ember';

export default Ember.Service.extend({
    base: ['agilidad', 'atención', 'escalar', 'pelea', 'vigor', 'voluntad'],
    getBase: function(){
      return this.get('base').map(function(skill){
          return this.get('store').createRecord('skill',{name:skill,points:0});
      });
    }
});
