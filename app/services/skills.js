import Ember from 'ember';

export default Ember.Service.extend({
    NTList: Ember.inject.service('technological-levels'),
    base: ['agilidad', 'atención', 'escalar', 'pelea', 'vigor', 'voluntad'],
    getOptionalSkillsByNT: function(NT) {
      return this.get('NTList.skills')[NT];
    }
});
