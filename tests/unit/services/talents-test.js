import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

let trainningRuleTalent, trainningRuleTalentTwoTargets;
moduleFor('service:talents', 'Unit | Service | talents', {
  integration: true,
  beforeEach: function () {
    this.inject.service('power-levels', { as: 'powerLevelsService' });
    this.inject.service('talents-validators', { as: 'validators' });
    trainningRuleTalent =   Ember.Object.create({
      "name": "Ambidiestro",
      "PD": 9,
      "description": "Hace que desaparezcan los negativos por llevar un arma en cada mano",
      "target": "",
      "requirements": "Entrenado en armas cuerpo a cuerpo o distancia",
      "requirementTarget": "armas a cuerpo a cuerpoORarmas a distancia",
      "requirementRule": "TRAINNING",
      "mod": ""
    });
    trainningRuleTalentTwoTargets =   Ember.Object.create({
      "name": "Carismático",
      "PD": 7,
      "description": "+1 a las tiradas de las Habilidades Liderazgo y Persuadir por nivel cuando el carisma puede tener efecto, hasta un máximo de 3 niveles",
      "target": "",
      "requirements": "Entrenado en Liderazgo y Persuadir.",
      "requirementTarget": "persuadirANDliderazgo",
      "requirementRule": "TRAINNING",
      "mod": ""
    });
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

test('it should return false when TRAINNING talent requirements are not accomplished',function(assert){

  let pl = this.powerLevelsService.list[0];
  let character = Ember.Object.create({
     powerLevel: pl,
     skills: Ember.A([
       Ember.Object.create({level:3})
     ]),
     talents: Ember.A([
       trainningRuleTalent
     ])
  });

  assert.notOk(this.validators.checkTrainningTalent(character, trainningRuleTalent));
});

test('it should return true when TRAINNING talent requirements are accomplished',function(assert){

  let pl = this.powerLevelsService.list[0];
  let character = Ember.Object.create({
     powerLevel: pl,
     skills: Ember.A([
       Ember.Object.create({name:'armas a cuerpo a cuerpo',isTrainning:true}),
        Object.create({name:'armas a distancia',isTrainning:false})
     ]),
     talents: Ember.A([
       trainningRuleTalent
     ])
  });

  assert.ok(this.validators.checkTrainningTalent(character, trainningRuleTalent));
});

test('it should return false when TRAINNING talent requirements not accomplished both targets',function(assert){

  let pl = this.powerLevelsService.list[0];
  let character = Ember.Object.create({
     powerLevel: pl,
     skills: Ember.A([
       Ember.Object.create({name:'armas a cuerpo a cuerpo',isTrainning:true}),
        Object.create({name:'armas a distancia',isTrainning:false})
     ]),
     talents: Ember.A([
       trainningRuleTalent
     ])
  });

  assert.notOk(this.validators.checkTrainningTalent(character, trainningRuleTalentTwoTargets));
});

test('it should return true when TRAINNING talent requirements accomplished both targets',function(assert){

  let pl = this.powerLevelsService.list[0];
  let character = Ember.Object.create({
     powerLevel: pl,
     skills: Ember.A([
       Ember.Object.create({name:'persuadir',isTrainning:true}),
       Ember.Object.create({name:'liderazgo',isTrainning:true})
     ]),
     talents: Ember.A([
       trainningRuleTalent
     ])
  });

  assert.ok(this.validators.checkTrainningTalent(character, trainningRuleTalentTwoTargets));
});
