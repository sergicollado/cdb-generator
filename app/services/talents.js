import Ember from 'ember';

export default Ember.Service.extend({
    store: Ember.inject.service(),
    rules :{
      TRAINNING:'TRAINNING',
      MORE_THAN_3:'MORE_THAN_3',
      KNOWLEDGE_COMPUTER:'KNOWLEDGE_COMPUTER',
      MORE_THAN_3_TRAINNING:'MORE_THAN_3_TRAINNING',
      AND:'AND',
      OR: 'OR'
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
      console.log(this);
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
      if (requirementTarget.indexOf(this.rules.OR) !== -1){
        return {targets:requirementTarget.split(this.rules.OR),
        operator:this.rules.OR}
      }
      if(requirementTarget.indexOf(this.rules.AND) !== -1){
        return {targets:requirementTarget.split(this.rules.AND),
        operator:this.rules.AND}
      }
    },
    _checkTrainningTalentOperatorOR(requirementTarget, skills){
      if (requirementTarget.operator !== this.rules.OR){
        return true;
      }
      return requirementTarget.targets.some(function(target){
        let skill = skills.findBy('name',target);
        return skill && skill.get('isTrainning');
      });
    },

    _checkTrainningTalentOperatorAND(requirementTarget, skills){
      if(requirementTarget.operator !== this.rules.AND){
        return true;
      }
      return requirementTarget.targets.every(function(target){
        let skill =  skills.findBy('name',target);
        return skill && skill.get('isTrainning');
      });
    },
    checkTrainningTalent(character, talent){
      let requirementTarget = this._extractTargets(talent.get('requirementTarget'));
      let skills = character.get('skills');
      return this._checkTrainningTalentOperatorAND(requirementTarget, skills) &&
       this._checkTrainningTalentOperatorOR(requirementTarget, skills);
    }
});
