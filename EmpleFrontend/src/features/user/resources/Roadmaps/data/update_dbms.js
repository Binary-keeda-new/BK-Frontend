const fs = require('fs');
const filePath = 'C:/Users/ADITI JAIN/OneDrive/Desktop/Emple/BK-Frontend/EmpleFrontend/src/features/user/resources/Roadmaps/data/PlacementRoadmap.ts';
const content = fs.readFileSync(filePath, 'utf8');

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
  rawDays = new Function('return ' + arrayStr)();
} catch (e) {
  console.error("Failed to parse array: ", e);
  process.exit(1);
}

const newPlaylistUrl = 'https://www.youtube.com/embed/videoseries?list=PLDzeHZWIZsTpukecmA2p5rhHM14bl2dHU';

for (let day of rawDays) {
  if (day.day >= 28 && day.day <= 41) {
    if (day.resources && Array.isArray(day.resources)) {
      // Filter out the wrongly added 'Career Ride Playlist'
      day.resources = day.resources.filter(res => 
        !(res.type === 'iframe' && (res.title === 'Career Ride Playlist' || res.url.includes('PLpyc33gOcbVA4qXMoQ5vmhefTruk5t9lt')))
      );
      
      // Check if DBMS playlist already exists
      let hasDbms = false;
      for (let res of day.resources) {
        if (res.type === 'iframe' && (res.title === 'DBMS Playlist' || res.url.includes('PLDzeHZWIZsTpukecmA2p5rhHM14bl2dHU'))) {
          res.url = newPlaylistUrl;
          res.title = 'DBMS Playlist';
          hasDbms = true;
        }
      }
      
      if (!hasDbms) {
        day.resources.unshift({
          type: 'iframe',
          title: 'DBMS Playlist',
          url: newPlaylistUrl
        });
      }
    }
  }
}

const newArrayStr = JSON.stringify(rawDays, null, 2);
const newContent = content.substring(0, startIndex + startMarker.length) + newArrayStr + ';\n' + content.substring(endIndex);

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Successfully updated days 28-41 with DBMS playlist');
