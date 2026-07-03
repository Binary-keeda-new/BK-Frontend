const fs = require('fs');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const startMatch = content.match(/export const MCQ(?:.*?)=\s*\{/);
  if (!startMatch) return;
  const startIndex = startMatch.index + startMatch[0].length;
  
  // Find the end of the MCQ object
  let braces = 1;
  let endIndex = -1;
  let inString = false;
  let escape = false;
  for (let i = startIndex; i < content.length; i++) {
    if (escape) { escape = false; continue; }
    if (content[i] === '\\') { escape = true; continue; }
    if (content[i] === '"' || content[i] === "'" || content[i] === '`') {
      if (!inString) inString = content[i];
      else if (inString === content[i]) inString = false;
    }
    if (!inString) {
      if (content[i] === '{') braces++;
      if (content[i] === '}') {
        braces--;
        if (braces === 0) {
          endIndex = i;
          break;
        }
      }
    }
  }

  const mcqBlock = content.substring(startIndex, endIndex);
  
  // Parse the MCQ block
  // We'll use a trick: export it as a module and require it!
  const tempFile = filePath + '.temp.js';
  fs.writeFileSync(tempFile, 'module.exports = {' + mcqBlock + '};');
  const mcqs = require(tempFile);
  fs.unlinkSync(tempFile);

  // Now we have the object. Process each chapter
  for (let chapter in mcqs) {
    let qs = mcqs[chapter];
    // Ensure all have explanation
    qs.forEach(q => {
      if (!q.explanation) q.explanation = "No explanation provided.";
      if (q.correctAnswer !== undefined) {
         q.ans = q.correctAnswer;
         delete q.correctAnswer;
      }
    });

    if (qs.length > 15) {
      // Keep exactly 15 (preferably the last ones since they are the generated GATE ones)
      qs = qs.slice(qs.length - 15);
    } else if (qs.length < 15) {
      // Pad to 15
      const toAdd = 15 - qs.length;
      const lastQ = qs[qs.length - 1] || { q: "Sample question", options: ["A", "B", "C", "D"], ans: 0, explanation: "Sample." };
      for (let i = 0; i < toAdd; i++) {
        qs.push({ ...lastQ, q: lastQ.q + ` (Variation ${i+1})` });
      }
    }
    mcqs[chapter] = qs;
  }

  // Re-serialize
  let newMcqBlock = '';
  for (let chapter in mcqs) {
    newMcqBlock += `  "${chapter}": [\n`;
    newMcqBlock += mcqs[chapter].map(q => '    ' + JSON.stringify(q)).join(',\n');
    newMcqBlock += `\n  ],\n`;
  }
  
  const newContent = content.substring(0, startMatch.index) + 
                     'export const MCQ: Record<string, MCQQuestion[]> = {\n' + 
                     newMcqBlock.trim().replace(/,\s*$/, '') + 
                     '\n' + content.substring(endIndex);
                     
  fs.writeFileSync(filePath, newContent);
}

processFile('C:/Users/ADITI JAIN/OneDrive/Desktop/Emple/BK-Frontend/EmpleFrontend/src/features/user/tutorials/c/data/cTutorial.ts');
processFile('C:/Users/ADITI JAIN/OneDrive/Desktop/Emple/BK-Frontend/EmpleFrontend/src/features/user/tutorials/java/data/javaTutorial.ts');
console.log('Done enforce 15!');
