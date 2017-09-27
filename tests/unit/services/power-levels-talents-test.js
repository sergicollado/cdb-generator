import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

  moduleFor('service:power-levels', 'Unit | Service | power levels', {
  // Specify the other units that are required for this test.
  needs: ['service:talents']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
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


test('it checks skills limitations count not get overcome',function(assert){
  let service = this.subject();
  let character = Ember.Object.create({
     powerLevel: service.get('list')[1],
     limitations:Ember.A([
       Ember.Object.create({name:'a limitation'}),
       Ember.Object.create({name:'another limitation'})
     ]),
  });

  assert.ok(service.get('checkLimitationsLimits')(character));
});

test('it checks skills limitations count get overcome',function(assert){
  let service = this.subject();
  let character = Ember.Object.create({
     powerLevel: service.get('list')[1],
     limitations:Ember.A([
       Ember.Object.create({name:'a limitation'}),
       Ember.Object.create({name:'another limitation'}),
       Ember.Object.create({name:'overcome limitation'})
     ]),
  });

  assert.notOk(service.get('checkLimitationsLimits')(character));
});
