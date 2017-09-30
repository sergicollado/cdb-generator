import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

let knowledgeComputerTalent;
moduleFor('service:talents', 'Unit | Service | talents-knowledgeComputer', {
  integration: true,
  beforeEach: function () {
    this.inject.service('power-levels', { as: 'powerLevelsService' });
    knowledgeComputerTalent = Ember.Object.create({
            "name": "Investigador",
            "PD": 5,
            "description": "+1 a la Habilidad Atención (para búsquedas en bibliotecas y búsquedas físicas) y  Computadora (para búsquedas informáticas) cuando busque e investigue información relacionada con una Habilidad de Ciencia (Especialidad) o Conocimiento (Especialidad) que se tenga Entrenada",
            "target": "",
            "requirements": "Entrenado en una Habilidad de Ciencia o Conocimiento, además de Atención. Computadora es requisito si NT 6+",
            "requirementTarget": "atenciónANDcomputadora",
            "requirementRule": "KNOWLEDGE_COMPUTER",
            "mod": ""
        })
  }
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();

  assert.ok(service);
  // TALENT
  // name: talent.name,
  // description: talent.description ,
  // requirements: talent.requirements,
  // requirementRule: talent.requirementRule,
  // PD: talent.PD,
  // mod: talent.mod,
  // requirementTarget: talent.requirementTarget,
  // target: talent.target
});

test('it should return false when KNOWLEDGE_COMPUTER talent science or knowledge skill are not trainning',function(assert){
  let service = this.subject();

  let pl = this.powerLevelsService.list[0];
  let character = Ember.Object.create({
     powerLevel: pl,
     skills: Ember.A([
       Ember.Object.create({name:'atención',level:3}),
       Ember.Object.create({name:'computadora',level:3})
     ]),
     talents: Ember.A([
       knowledgeComputerTalent
     ])
  });

  assert.notOk(service.checkComputerKnowledge(character, knowledgeComputerTalent));
});

test('it should return true when KNOWLEDGE_COMPUTER when every requeriment are provided',function(assert){
  let service = this.subject();

  let pl = this.powerLevelsService.list[0];
  let character = Ember.Object.create({
     powerLevel: pl,
     skills: Ember.A([
       Ember.Object.create({name:'atención',level:3}),
       Ember.Object.create({name:'computadora',level:3}),
       Ember.Object.create({name:'ciencia (medicina)',level:3})
     ]),
     talents: Ember.A([
       knowledgeComputerTalent
     ])
  });

  assert.ok(service.checkComputerKnowledge(character, knowledgeComputerTalent));

  character = Ember.Object.create({
     powerLevel: pl,
     skills: Ember.A([
       Ember.Object.create({name:'atención',level:3}),
       Ember.Object.create({name:'computadora',level:3}),
       Ember.Object.create({name:'conocimiento (cualquiera)',level:3})
     ]),
     talents: Ember.A([
       knowledgeComputerTalent
     ])
  });

  assert.ok(service.checkComputerKnowledge(character, knowledgeComputerTalent));
});
//
// test('it should return true when TRAINNING talent requirements are accomplished',function(assert){
//   let service = this.subject();
//
//   let pl = this.powerLevelsService.list[0];
//   let character = Ember.Object.create({
//      powerLevel: pl,
//      skills: Ember.A([
//        Ember.Object.create({name:'armas a cuerpo a cuerpo',isTrainning:true}),
//         Object.create({name:'armas a distancia',isTrainning:false})
//      ]),
//      talents: Ember.A([
//        trainningRuleTalent
//      ])
//   });
//
//   assert.ok(service.checkTrainningTalent(character, trainningRuleTalent));
// });

// test('it should return false when TRAINNING talent requirements not accomplished both targets',function(assert){
//   let service = this.subject();
//
//   let pl = this.powerLevelsService.list[0];
//   let character = Ember.Object.create({
//      powerLevel: pl,
//      skills: Ember.A([
//        Ember.Object.create({name:'armas a cuerpo a cuerpo',isTrainning:true}),
//         Object.create({name:'armas a distancia',isTrainning:false})
//      ]),
//      talents: Ember.A([
//        trainningRuleTalent
//      ])
//   });
//
//   assert.notOk(service.checkTrainningTalent(character, trainningRuleTalentTwoTargets));
// });
//
// test('it should return true when TRAINNING talent requirements accomplished both targets',function(assert){
//   let service = this.subject();
//
//   let pl = this.powerLevelsService.list[0];
//   let character = Ember.Object.create({
//      powerLevel: pl,
//      skills: Ember.A([
//        Ember.Object.create({name:'persuadir',isTrainning:true}),
//        Ember.Object.create({name:'liderazgo',isTrainning:true})
//      ]),
//      talents: Ember.A([
//        trainningRuleTalent
//      ])
//   });
//
//   assert.ok(service.checkTrainningTalent(character, trainningRuleTalentTwoTargets));
// });
