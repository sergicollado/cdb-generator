import Ember from 'ember';

export default Ember.Service.extend({
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
        ['conocimiento (Arte)','conocimiento (Arte)','ciencia (Biología)', 'ciencia (Física)', 'ciencia (Química)', 'computadora'],
        ['conducir vehículos (Ligeros)']],
    NT7To10: [
        ['armas cortas', 'armas largas', 'computadora','comunicaciones', 'etiqueta','sensores'],
        ['conocimiento ()', 'ciencia()'],
        ['conducir vehículos(Ligeros)', 'pilotar (Aeronave)', 'pilotar (Astronave)']
    ]
});
