import Ember from 'ember';

export default Ember.Route.extend({
    setupController: function(controller,model){
        this._super(controller, model);
    },
    model: function(){
        let profile = this.get('store').createRecord('character-profile');
        return this.get('store').createRecord('character', {
            profile:profile
        });
    }
});
