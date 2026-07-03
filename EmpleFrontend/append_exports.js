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
        let needsWrite = false;
        
        if (!text.includes(`export const chapter${chapNum}_DEBUG`)) {
            text += `\nexport const chapter${chapNum}_DEBUG = undefined;\n`;
            needsWrite = true;
        }
        if (!text.includes(`export const chapter${chapNum}_DRAG_DROP`)) {
            text += `export const chapter${chapNum}_DRAG_DROP = undefined;\n`;
            needsWrite = true;
        }
        if (!text.includes(`export const chapter${chapNum}_COMPLETE_EXERCISES`)) {
            text += `export const chapter${chapNum}_COMPLETE_EXERCISES = [];\n`;
            needsWrite = true;
        }
        
        if (needsWrite) {
            fs.writeFileSync(p, text, 'utf8');
            console.log('Appended missing exports to', f);
        }
    }
});
