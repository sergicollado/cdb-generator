import Ember from 'ember';

export default Ember.Service.extend({
    store: Ember.inject.service(),
    BASE_SKILL: 'BASE_SKILL',
    NT_SKILL: 'NT_SKILL',
    OPTIONAL_SKILLS: 'OPTIONAL_SKILLS',
    NTList: Ember.inject.service('technological-levels'),
    base: ['agilidad', 'atención', 'escalar', 'pelea', 'vigor', 'voluntad'],

    getOptionalSkillsByNT: function(NT) {
      return this.get('NTList.optionalSkillsByNT')[NT];
    },
    getNTSkillsByNT(NT){
      return this.get('NTList.skillsByNT')[NT];
    },
    addBaseSkills: function(skills){
      let store = this.get('store');
      let baseType = this.get('BASE_SKILL');
      this.get('base').forEach(function(skill){
          let sk = store.createRecord('skill',{name:skill,level:0, isBase: true, type: baseType });
          skills.addObject(sk);
      });
    },
    cleanNTSkills: function(skills){
      let store = this.get('store');
      let baseType = this.get('BASE_SKILL');

      let NTSkills = skills.filter(function(item, index, enumerable){
          return (item.get('type') !==  baseType);
      });
      skills.removeObjects(NTSkills);
    },
    getBaseSkills(skills){
      return skills.filterBy('type', this.get('BASE_SKILL'));
    },
    getNTSkills(skills){
      return skills.filterBy('type', this.get('NT_SKILL'));
    },
    getOptionalSkills(skills){
      return skills.filterBy('type', this.get('OPTIONAL_SKILLS'));
    }
});
