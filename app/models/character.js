import DS from 'ember-data';


export default DS.Model.extend({
    pk: DS.attr('number'),
    profile: DS.belongsTo('character-profile'),
    NT: DS.attr('string'),
    adventures: DS.attr(),
    powerLevel: DS.attr(),
    humanity:DS.attr('number',{ defaultValue: 0}),
    stress:DS.attr('number',{ defaultValue: 0}),
    madness:DS.attr('number',{ defaultValue: 0}),
    corruption:DS.attr('number',{ defaultValue: 0}),

    aspects: DS.hasMany('aspect'),
    destinyPoints: DS.attr('number',{ defaultValue: 3}),
    skills: DS.hasMany('skill'),
    skillsPD: DS.attr('number', { defaultValue: 0}),
    talents: DS.hasMany('talent')
});
