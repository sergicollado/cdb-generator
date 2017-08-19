import DS from 'ember-data';

export default DS.Model.extend({
    character: DS.hasMany('character'),
    name:DS.attr('string'),
    level:DS.attr('number'),
    type: DS.attr('string', {defaultValue: 'OTHERS_SKILLS'}),
    PD: Ember.computed('isBase', 'level', function() {
      let cost = 0;
      if( !this.get('isBase')){
        cost +=3;
      }
      let costs = {
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
      if (this.get('level')){
        cost +=costs[this.get('level')];
      }
      return cost;
    })
});
