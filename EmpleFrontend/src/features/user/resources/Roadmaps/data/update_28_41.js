const fs = require('fs');
const filePath = 'C:/Users/ADITI JAIN/OneDrive/Desktop/Emple/BK-Frontend/EmpleFrontend/src/features/user/resources/Roadmaps/data/PlacementRoadmap.ts';
const content = fs.readFileSync(filePath, 'utf8');

// The file format is known:
// const rawDays = [ ... ];
// \nexport const placementRoadmap

const startMarker = 'const rawDays = ';
const endMarker = '\nexport const placementRoadmap =';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find markers.");
  process.exit(1);
}

const arrayStr = content.substring(startIndex + startMarker.length, endIndex).trim().replace(/;$/, '');

let rawDays;
try {
  // Use Function instead of eval for safer/easier evaluation
  rawDays = new Function('return ' + arrayStr)();
} catch (e) {
  console.error("Failed to parse array: ", e);
  process.exit(1);
}

const playlistUrl = 'https://www.youtube.com/embed/videoseries?list=PLpyc33gOcbVA4qXMoQ5vmhefTruk5t9lt';

for (let day of rawDays) {
  if (day.day >= 28 && day.day <= 41) {
    if (!day.resources) {
      day.resources = [];
    }
    
    let hasPlaylist = false;
    for (let res of day.resources) {
      if (res.type === 'iframe' && (res.url.includes('PLpyc33gOcbVA4qXMoQ5vmhefTruk5t9lt') || res.title === 'Career Ride Playlist' || res.title === 'Career Ride')) {
        res.url = playlistUrl;
        res.title = 'Career Ride Playlist';
        hasPlaylist = true;
      }
    }
    
    if (!hasPlaylist) {
      day.resources.unshift({
        type: 'iframe',
        title: 'Career Ride Playlist',
        url: playlistUrl
      });
    }
  }
}

const newArrayStr = JSON.stringify(rawDays, null, 2);
const newContent = content.substring(0, startIndex + startMarker.length) + newArrayStr + ';\n' + content.substring(endIndex);

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Successfully updated days 28-41');
