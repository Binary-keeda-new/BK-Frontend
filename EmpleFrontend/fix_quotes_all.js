const fs = require('fs');
const path = require('path');
const dir = 'C:\\\\Users\\\\ADITI JAIN\\\\OneDrive\\\\Desktop\\\\Emple\\\\BK-Frontend\\\\EmpleFrontend\\\\src\\\\features\\\\user\\\\tutorials\\\\java\\\\data\\\\chapters';
const files = fs.readdirSync(dir);

files.forEach(f => {
    if (f.endsWith('.ts')) {
        let p = path.join(dir, f);
        let oldText = fs.readFileSync(p, 'utf8');
        // Replace `\" with " and `\' with '
        let newText = oldText.replace(/`"/g, '"');
        newText = newText.replace(/`'/g, "'");
        
        // Also sometimes powershell escapes double quotes as ""
        // Let's not touch "" for now unless necessary.
        
        if (oldText !== newText) {
            fs.writeFileSync(p, newText, 'utf8');
            console.log('Fixed quotes in', f);
        }
    }
});
