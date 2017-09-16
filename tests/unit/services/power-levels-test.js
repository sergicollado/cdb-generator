import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

  moduleFor('service:power-levels', 'Unit | Service | power levels', {
  // Specify the other units that are required for this test.
  needs: []
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('it checks points limits when limit points get overcome',function(assert){
  let service = this.subject();
  let character = Ember.Object.create({
     powerLevel: service.get('list')[0],
     totalPD: 100,
  });

  assert.notOk(service.get('checkPointsLimits')(character));
});

test('it checks points limits when limit points not get overcome',function(assert){
  let service = this.subject();
  let character = Ember.Object.create({
     powerLevel: service.get('list')[0],
     totalPD: 50,
  });

  assert.ok(service.get('checkPointsLimits')(character));
});
test('it checks talent limits PD when limit get overcome',function(assert){
  let service = this.subject();
  let character = Ember.Object.create({
     powerLevel: service.get('list')[0],
     talentsPD: 100
  });

  assert.notOk(service.get('checkTalentsPDLimits')(character));
});

test('it checks talent limits PD when limit not get overcome',function(assert){
  let service = this.subject();
  let character = Ember.Object.create({
     powerLevel: service.get('list')[0],
     talentsPD: 20
  });

  assert.ok(service.get('checkTalentsPDLimits')(character));
});

test('it checks skillpower-levels-tests limits when limit Max count get overcome',function(assert){
  let service = this.subject();
  let character = Ember.Object.create({
     powerLevel: service.get('list')[1],
     skills: Ember.A([
       Ember.Object.create({level:3}),
       Ember.Object.create({level:3}),
       Ember.Object.create({level:3}),
       Ember.Object.create({level:3}),
       Ember.Object.create({level:3})
     ])
  });

  assert.notOk(service.get('checkSkillsLimits')(character));
});

test('it checks skills limits when limit Max count not get overcome',function(assert){
  let service = this.subject();
  let character = Ember.Object.create({
     powerLevel: service.get('list')[1],
     skills: Ember.A([
       Ember.Object.create({level:3}),
       Ember.Object.create({level:3}),
       Ember.Object.create({level:4})
     ])
  });

  assert.ok(service.get('checkSkillsLimits')(character));
});
