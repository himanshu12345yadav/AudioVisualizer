import Visualizer from './Visualizer.js';
var canvas = document.getElementById('audio-canvas');
var audioElement = document.getElementById('audioElement');
if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
    throw new Error('Failed to Get Canvas2DContext');
}
if (!audioElement || !(audioElement instanceof HTMLAudioElement)) {
    throw new Error('Failed to get the audio Element');
}
Visualizer(canvas, audioElement, {
    fftSize: 512,
    radius: 20,
    lineWidth: 20,
    visualizer: 'Linear',
});
//# sourceMappingURL=index.js.map