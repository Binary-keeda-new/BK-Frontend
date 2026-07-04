const fs = require('fs');
const filePath = 'C:/Users/ADITI JAIN/OneDrive/Desktop/Emple/BK-Frontend/EmpleFrontend/src/features/user/resources/Roadmaps/data/PlacementRoadmap.ts';
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
let dayCounter = 0;
let count = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const dayMatch = line.match(/^\s*"day":\s*(\d+)/);
  if (dayMatch) {
    dayCounter = parseInt(dayMatch[1], 10);
  }
  
  if (dayCounter >= 1 && dayCounter <= 27) {
    if (line.includes('embed/videoseries?list=PLpyc33gOcbVA4qXMoQ5vmhefTruk5t9lt')) {
      count++;
    }
  }
}
console.log('Count:', count);
