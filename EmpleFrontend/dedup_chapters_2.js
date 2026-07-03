const fs = require('fs');
const path = require('path');
const dir = 'C:\\\\Users\\\\ADITI JAIN\\\\OneDrive\\\\Desktop\\\\Emple\\\\BK-Frontend\\\\EmpleFrontend\\\\src\\\\features\\\\user\\\\tutorials\\\\java\\\\data\\\\chapters';

const files = fs.readdirSync(dir).filter(f => f.startsWith('chapter') && f.endsWith('.ts'));

files.forEach(f => {
    let p = path.join(dir, f);
    let oldText = fs.readFileSync(p, 'utf8');
    
    let match = f.match(/chapter(\d+)_/);
    if(match) {
        let chapNum = match[1];
        let varName = 'export const chapter' + chapNum + '_MCQ';
        
        let instances = [...oldText.matchAll(new RegExp(varName, 'g'))];
        
        if (instances.length > 1) {
            console.log(f + ' has ' + instances.length + ' instances of ' + varName);
            
            // Keep ONLY the last instance of chapterXX_MCQ
            let lastIdx = instances[instances.length - 1].index;
            let theCorrectArrayPart = oldText.substring(lastIdx);
            
            // Now cut off everything AFTER the correct array part if there is any garbage
            // Wait, for 1-15, there is NO garbage after the array. For 16-25 we already fixed them!
            // Wait, the correct array part just extends to the end of the file.
            // But we need to remove all earlier instances. The earliest one starts at instances[0].index.
            let beforeMcq = oldText.substring(0, instances[0].index);
            
            // But wait, what if the correct array part includes the appended DEBUG stuff?
            // If it does, great! If it doesn't, we'll append it later.
            let newText = beforeMcq + theCorrectArrayPart;
            fs.writeFileSync(p, newText, 'utf8');
        }
    }
});
