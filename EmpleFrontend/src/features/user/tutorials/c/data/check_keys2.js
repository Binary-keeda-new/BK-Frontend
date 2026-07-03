const fs = require('fs');

function analyze(file) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  
  const contentKeys = [];
  const mcqKeys = [];
  
  let inContent = false;
  let inMCQ = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('export const CONTENT:')) {
      inContent = true;
      inMCQ = false;
      continue;
    }
    if (line.includes('export const MCQ:')) {
      inContent = false;
      inMCQ = true;
      continue;
    }
    if (line.includes('export const DEBUG:')) {
      inMCQ = false;
    }
    
    if (inContent) {
      const match = line.match(/^  ([a-zA-Z0-9\-]+|"[a-zA-Z0-9\-]+"): \{/);
      if (match) contentKeys.push(match[1].replace(/"/g, ''));
    }
    
    if (inMCQ) {
      const match = line.match(/^  "?([a-zA-Z0-9\-]+)"?:\s*\[/);
      if (match) mcqKeys.push(match[1].replace(/"/g, ''));
    }
  }
  
  console.log(file);
  console.log('CONTENT:', contentKeys);
  console.log('MCQ:', mcqKeys);
  const missing = contentKeys.filter(k => !mcqKeys.includes(k));
  console.log('Missing in MCQ:', missing);
  console.log('---');
}

analyze('C:/Users/ADITI JAIN/OneDrive/Desktop/Emple/BK-Frontend/EmpleFrontend/src/features/user/tutorials/c/data/cTutorial.ts');
analyze('C:/Users/ADITI JAIN/OneDrive/Desktop/Emple/BK-Frontend/EmpleFrontend/src/features/user/tutorials/java/data/javaTutorial.ts');
