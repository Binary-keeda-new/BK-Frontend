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
        
        // Remove ALL existing exports of these variables
        let debugRegex = new RegExp(`export const chapter${chapNum}_DEBUG.*?;\\n?`, 'g');
        let dragDropRegex = new RegExp(`export const chapter${chapNum}_DRAG_DROP.*?;\\n?`, 'g');
        let completeRegex = new RegExp(`export const chapter${chapNum}_COMPLETE_EXERCISES.*?;\\n?`, 'g');
        let completeRegex2 = new RegExp(`export const chapter${chapNum}_COMPLETE_EXERCISES.*?\\n?`, 'g');
        
        text = text.replace(debugRegex, '');
        text = text.replace(dragDropRegex, '');
        text = text.replace(completeRegex, '');
        // Sometimes it's exported as [] without a semicolon, though it should have one. Let's just be aggressive.
        text = text.replace(new RegExp(`export const chapter${chapNum}_COMPLETE_EXERCISES\\s*=\\s*\\[\\];?\\n?`, 'g'), '');
        
        // Append EXACTLY ONE copy at the end
        text = text.trim();
        text += `\n\nexport const chapter${chapNum}_DEBUG = undefined;\n`;
        text += `export const chapter${chapNum}_DRAG_DROP = undefined;\n`;
        text += `export const chapter${chapNum}_COMPLETE_EXERCISES = [];\n`;
        
        fs.writeFileSync(p, text, 'utf8');
    }
});
