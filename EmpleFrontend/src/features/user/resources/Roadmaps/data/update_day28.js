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

for (let day of rawDays) {
  if (day.resources && Array.isArray(day.resources)) {
    // 1. Remove 'DBMS Lec: DBMS'
    day.resources = day.resources.filter(res => res.title !== 'DBMS Lec: DBMS');
    
    // 2. Find URL of 'Video Link' if 'DBMS Interview Questions:' is present
    const videoLinkItem = day.resources.find(res => res.title === 'Video Link');
    const interviewItem = day.resources.find(res => res.title && res.title.includes('DBMS Interview Questions'));
    
    if (interviewItem && videoLinkItem && videoLinkItem.url) {
      // Merge URL into the interview item
      interviewItem.url = videoLinkItem.url;
      // Remove 'Video Link'
      day.resources = day.resources.filter(res => res.title !== 'Video Link');
    }
  }
}

const newArrayStr = JSON.stringify(rawDays, null, 2);
const newContent = content.substring(0, startIndex + startMarker.length) + newArrayStr + ';\n' + content.substring(endIndex);

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Successfully updated Day 28 resources');
