import DS from 'ember-data';

export default DS.Model.extend({
    pk: DS.attr('number'),
    name: DS.attr('string'),
    description: DS.attr('string'),
    NT: DS.attr('number'),
    adventures: DS.attr(),
    powerLevel: DS.attr()
});
