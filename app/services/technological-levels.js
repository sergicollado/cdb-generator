import Ember from 'ember';

export default Ember.Service.extend({
  skills:{
    NT1To4: [
        ['arcos','armas arrojadizas', 'armas a 1 mano', 'armas a 2 manos', 'ballestas'],
        ['etiqueta','montar', 'nadar'],
        ['supervivencia']],
    NT5: [
        ['arcos','armas arrojadizas', 'armas a 1 mano', 'armas de polvora', 'ballestas'],
        ['etiqueta','montar', 'nadar'],
        ['supervivencia']],
    NT6: [
        ['armas arrojadizas', 'armas cortas', 'armas largas', 'etiqueta'],
        ['conocimiento(Arte)','conocimiento (Historia)','ciencia (Biología)', 'ciencia (Física)', 'ciencia (Química)', 'computadora'],
        ['conducir vehículos (Ligeros)']],
    NT7To10: [
        ['armas cortas', 'armas largas', 'computadora','comunicaciones', 'etiqueta','sensores'],
        [ 'conocimiento (Arte)',
          'conocimiento (Geografía)',
          'conocimiento (Historia)',
          'conocimiento (Leyes)',
          'conocimiento (Lingüista)',
          'conocimiento (Psicología)',
          'conocimiento (Saber Arcano)',
          'conocimiento (Sociología)',
          'conocimiento (Teología)',
          'ciencia (Biología)',
          'ciencia (Física)',
          'ciencia (Forense)',
          'ciencia (Genética)',
          'ciencia (Geología)',
          'ciencia (informática)',
          'ciencia (Ingeniería)',
          'ciencia (Matemáticas)',
          'ciencia (Medicina)',
          'ciencia (Química)',
          'ciencia (Robótica)',
          'ciencia (Xenología)'],
        ['conducir vehículos(Ligeros)', 'pilotar (Aeronave)', 'pilotar (Astronave)']
    ]}
});
