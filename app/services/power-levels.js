import Ember from 'ember';

export default Ember.Service.extend({
    list:[{
        name: 'mediocre',
        points: 75,
        skillLimits: [{ count: 2, max: 3}],
        talents: { PDmax: 20},
        artificialGifts : {PDmax: 15},
        limitations: { max: 3},
        description:`
        Se reciben 75 Puntos de Desarrollo.
        Se puede:
         Tener dos Habilidades a +3.
         Gastar hasta 20 PD en Talentos.
         Gastar hasta 15 PD en Dones.
         Adquirir un máximo de 3 Limitaciones
        `
    },{
        name: 'normal',
        points: 100,
        skillLimits: [{count: 4, max:3}, {count:1, max:4}],
        talents: { PDmax: 25},
        artificialGifts : {PDmax: 20},
        limitations :{ max: 2},
        description:`
        Se reciben 100 Puntos de Desarrollo.
        Se puede:
         Tener hasta 3 Habilidades a +3 y 1 a +4(o 4 Habilidades a +3).
         Gastar hasta 25 PD en Talentos.
         Gastar hasta 20 PD en Dones.
         Adquirir un máximo de 2 Limitaciones

`
    },{
        name: 'grande',
        points: 150,
        skillLimits: [{count: 1, max:5}],
        talents: { PDmax: 30},
        artificialGifts : {PDmax: 25},
        limitations :{ max: 1},
        description:`
        Se reciben 150 Puntos de Desarrollo.
        Se puede:
         Tener hasta 1 Habilidad a +5.
         Gastar hasta 30 PD en Talentos.
         Gastar hasta 25 PD en Dones.
         Adquirir un máximo de 1 Limitación.
`
    }],
    checkPointsLimits(character){
      let powerLevel = character.get('powerLevel');
      if(!powerLevel){
        return;
      }

      return character.get('totalPD') <= powerLevel.points;
    },
    checkSkillsLimits(character){
      let skillLimitsList = character.get('powerLevel').skillLimits;
      if (!skillLimitsList){return true;}
      let skills = character.get('skills');
      return !skillLimitsList.some(function(skillLimit){
          let levelOvercome = false;
          let maxCount = skills.reduce(function(previousValue, skill, index, enumerable){

            if( skill.get('level') == skillLimit.max){
              return previousValue+1;
            }
            if( skill.get('level') > skillLimit.max){
              return levelOvercome = true;
            }
            return previousValue;
          },0);
          return maxCount > skillLimit.count || levelOvercome;
      });
    },
    checkTalentsPDLimits(character){
      let talents = character.get('powerLevel').talents;
      if (!talents){return true;}

      return character.get('talentsPD') <= talents.PDmax;
    },
    // checkGifts(character){
    //   return true;
    // },
    checkLimitationsLimits(character){
      return character.get('limitations').length <= character.get('powerLevel').limitations.max;
    }
});
