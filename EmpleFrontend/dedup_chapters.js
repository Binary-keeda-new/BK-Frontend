const fs = require('fs');
const path = require('path');
const dir = 'C:\\\\Users\\\\ADITI JAIN\\\\OneDrive\\\\Desktop\\\\Emple\\\\BK-Frontend\\\\EmpleFrontend\\\\src\\\\features\\\\user\\\\tutorials\\\\java\\\\data\\\\chapters';

const files = fs.readdirSync(dir).filter(f => f.startsWith('chapter') && f.endsWith('.ts'));

let fixedFiles = 0;

files.forEach(f => {
    let p = path.join(dir, f);
    let oldText = fs.readFileSync(p, 'utf8');
    
    // The format is export const chapterXX_MCQ
    let match = f.match(/chapter(\d+)_/);
    if(match) {
        let chapNum = match[1];
        let varName = 'export const chapter' + chapNum + '_MCQ';
        
        let instances = [...oldText.matchAll(new RegExp(varName, 'g'))];
        
        if (instances.length > 1) {
            console.log(f + ' has ' + instances.length + ' instances of ' + varName);
            
            // We want to keep ONLY the first one. Wait, in recover_tags.js it replaced the dummy array with the GOOD array, but since there were multiple replace calls, it prepended the good array multiple times!
            // Wait, actually, recover_tags.js appended it before `];`. So it's:
            // good array
            // rest of good array
            // old array
            
            // Let's just find the very last occurrence of export const chapterXX_MCQ, and extract it completely until the END of the array `];`
            // Then remove ALL occurrences of export const chapterXX_MCQ and replace with just one!
            
            let lastIdx = instances[instances.length - 1].index;
            let endIdx = oldText.indexOf('];', lastIdx);
            
            // It might have ]\n; or something, but usually ];
            // Wait, what if the array itself has ]; inside it?
            // Since we already know the file structure:
            // export const chapterXX_CONTENT = ...
            // export const chapterXX_MCQ = ...
            // export const chapterXX_DEBUG = ...
            // export const chapterXX_DRAG_DROP = ...
            
            // So we can just split the file:
            let contentStart = oldText.indexOf('export const chapter' + chapNum + '_CONTENT');
            let debugStart = oldText.indexOf('export const chapter' + chapNum + '_DEBUG');
            
            // But wait, the MCQ array is between CONTENT and DEBUG.
            if (contentStart !== -1 && debugStart !== -1) {
                // We know that between contentStart and debugStart, there are multiple MCQ arrays.
                // We want to keep ONLY ONE MCQ array. We can just take the string from the LAST export const chapterXX_MCQ up to debugStart.
                let theCorrectArray = oldText.substring(lastIdx, debugStart).trim();
                
                // Wait, does theCorrectArray contain valid syntax?
                // Yes, the last one should be the correct one!
                
                // Let's find where CONTENT ends. It ends at the first `};` before the first MCQ array!
                let firstMcqStart = instances[0].index;
                let beforeMcq = oldText.substring(0, firstMcqStart);
                
                let newText = beforeMcq + theCorrectArray + '\n\n' + oldText.substring(debugStart);
                fs.writeFileSync(p, newText, 'utf8');
                console.log('Fixed', f);
                fixedFiles++;
            }
        }
    }
});

console.log('Fixed ' + fixedFiles + ' files with duplicate arrays.');
