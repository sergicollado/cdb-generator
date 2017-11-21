import Ember from 'ember';

export default Ember.Helper.helper(function(params){
  let [talent, index] = params;
  if( index <=  talent.get('currentLevel')){
    return 'completed';
  }
  return 'active';
});
