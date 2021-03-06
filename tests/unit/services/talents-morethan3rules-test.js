import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

let moreThan3RuleTalent, moreThan3RuleTalentORTargets, moreThan3RuleTalentSeveralORTargets,
  moreThan3RuleTalentANDTargets;
moduleFor('service:talents', 'Unit | Service | talents | MORE_THAN_3 rule', {
  integration: true,
  beforeEach: function () {
    this.inject.service('power-levels', { as: 'powerLevelsService' });
    this.inject.service('talents-validators', { as: 'validators' });
    moreThan3RuleTalent = Ember.Object.create({
        "name": "Artista Marcial",
        "PD": 8,
        "description": "Permite realizar las Maniobras Proyectar, Usar la Fuerza de Otro, Bloqueo y Golpe en el Aire. Además las maniobras Agarrón, Asfixiar, Desarmar, Escapar y Presa cuestan 1 AC menos",
        "target": "",
        "requirements": "Tener la Habilidad Pelea a +3 o más.",
        "requirementTarget": "pelea",
        "requirementRule": "MORE_THAN_3",
        "mod": ""
      });
    moreThan3RuleTalentORTargets = Ember.Object.create({
      "name": "Desenvainado Rápido",
      "PD": 3,
      "description": "Permite desenvainar espadas por 1 AC",
      "target": "",
      "requirements": "Tener Armas Cuerpo a Cuerpo o Armas a 1 Mano a 3+ o más",
      "requirementTarget": "armas a cuerpo a cuerpoORarmas a 1 mano",
      "requirementRule": "MORE_THAN_3",
      "mod": ""
    });
    moreThan3RuleTalentSeveralORTargets = Ember.Object.create({
      "name": "Gun Kata",
      "PD": 8,
      "description": "Permite usar Pistolas o Rifles costando 1 AC menos cada ataque, y da acceso a algunas Maniobras especiales",
      "target": "",
      "requirements": "Tener la Habilidad Armas Cortas, Armas de Pólvora o Armas Largas a 3+ o más",
      "requirementTarget": "armas cortasORarmas de pólvoraORarmas largas",
      "requirementRule": "MORE_THAN_3",
      "mod": ""
    });
    moreThan3RuleTalentANDTargets = Ember.Object.create({
      "name": "Desenvainado Rápido",
      "PD": 3,
      "description": "Permite desenvainar espadas por 1 AC",
      "target": "",
      "requirements": "Tener Armas Cuerpo a Cuerpo o Armas a 1 Mano a 3+ o más",
      "requirementTarget": "armas a cuerpo a cuerpoANDarmas a 1 mano",
      "requirementRule": "MORE_THAN_3",
      "mod": ""
    });
  }
});

// Replace this with your real tests
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

test('it should return falsliderazgoe when MORE_THAN_3 talent requirements are not accomplished',function(assert){
  let service = this.subject();

  let pl = this.powerLevelsService.list[0];
  let character = Ember.Object.create({
     powerLevel: pl,
     skills: Ember.A([
       Ember.Object.create({name:'', level:3})
     ]),
     talents: Ember.A([
       moreThan3RuleTalent
     ])
  });

  assert.notOk(this.validators.checkMoreThan3RuleTalent(character, moreThan3RuleTalent));
});

test('it should return true when MORE_THAN_3 talent requirements are accomplished',function(assert){
  let service = this.subject();

  let pl = this.powerLevelsService.list[0];
  let character = Ember.Object.create({
     powerLevel: pl,
     skills: Ember.A([
       Ember.Object.create({name:'pelea',level:3})
     ]),
     talents: Ember.A([
       moreThan3RuleTalent
     ])
  });

  assert.ok(this.validators.checkMoreThan3RuleTalent(character, moreThan3RuleTalent));
});

test('it should return true when MORE_THAN_3 talent when one requirements is accomplished with OR operator',function(assert){
  let service = this.subject();

  let pl = this.powerLevelsService.list[0];
  let character = Ember.Object.create({
     powerLevel: pl,
     skills: Ember.A([
       Ember.Object.create({name:'armas de pólvora',level:3})
     ]),
     talents: Ember.A([
       moreThan3RuleTalentSeveralORTargets
     ])
  });

  assert.ok(this.validators.checkMoreThan3RuleTalent(character, moreThan3RuleTalentSeveralORTargets));
});

test('it should return true when MORE_THAN_3 talent requirements accomplished both targets',function(assert){
  let service = this.subject();

  let pl = this.powerLevelsService.list[0];
  let character = Ember.Object.create({
     powerLevel: pl,
     skills: Ember.A([
       Ember.Object.create({name:'armas a cuerpo a cuerpo',level:3}),
       Ember.Object.create({name:'armas a 1 mano',level:3})
     ]),
     talents: Ember.A([
       moreThan3RuleTalentANDTargets
     ])
  });

  assert.ok(this.validators.checkMoreThan3RuleTalent(character, moreThan3RuleTalentANDTargets));
});
