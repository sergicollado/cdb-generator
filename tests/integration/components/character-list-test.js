import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('character-list', 'Integration | Component | character list', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  let character = Ember.Object.create({
    id: 1,
      name: 'aName',
      NT: 1,
      description: 'aDescription'
  });
  this.set('characterObj',character);
  this.render(hbs`{{character-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{character-list character=characterObj}}
  `);

  assert.equal(this.$().text().trim(), '1aNameaDescription');
});
