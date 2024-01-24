#!/bin/sh
ffmpeg -i videos/video.webm -vf "fps=10,scale=1024:-1:flags=lanczos,palettegen" -y palette.png
ffmpeg -i videos/video.webm -i palette.png -filter_complex "fps=10,scale=1024:-1:flags=lanczos[x];[x][1:v]paletteuse" videos/video.gif
