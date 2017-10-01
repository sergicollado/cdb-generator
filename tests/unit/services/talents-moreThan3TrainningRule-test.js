import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

let moreThan3TrainningTalent, validators;
moduleFor('service:talents', 'Unit | Service | talents-moreThan3Trainning', {
  integration: true,
  beforeEach: function () {
    this.inject.service('power-levels', { as: 'powerLevelsService' });
    this.inject.service('talents-validators', { as: 'validators' });
    moreThan3TrainningTalent = Ember.Object.create({
        "name": "Psicoanalista",
        "PD": 6,
        "description": "+1 a cualquier tirada de Conocimiento (Psicología) que haga para hacer perder a otras personas Puntos de Estrés o Locura",
        "target": "",
        "requirements": "Tener la Habilidad Conocimiento (Psicología) a +3 o más y estar Entrenado en Averiguar Intenciones y Persuadir",
        "requirementTarget": "conocimiento (psicología)ANDaveriguar intenciones",
        "requirementRule": "MORE_THAN_3_TRAINNING",
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

test('it should return false when MORE_THAN_3_TRAINNING talent and knowledge Psicology skill level is lower than 3',function(assert){
  let service = this.subject();
  let pl = this.powerLevelsService.list[0];
  let character = Ember.Object.create({
     powerLevel: pl,
     skills: Ember.A([
       Ember.Object.create({name:'conocimiento (Psicología)',level:2}),
       Ember.Object.create({name:'averiguar intenciones',isTrainning:true}),
       Ember.Object.create({name:'persuadir',isTrainning:true}),
     ]),
     talents: Ember.A([
       moreThan3TrainningTalent
     ])
  });

  assert.notOk(this.validators.checkMoreThan3Trainning(character, moreThan3TrainningTalent));

  character = Ember.Object.create({
     powerLevel: pl,
     skills: Ember.A([
       Ember.Object.create({name:'averiguar intenciones',isTrainning:true}),
       Ember.Object.create({name:'persuadir',isTrainning:true}),
     ]),
     talents: Ember.A([
       moreThan3TrainningTalent
     ])
  });

  assert.notOk(this.validators.checkMoreThan3Trainning(character, moreThan3TrainningTalent));
});

test('it should return false when MORE_THAN_3_TRAINNING talent and knowledge averiguar intenciones and persuadir needs to be trainned',function(assert){
  let service = this.subject();
  let pl = this.powerLevelsService.list[0];
  let character = Ember.Object.create({
     powerLevel: pl,
     skills: Ember.A([
       Ember.Object.create({name:'conocimiento (Psicología)',level:3}),
       Ember.Object.create({name:'averiguar intenciones',isTrainning:false}),
       Ember.Object.create({name:'persuadir',isTrainning:true}),
     ]),
     talents: Ember.A([
       moreThan3TrainningTalent
     ])
  });

  assert.notOk(this.validators.checkMoreThan3Trainning(character, moreThan3TrainningTalent));

  character = Ember.Object.create({
     powerLevel: pl,
     skills: Ember.A([
       Ember.Object.create({name:'conocimiento (Psicología)',level:3}),
       Ember.Object.create({name:'averiguar intenciones',isTrainning:true}),
       Ember.Object.create({name:'persuadir',isTrainning:false}),
     ]),
     talents: Ember.A([
       moreThan3TrainningTalent
     ])
  });

  assert.notOk(this.validators.checkMoreThan3Trainning(character, moreThan3TrainningTalent));
});

test('it should return true when MORE_THAN_3_TRAINNING talent and every requeriment is accomplished',function(assert){
  let service = this.subject();
  let pl = this.powerLevelsService.list[0];
  let character = Ember.Object.create({
     powerLevel: pl,
     skills: Ember.A([
       Ember.Object.create({name:'conocimiento (Psicología)',level:3}),
       Ember.Object.create({name:'averiguar intenciones',isTrainning:true}),
       Ember.Object.create({name:'persuadir',isTrainning:true}),
     ]),
     talents: Ember.A([
       moreThan3TrainningTalent
     ])
  });

  assert.ok(this.validators.checkMoreThan3Trainning(character, moreThan3TrainningTalent));
});
