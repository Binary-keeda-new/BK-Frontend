const fs = require('fs');
function checkFile(fileName) {
  const c = fs.readFileSync(fileName, 'utf8');
  let contentMatch = c.match(/export const CONTENT[^=]*= \{([\s\S]+?)\};\n\nexport/);
  if (contentMatch) {
    const keys = [...contentMatch[1].matchAll(/^(?:  |\t)([a-zA-Z\-]+|\"[a-zA-Z\-]+\"):\s*\{/gm)].map(m => m[1].replace(/\"/g, ''));
    console.log(fileName, 'CONTENT keys:', keys);
  }
  let mcqMatch = c.match(/export const MCQ[^=]*= \{([\s\S]+?)\};\n\nexport/);
  if (mcqMatch) {
    const keys = [...mcqMatch[1].matchAll(/^(?:  |\t)\"([a-zA-Z\-]+)\":\s*\[/gm)].map(m => m[1]);
    console.log(fileName, 'MCQ keys:', keys);
  }
}
checkFile('../../java/data/javaTutorial.ts');
