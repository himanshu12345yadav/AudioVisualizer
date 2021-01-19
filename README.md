# Audio Visualizer

Its an Audio Visualizer / Grapher based on Web Audio Context Interface . It takes the audio Source and applied DFT to map Amplitude with respective sinusoid frequencies and then display them using the Canvas.

# Getting Started

```bash
git clone https://github.com/himanshu12345yadav/AudioVisualizer.git
cd AudioVisualizer

```

After downloading the source code you will find following directories

-   Example: Consists of a working Example
-   Build: Consits of build source code (Build Files with their Type Definitions)
-   src: Source Code(In Typescript)

# Usage

Iniitalise the Visualizer constructor

```js
import Visualizer from './build/Visualizer.js';
// First Grab canvas and audioElement
Visualizer(canvas, audioContext, { options });
```

# Options

The Third argument in the Visualizer constructor is the Options Object which you can use to configure the Audio Visualizer.

-   `fftSize` : determines the size of DFT array when we get back after applying DFT. Increase the fftSize leads to better quality of Visualizer, results into more resource consuming. fftSize should be in terms of power of 2 For Ex: 256, 512, 1024, 2048 .... For Balanced Results use 1024 as fftSize for `Linear Visualizer` and 256 or 512 as fftSize for `Radial Visualizer`.
-   `radius` : Radius of the center circle in case of Circular Visualizer. `Defaults to 20`
-   `lineCap` : Determine the style of Cap, Choose one out of `round|square|butt` . `Defaults to round`
-   `lineWidth` : Determine the lineWidth of Visualizer . `Defaults to 10`
-   `visualizer`: Determine the type of Visualizer, choose one from `Linear|radial`

`Happy Hacking!`
