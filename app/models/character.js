import DS from 'ember-data';

export default DS.Model.extend({
    pk: DS.attr('number'),
    profile: DS.belongsTo('character-profile'),
    NT: DS.attr('number'),
    adventures: DS.attr(),
    powerLevel: DS.attr(),
    humanity:DS.attr('number'),
    stress:DS.attr('number'),
    madness:DS.attr('number'),
    corruption:DS.attr('number')
});
