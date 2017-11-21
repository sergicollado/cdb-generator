import DS from 'ember-data';

export default DS.Model.extend({
    character: DS.hasMany('character'),
    name:DS.attr('string'),
    description: DS.attr('string'),
    requirements: DS.attr(),
    PD: DS.attr('number'),
    requirementTarget: DS.attr('string'),
    requirementRule: DS.attr('string'),
    mod:DS.attr('string'),
    maxLevels: DS.attr('number', {defaultValue:0}),
    levelsName:DS.attr('string'),
    currentLevel: DS.attr('number',{defaultValue:0}),
});
