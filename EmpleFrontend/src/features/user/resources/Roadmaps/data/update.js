const fs = require('fs');
const filePath = 'C:/Users/ADITI JAIN/OneDrive/Desktop/Emple/BK-Frontend/EmpleFrontend/src/features/user/resources/Roadmaps/data/PlacementRoadmap.ts';
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
let dayCounter = 0;
let modified = false;

const playlistUrl = 'https://www.youtube.com/embed/videoseries?list=PLpyc33gOcbVA4qXMoQ5vmhefTruk5t9lt';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const dayMatch = line.match(/^\s*"day":\s*(\d+)/);
  if (dayMatch) {
    dayCounter = parseInt(dayMatch[1], 10);
  }
  
  if (dayCounter >= 1 && dayCounter <= 27) {
    // If we find an iframe resource url for the Career Ride playlist, replace it
    if (line.includes('list=PLpyc33gOcbVA4qXMoQ5vmhefTruk5t9lt')) {
      // The original urls look like https://www.youtube.com/embed/ZuMJFleXmiw?list=PLpyc33gOcbVA4qXMoQ5vmhefTruk5t9lt
      lines[i] = line.replace(/https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+\?list=PLpyc33gOcbVA4qXMoQ5vmhefTruk5t9lt/, playlistUrl);
      modified = true;
    }
  }
}

if (modified) {
  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
  console.log('Successfully updated urls');
} else {
  console.log('No modifications made');
}
