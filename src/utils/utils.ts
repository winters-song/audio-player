import { PlayListItem } from "../models/common";

const jsmediatags = require('jsmediatags-web');


export const formatTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const displayHours = hours > 0 ? hours.toString().padStart(2, '0') : '';
  const displayMinutes = minutes.toString().padStart(2, '0');
  const displaySeconds = seconds.toString().padStart(2, '0');

  return [displayHours, displayMinutes, displaySeconds]
    .filter(v => v !== '')
    .join(':')
}

interface IAudioInfo {
  title: string;
  artist: string;
  cover: string;
}

export const decodeMusic = (file: any) => {
  return new Promise<IAudioInfo>((resolve, reject) => {
    jsmediatags.read(file, {
      onSuccess: function (info: any) {
        console.log(info)
        var picture = info.tags.picture;
        if (picture) {
          var base64String = '';
          for (let i = 0; i < picture.data.length; i++) {
            base64String += String.fromCharCode(picture.data[i]);
          }
          var imageUri = 'data:' + picture.format + ';base64,' + btoa(base64String);
          resolve({
            title: info.tags.title,
            artist: info.tags.artist,
            cover: imageUri
          })
        }
      },
      onError: function (error: any) {
        console.error(error);
        reject(error)
      }
    });
  })

}


export const presetLocalMusic = async (file: string) => {

  return new Promise<PlayListItem>((resolve, reject) => {
    
    fetch(file)
    .then(response => {
      // 确保请求成功
      if (!response.ok) {
        reject('Network response was not ok');
      }
      // 将响应转换为 Blob
      return response.blob();
    })
    .then(async (file) => {
      const blobUrl = URL.createObjectURL(file);
      const filename = "Unknown";

      const params = await decodeMusic(file)
      resolve({ name: filename, url: blobUrl, ...params })
    })
    
  })
    
  
}
