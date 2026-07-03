const fs = require('fs');
const path = require('path');
const dir = 'C:\\\\Users\\\\ADITI JAIN\\\\OneDrive\\\\Desktop\\\\Emple\\\\BK-Frontend\\\\EmpleFrontend\\\\src\\\\features\\\\user\\\\tutorials\\\\java\\\\data\\\\chapters';

const files = fs.readdirSync(dir).filter(f => f.startsWith('chapter') && f.endsWith('.ts'));

files.forEach(f => {
    let p = path.join(dir, f);
    let text = fs.readFileSync(p, 'utf8');
    
    let match = f.match(/chapter(\d+)_/);
    if(match) {
        let chapNum = match[1];
        if (parseInt(chapNum) > 20) {
            return; // 21-25 are fine
        }
        
        // We want to extract the blocks.
        // The blocks start with `export const chapterXX_NAME = `
        
        let extractBlock = (name, isArray) => {
            let search = `export const chapter${chapNum}_${name} = `;
            let idx = text.indexOf(search);
            if (idx === -1) return null;
            
            // We find the matching closing brace/bracket
            let startChar = isArray ? '[' : '{';
            let endChar = isArray ? ']' : '}';
            
            let objStart = text.indexOf(startChar, idx);
            if (objStart === -1) return null;
            
            // Because some are just `undefined;`, let's handle that
            let lineEnd = text.indexOf(';', idx);
            let substringToLineEnd = text.substring(idx, lineEnd + 1);
            if (substringToLineEnd.includes('undefined')) {
                return substringToLineEnd;
            }
            
            let count = 0;
            let i = objStart;
            let inString = false;
            let stringChar = '';
            let escape = false;
            
            for (; i < text.length; i++) {
                let char = text[i];
                if (escape) {
                    escape = false;
                    continue;
                }
                if (char === '\\') {
                    escape = true;
                    continue;
                }
                if (inString) {
                    if (char === stringChar) {
                        inString = false;
                    }
                    continue;
                }
                if (char === '"' || char === "'" || char === '`') {
                    inString = true;
                    stringChar = char;
                    continue;
                }
                
                if (char === startChar) count++;
                if (char === endChar) {
                    count--;
                    if (count === 0) {
                        let endIdx = text.indexOf(';', i);
                        if (endIdx !== -1 && endIdx - i < 10) {
                            return text.substring(idx, endIdx + 1);
                        }
                        return text.substring(idx, i + 1) + ';';
                    }
                }
            }
            return null;
        };

        let contentBlock = extractBlock('CONTENT', false);
        let mcqBlock = extractBlock('MCQ', true);
        let debugBlock = extractBlock('DEBUG', false);
        let dragDropBlock = extractBlock('DRAG_DROP', false);
        
        if (!contentBlock) contentBlock = `export const chapter${chapNum}_CONTENT = {\ntitle: "Unknown",\ndescription: "",\nsections: []\n};`;
        if (!debugBlock) debugBlock = `export const chapter${chapNum}_DEBUG = undefined;`;
        if (!dragDropBlock) dragDropBlock = `export const chapter${chapNum}_DRAG_DROP = undefined;`;
        if (!mcqBlock) mcqBlock = `export const chapter${chapNum}_MCQ = [];`;
        
        let newText = `// Chapter ${chapNum}\n\n`;
        newText += contentBlock + '\n\n';
        newText += debugBlock + '\n\n';
        newText += dragDropBlock + '\n\n';
        newText += mcqBlock + '\n\n';
        newText += `export const chapter${chapNum}_COMPLETE_EXERCISES = [];\n`;
        
        fs.writeFileSync(p, newText, 'utf8');
        console.log('Fixed completely:', f);
    }
});
