import Ember from 'ember';

export default Ember.Service.extend({
    store: Ember.inject.service(),
    BASE_SKILL: 'BASE_SKILL',
    NT_SKILL: 'NT_SKILL',
    OTHERS_SKILLS: 'OTHERS_SKILLS',
    NTList: Ember.inject.service('technological-levels'),
    base: ['agilidad', 'atención', 'escalar', 'pelea', 'vigor', 'voluntad'],
    getOptionalSkillsByNT: function(NT) {
      return this.get('NTList.skills')[NT];
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
      let NTType = this.get('NT_SKILL');

      let NTSkills = skills.filterBy('type', NTType);
      skills.removeObjects(NTSkills);
    },
    getBaseSkills(skills){
      return skills.filterBy('type', this.get('BASE_SKILL'));
    },
    getNTSkills(skills){
      return skills.filterBy('type', this.get('NT_SKILL'));
    },
    getOtherSkills(skills){
      return skills.filterBy('type', this.get('OTHERS_SKILLS'));
    }
});
