import DS from 'ember-data';


export default DS.Model.extend({
    pk: DS.attr('number'),
    profile: DS.belongsTo('character-profile'),
    NT: DS.attr('string'),
    adventures: DS.attr(),
    powerLevel: DS.attr('number',{ defaultValue: 0}),
    humanity:DS.attr('number',{ defaultValue: 0}),
    stress:DS.attr('number',{ defaultValue: 0}),
    madness:DS.attr('number',{ defaultValue: 0}),
    corruption:DS.attr('number',{ defaultValue: 0}),

    aspects: DS.hasMany('aspect'),
    destinyPoints: DS.attr('number',{ defaultValue: 3}),
    skills: DS.hasMany('skill'),
    skillsPD: DS.attr('number', { defaultValue: 0}),
    talentsPD: DS.attr('number', { defaultValue: 0}),
    giftsPD: DS.attr('number', { defaultValue: 0}),
    totalPD: Ember.computed('skillsPD', 'talentsPD', 'giftsPD', function() {
      let total = this.get('skillsPD')+this.get('talentsPD')+this.get('giftsPD');
      return total;
    }),
    talents: DS.hasMany('talent'),
    limitations: DS.hasMany('limitation'),
});
