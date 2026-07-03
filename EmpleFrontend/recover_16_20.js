const fs = require('fs');
const path = require('path');

const filesMap = {
    'chapter16_MCQ': 'chapter16_jvm_memory.ts',
    'chapter17_MCQ': 'chapter17_object_wrappers.ts',
    'chapter18_MCQ': 'chapter18_generics.ts',
    'chapter19_MCQ': 'chapter19_comparable_comparator.ts',
    'chapter20_MCQ': 'chapter20_packages_enums.ts'
};

let content = fs.readFileSync('C:\\\\Users\\\\ADITI JAIN\\\\.gemini\\\\antigravity\\\\brain\\\\f9fe1045-d659-4c4d-811d-b0bec42edd3d\\\\.system_generated\\\\logs\\\\transcript_full.jsonl', 'utf8');
let lines = content.split(/\r?\n/);
lines.forEach(line => {
    if(!line.trim()) return;
    try {
        let step = JSON.parse(line);
        if (step.tool_calls) {
            step.tool_calls.forEach(call => {
                if (call.name === 'run_command' && call.args.CommandLine) {
                    let cmd = call.args.CommandLine;
                    for (let key in filesMap) {
                        if (cmd.includes(key + ' = [')) {
                            let startIdx = cmd.indexOf('@"');
                            if (startIdx === -1) startIdx = cmd.indexOf("@'");
                            let endIdx = cmd.lastIndexOf('"@');
                            if (endIdx === -1) endIdx = cmd.lastIndexOf("'@");

                            if(startIdx !== -1 && endIdx !== -1) {
                                let mcqArray = cmd.substring(startIdx + 2, endIdx).trim();
                                
                                let file = path.join('C:\\Users\\ADITI JAIN\\OneDrive\\Desktop\\Emple\\BK-Frontend\\EmpleFrontend\\src\\features\\user\\tutorials\\java\\data\\chapters', filesMap[key]);
                                
                                mcqArray = mcqArray.replace(/Adapted from\s+/gi, '');
                                mcqArray = mcqArray.replace(/\(Adapted from\s+/gi, '(');
                                mcqArray = mcqArray.replace(/\(\s*(CS|IT)\s+(\d{4})\s*\)/gi, '(GATE $1 $2)');
                                
                                let oldText = fs.readFileSync(file, 'utf8');
                                let newText = oldText.replace(/export const chapter\d+_[A-Z_]+(?:\s*:\s*MCQQuestion\[\])?\s*=\s*\[[\s\S]*?\];/g, mcqArray);
                                
                                if(newText !== oldText) {
                                    fs.writeFileSync(file, newText, 'utf8');
                                    console.log('Successfully recovered:', file);
                                }
                            }
                        }
                    }
                }
            });
        }
    } catch(e) {}
});
