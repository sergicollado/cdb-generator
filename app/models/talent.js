import DS from 'ember-data';

export default DS.Model.extend({
    character: DS.hasMany('character'),
    name:DS.attr('string'),
    description: DS.attr('string'),
    requirements: DS.attr(),
    PD: DS.attr('number'),
    requirementTarget: DS.attr('string'),
    requirementRule: DS.attr('string')
});
