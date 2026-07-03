const fs = require('fs');
const paths = [
    'C:\\Users\\ADITI JAIN\\.gemini\\antigravity\\brain\\9eca5017-3449-4a78-be69-1e185a3635bc\\.system_generated\\logs\\transcript_full.jsonl',
    'C:\\Users\\ADITI JAIN\\.gemini\\antigravity\\brain\\fedd9423-1396-4e0b-bcb4-c60e28e64108\\.system_generated\\logs\\transcript_full.jsonl',
    'C:\\Users\\ADITI JAIN\\.gemini\\antigravity\\brain\\6a69c6d4-a822-4974-9ec2-359a5cc9131a\\.system_generated\\logs\\transcript_full.jsonl',
    'C:\\Users\\ADITI JAIN\\.gemini\\antigravity\\brain\\f9fe1045-d659-4c4d-811d-b0bec42edd3d\\.system_generated\\logs\\transcript_full.jsonl',
    'C:\\Users\\ADITI JAIN\\.gemini\\antigravity\\brain\\eeac914f-7c35-44aa-842c-72b86b8900f5\\.system_generated\\logs\\transcript_full.jsonl'
];

let filesFixed = 0;

paths.forEach(p => {
    try {
        let content = fs.readFileSync(p, 'utf8');
        let lines = content.split(/\r?\n/);
        
        let lastToolCalls = [];
        
        lines.forEach(line => {
            if(!line.trim()) return;
            try {
                let step = JSON.parse(line);
                if(step.tool_calls) {
                    lastToolCalls = step.tool_calls;
                }
                
                if (step.tool_calls) {
                    step.tool_calls.forEach(call => {
                        if(call.name === 'replace_file_content' || call.name === 'multi_replace_file_content') {
                            let file = call.args.TargetFile;
                            if(file && fs.existsSync(file)) {
                                let restoredContent = call.args.ReplacementContent;
                                if (call.name === 'multi_replace_file_content') {
                                    restoredContent = call.args.ReplacementChunks[0].ReplacementContent;
                                }
                                
                                if (restoredContent && restoredContent.includes('export const chapter')) {
                                    // Remove 'Adapted from '
                                    restoredContent = restoredContent.replace(/Adapted from\s+/gi, '');
                                    restoredContent = restoredContent.replace(/\(Adapted from\s+/gi, '(');
                                    
                                    // Make sure GATE is present
                                    restoredContent = restoredContent.replace(/\(\s*(CS|IT)\s+(\d{4})\s*\)/gi, '(GATE $1 $2)');
                                    
                                    let oldText = fs.readFileSync(file, 'utf8');
                                    let newText = oldText.replace(/export const chapter\d+_[A-Z_]+(?:\s*:\s*MCQQuestion\[\])?\s*=\s*\[[\s\S]*?\];/g, restoredContent);
                                    
                                    if (newText !== oldText) {
                                        fs.writeFileSync(file, newText, 'utf8');
                                        console.log("Restored:", file);
                                        filesFixed++;
                                    }
                                }
                            }
                        }
                    });
                }
            } catch(e) { }
        });
    } catch(e) { }
});
console.log("Fixed " + filesFixed + " files.");
