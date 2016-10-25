import Ember from 'ember';

export default Ember.Route.extend({
    currentCharacter: Ember.inject.service('current-character'),
    setupController: function(controller,model){
        this._super(controller, model);
        controller.set('currentCharacter',this.get('currentCharacter'));
    },
    model: function(){
        return this.get('store').createRecord('character');
    }
});
