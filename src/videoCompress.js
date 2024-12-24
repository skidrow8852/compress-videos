const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');
const os = require('os');

// Set FFmpeg path for Windows
if (os.platform() === 'win32') {
  ffmpeg.setFfmpegPath('C:\\ffmpeg\\bin\\ffmpeg.exe');
}

/**
 * Compress a video file using FFmpeg.
 * @param {string} inputPath - The path to the input video file.
 * @param {boolean} replaceOriginal - Whether to replace the original video with the compressed one.
 * @param {number} [crf=28] - The CRF value for video compression (lower is better quality, default is 28).
 * @param {string} [preset='faster'] - The FFmpeg preset for compression (default is 'faster').
 * @param {string} [tune='film'] - The FFmpeg tune option (default is 'film').
 * @returns {Promise<string>} - Resolves to the path of the compressed video.
 */
function compressVideo(inputPath, replaceOriginal, crf = 28, preset = 'faster', tune = 'film') {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(inputPath)) {
      return reject(new Error(`Input file does not exist: ${inputPath}`));
    }

    const inputExt = path.extname(inputPath);
    const inputBase = path.basename(inputPath, inputExt);
    const outputPath = replaceOriginal
      ? `${inputPath}_compressed${inputExt}`
      : `${path.dirname(inputPath)}/${inputBase}_compressed${inputExt}`;

    console.log(`Starting compression for: ${inputPath}`);

    ffmpeg(inputPath)
      .videoCodec('libx264')
      .outputOptions([`-crf ${crf}`, `-preset ${preset}`, `-tune ${tune}`])
      .on('progress', (progress) => {
        console.log(
          `Compression progress: ${Math.round(progress.percent || 0)}% done, frame: ${
            progress.frames
          }, current time: ${progress.currentKbps || 0} kbps`
        );
      })
      .on('error', (err) => reject(new Error(`Error compressing video: ${err.message}`)))
      .on('end', () => {
        console.log(`Compression finished for: ${inputPath}`);
        if (replaceOriginal) {
          // Replace the original file with the compressed file
          fs.rename(outputPath, inputPath, (err) => {
            if (err) return reject(new Error(`Error replacing original file: ${err.message}`));
            resolve(inputPath);
          });
        } else {
          resolve(outputPath);
        }
      })
      .save(outputPath);
  });
}

module.exports = { compressVideo };
