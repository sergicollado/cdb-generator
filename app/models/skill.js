import DS from 'ember-data';

export default DS.Model.extend({
    skillServices: Ember.inject.service('skills'),
    character: DS.hasMany('character'),
    name:DS.attr('string'),
    level:DS.attr('number'),
    type: DS.attr('string', {defaultValue: 'NT_SKILL'}),
    isTrainning : Ember.computed('level', function(){
      return ( this.get('level') !== undefined);
    }),
    PD: Ember.computed('type', 'level', 'skillServices', function() {
      if ( this.get('level') === undefined){
        return 0;
      }
      let skillServices = this.get('skillServices');

      let cost = 0;
      if( this.get('type') === skillServices.NT_SKILL){
        cost +=3;
      }
      let baseCost = {
        0:0,
        1:2,
        2:6,
        3:12,
        4:20,
        5:30,
        6:42,
        7:56,
        8:72
      }
      cost += baseCost[this.get('level')];

      return cost;
    })
});
