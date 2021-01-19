type fftSize = 256 | 512 | 1024 | 2048;
type radius = number;
type visualizer = 'Linear' | 'Radial';

interface VisualizerOptions {
    fftSize: fftSize;
    radius?: radius;
    visualizer: visualizer;
    lineWidth?: number;
    lineCap?: 'round' | 'square' | 'butt';
}
export default function Visualizer(
    canvas: HTMLCanvasElement,
    audioElement: HTMLAudioElement,
    options: VisualizerOptions
) {
    let audioContext = new AudioContext();
    let audioAnalyser = audioContext.createAnalyser();
    audioAnalyser.fftSize = options.fftSize;
    let canvasContext = canvas.getContext('2d');
    let source = audioContext.createMediaElementSource(audioElement);
    source.connect(audioAnalyser);
    source.connect(audioContext.destination);
    let blob = new Uint8Array(audioAnalyser.frequencyBinCount);
    const looper = () => {
        audioAnalyser.getByteFrequencyData(blob);
        let spread = canvas.width / blob.length;
        if (
            !canvasContext ||
            !(canvasContext instanceof CanvasRenderingContext2D)
        ) {
            throw new Error('Failed to Get Canvas2DContext');
        }

        if (options.visualizer === 'Linear') {
            linearVisualizer(
                canvas,
                blob,
                canvasContext,
                spread,
                canvas.height / 2,
                options.lineWidth,
                options.lineCap
            );
        } else if (options.visualizer === 'Radial') {
            circularVisualizer(
                canvas,
                blob,
                canvasContext,
                canvas.width / 2,
                canvas.height / 2,
                options.radius,
                options.lineWidth,
                options.lineCap
            );
        }

        requestAnimationFrame(looper);
    };

    audioElement.onplay = () => {
        audioContext.resume().then(() => {
            looper();
        });
    };
}

const linearVisualizer = (
    canvas: HTMLCanvasElement,
    blobArray: Uint8Array,
    context: CanvasRenderingContext2D,
    spread: number,
    midPosition: number,
    LineWidth: number = 20,
    lineCap: 'round' | 'square' | 'butt' = 'round'
) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    blobArray.forEach((amplitude, index) => {
        amplitude = Math.round(amplitude);
        context.beginPath();
        let gradient = context.createLinearGradient(
            (LineWidth - spread) * index,
            midPosition + amplitude,
            (LineWidth - spread) * index,
            canvas.height - midPosition - amplitude
        );
        gradient.addColorStop(0, '#005e7f');
        gradient.addColorStop(1, '#61b6cd');
        context.strokeStyle = gradient;
        context.lineWidth = LineWidth;
        context.lineCap = lineCap;
        context.moveTo((LineWidth - spread) * index, midPosition + amplitude);
        context.lineTo(
            (LineWidth - spread) * index,
            canvas.height - midPosition - amplitude
        );
        context.stroke();
    });
};

const circularVisualizer = (
    canvas: HTMLCanvasElement,
    blobArray: Uint8Array,
    context: CanvasRenderingContext2D,
    circleX: number,
    midPosition: number,
    radius: number = 20,
    lineWidth: number = 10,
    lineCap: 'round' | 'square' | 'butt' = 'round'
): void => {
    let sweep = 360 / blobArray.length;
    context.clearRect(0, 0, canvas.width, canvas.height);
    blobArray.forEach((amplitude, index) => {
        context.beginPath();
        context.strokeStyle = '#ee79b7';
        context.arc(circleX, midPosition, radius, 0, 2 * Math.PI);
        context.beginPath();
        context.lineWidth = lineWidth;
        context.lineCap = lineCap;
        let gradient = context.createLinearGradient(
            circleX + radius * Math.cos(index * sweep),
            canvas.height - midPosition - radius * Math.sin(index * sweep),
            circleX + (radius + amplitude) * Math.cos(index * sweep),
            canvas.height -
                midPosition -
                (radius + amplitude) * Math.sin(index * sweep)
        );

        gradient.addColorStop(0, '#005e7f');
        gradient.addColorStop(1, '#61b6cd');
        context.strokeStyle = gradient;

        context.moveTo(
            circleX + radius * Math.cos(index * sweep),
            canvas.height - midPosition - radius * Math.sin(index * sweep)
        );

        context.lineTo(
            circleX + (radius + amplitude) * Math.cos(index * sweep),
            canvas.height -
                midPosition -
                (radius + amplitude) * Math.sin(index * sweep)
        );
        context.stroke();
    });
};
