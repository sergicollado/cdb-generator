import Ember from 'ember';
import Character from '../models/character'

export default Ember.Route.extend({
    setupController: function(controller,model){
        this._super(controller, model);
    },
    model: function(){
      let profile = this.get('store').createRecord('character-profile');
      let character =  this.get('store').createRecord('character', {
        profile:profile
      })
      const aspectsCount = 3;
      for (var i = 0; i < aspectsCount; i++) {
        character.get('aspects').addObject(this.get('store').createRecord('aspect'));
      }
      return character;
    }
});
