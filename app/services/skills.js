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
    cleanNTSkills: function(skills){
      let baseType = this.get('BASE_SKILL');

      let NTSkills = skills.filter(function(item, index, enumerable){
          return (item.get('type') !==  baseType);
      });
      skills.removeObjects(NTSkills);
    },
    getBaseSkills: function(skills){
      return skills.filterBy('type', this.get('BASE_SKILL'));
    },
    getNTSkills: function(skills){
      let NTSkills = skills.filterBy('type', this.get('NT_SKILL'));
      let onlyOptional = skills.filterBy('type', this.get('OPTIONAL_SKILLS'));

      return NTSkills.reject(function(optional){
        return onlyOptional.findBy('name',optional.get('name'));
      });
    },
    getOptionalSkills: function(skills){
      return skills.filterBy('type', this.get('OPTIONAL_SKILLS'));
    },
    skillsPD: function(skills){
      if( skills === undefined ){
        return 0;
      }

      let currentPD =  skills.reduce(function(previousValue, item, index, enumerable){
        if ( item.get('PD') === undefined ){
          return previousValue;
        }
        return previousValue + item.get('PD');
      }, 0);
      return currentPD;
    }
});
