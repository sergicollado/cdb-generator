import DS from 'ember-data';

export default DS.Model.extend({
    character: DS.belongsTo('character'),
    name:DS.attr('string',{ defaultValue: ''}),
    race: DS.attr('string', { defaultValue: 'humano' }),
    nationality:DS.attr(),
    gender:DS.attr(),
    size: DS.attr(),
    freePD:DS.attr(),
    totalPD:DS.attr(),
    appearence:DS.attr(),
    player: DS.attr(),
    age:DS.attr('number'),
    weight:DS.attr(),
    humanity:DS.attr('number'),
    stress:DS.attr('number'),
    madness:DS.attr('number'),
    corruption:DS.attr('number')
});
