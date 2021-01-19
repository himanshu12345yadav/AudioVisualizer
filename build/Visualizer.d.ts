declare type fftSize = 256 | 512 | 1024 | 2048;
declare type radius = number;
declare type visualizer = 'Linear' | 'Radial';
interface VisualizerOptions {
    fftSize: fftSize;
    radius?: radius;
    visualizer: visualizer;
    lineWidth?: number;
    lineCap?: 'round' | 'square' | 'butt';
}
export default function Visualizer(canvas: HTMLCanvasElement, audioElement: HTMLAudioElement, options: VisualizerOptions): void;
export {};
//# sourceMappingURL=Visualizer.d.ts.map