import Ember from 'ember';

export default Ember.Component.extend({
    powerLevels: Ember.inject.service('power-levels'),
    current:null,
    actions:{
        select(level){
            console.log(level);
            this.set("character.powerLevel",this.get('powerLevels.list')[level]);
        }
    }

});
