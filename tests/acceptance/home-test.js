import { test } from 'qunit';
import moduleForAcceptance from 'cd-bgenerator/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | home');

test('visiting /home', function(assert) {
  visit('/home');
  andThen(function() {
    assert.equal(currentURL(), '/home');
  });
});

test('should show pregenerated character list', function(assert) {
  visit('/home');
  andThen(function() {
    assert.equal(find('.listing').length, 3, 'should see 3 listings');
  });
});

//test('should contain a button to create new characters', function(assert){
  //visit('/home');
  //andThen(function() {
    //assert.equal(find('.listing').length, 3, 'should see 3 listings');
  //});
//});

//test('should show details of generated characters', function(assert){
//});
