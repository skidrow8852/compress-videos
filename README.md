# Video Compressor
A package for compressing videos that uses `ffmpeg` and the `libx264` compression algorithm. It reduces the size of videos by up to 40% while maintaining lossless quality.

![Designer(2)(1)](https://github.com/user-attachments/assets/57fa40aa-2548-4277-999d-5507e2e9c4c3)

## Installation
1. Install the ```compress-videos``` package

```bash
npm install compress-videos
```
2. Install FFmpeg, This package requires **FFmpeg** to be installed on your system. Follow the instructions below based on your operating system:

##### For Windows:
1. Download FFmpeg from the official website: [FFmpeg Download](https://ffmpeg.org/download.html)
2. Choose the Windows version and download the zip file.
3. Extract the zip file to this directory ```(C:\ffmpeg)```.

##### For Linux:
On Ubuntu/Debian-based systems, install FFmpeg via APT:

```bash
sudo apt update
sudo apt install ffmpeg
```

# Usage

```js
const { compressVideo } = require('./videoCompress');

const videoPath = '/videos/test.mp4'
const replaceOriginal = false; //- Whether to replace the original video with the compressed one.

compressVideo(videoPath, replaceOriginal)
  .then((resultPath) => {
    console.log(`Video compressed successfully and replaced: ${resultPath}`);
  })
  .catch((err) => {
    console.error(`Error: ${err.message}`);
  });

```

# How It Works
This package uses `ffmpeg` to compress videos, reducing their size by up to 40% without sacrificing quality. The compression process is lossless, ensuring that the video retains its original visual and audio quality while reducing the file size.


The `libx264` codec is widely used for its efficient compression and high-quality output. This makes it ideal for reducing storage requirements and optimizing videos for faster upload speeds while maintaining the same high-quality output.
