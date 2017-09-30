import Ember from 'ember';

export default Ember.Service.extend({
    store: Ember.inject.service(),
    operators:{
      AND:'AND',
      OR: 'OR',
      NEITHER: 'NEITHER'
    },
    rules :{
      TRAINNING:'TRAINNING',
      MORE_THAN_3:'MORE_THAN_3',
      KNOWLEDGE_COMPUTER:'KNOWLEDGE_COMPUTER',
      MORE_THAN_3_TRAINNING:'MORE_THAN_3_TRAINNING'
    },
    loadTalents(){
      return Ember.$.getJSON("talents.json").then(function(data){
        let talents = data.map(function(obj){
          return Ember.Object.create(obj);
        });
        return talents;
      })
    },
    assembleTalent(talent){
      let store = this.get('store');
      return store.createRecord('talent',{
          name: talent.name,
          description: talent.description ,
          requirements: talent.requirements,
          requirementRule: talent.requirementRule,
          PD: talent.PD,
          mod: talent.mod,
          requirementTarget: talent.requirementTarget,
          target: talent.target
        });
    },
    _extractTargets(requirementTarget){
      if (requirementTarget.includes(this.operators.OR) ){
        return {targets:requirementTarget.split(this.operators.OR),
        operator:this.operators.OR}
      }
      if(requirementTarget.includes(this.operators.AND) ){
        return {targets:requirementTarget.split(this.operators.AND),
        operator:this.operators.AND}
      }
      return {
        targets: [requirementTarget],
        operator:this.operators.NEITHER
      };
    },
    _checkTrainningTalentOperatorOR(requirementTarget, skills){
      if (requirementTarget.operator !== this.operators.OR){
        return true;
      }
      return requirementTarget.targets.some(function(target){
        let skill = skills.findBy('name',target);
        return skill && skill.get('isTrainning');
      });
    },

    _checkTrainningTalentOperatorAND(requirementTarget, skills){
      if(requirementTarget.operator !== this.operators.AND){
        return true;
      }
      return requirementTarget.targets.every(function(target){
        let skill =  skills.findBy('name',target);
        return skill && skill.get('isTrainning');
      });
    },
    _checkTrainningTalentOperatorNEITHER(requirementTarget, skills){
      if(requirementTarget.operator !== this.operators.NEITHER){
        return true;
      }
      return requirementTarget.targets.every(function(target){
        let skill =  skills.findBy('name',target);
        return skill && skill.get('isTrainning');
      });
    },

    _checkMoreThan3TalentOperatorNEITHER(requirementTarget, skills){
      if(requirementTarget.operator !== this.operators.NEITHER){
        return true;
      }
      return requirementTarget.targets.every(function(target){
        let skill =  skills.findBy('name',target);

        return skill && skill.get('level')>= 3;
      });
    },
    _checkMoreThan3TalentOperatorOR(requirementTarget, skills){
      if(requirementTarget.operator !== this.operators.OR){
        return true;
      }
      return requirementTarget.targets.some(function(target){
        let skill =  skills.findBy('name',target);
        return skill && skill.get('level')>= 3;
      });
    },
    _checkMoreThan3TalentOperatorAND(requirementTarget, skills){
      if(requirementTarget.operator !== this.operators.AND){
        return true;
      }
      return requirementTarget.targets.every(function(target){
        let skill =  skills.findBy('name',target);
        return skill && skill.get('level')>= 3;
      });
    },
    checkTrainningTalent(character, talent){
      let requirementTarget = this._extractTargets(talent.get('requirementTarget'));
      let skills = character.get('skills');
      return this._checkTrainningTalentOperatorAND(requirementTarget, skills) &&
       this._checkTrainningTalentOperatorOR(requirementTarget, skills) &&
       this._checkTrainningTalentOperatorNEITHER(requirementTarget, skills);
    },
    checkMoreThan3RuleTalent(character, talent){
      let requirementTarget = this._extractTargets(talent.get('requirementTarget'));
      let skills = character.get('skills');

      return this._checkMoreThan3TalentOperatorNEITHER(requirementTarget, skills) &&
        this._checkMoreThan3TalentOperatorOR(requirementTarget, skills) &&
        this._checkMoreThan3TalentOperatorAND(requirementTarget, skills);
    },
    checkComputerKnowledge(character, talent){
      let checks = {
        hasScienceOrKnoweledge:false,
        hasComputerSkill:false,
        hasAttention: false
      };
      let skills = character.get('skills');
      if(!skills.findBy('name','atención')){
        return false;
      }
      if(!skills.findBy('name','computadora')){
        return false;
      }
      return skills.any((skill)=> skill.name.includes('ciencia') || skill.name.includes('conocimiento'))    }
});
