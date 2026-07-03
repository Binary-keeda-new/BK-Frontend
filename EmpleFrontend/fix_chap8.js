const fs = require('fs');
let content = fs.readFileSync('C:\\\\Users\\\\ADITI JAIN\\\\.gemini\\\\antigravity\\\\brain\\\\fedd9423-1396-4e0b-bcb4-c60e28e64108\\\\.system_generated\\\\logs\\\\transcript_full.jsonl', 'utf8');
let lines = content.split(/\r?\n/);
let mcqArray = '';
lines.forEach(line => {
    if(!line.trim()) return;
    try {
        let step = JSON.parse(line);
        if (step.tool_calls) {
            step.tool_calls.forEach(call => {
                if (call.args.ReplacementContent && call.args.ReplacementContent.includes('int[][] arr')) {
                    mcqArray = call.args.ReplacementContent;
                }
            });
        }
    } catch(e) {}
});

if(mcqArray) {
    mcqArray = mcqArray.replace(/Adapted from\s+/gi, '');
    mcqArray = mcqArray.replace(/\(Adapted from\s+/gi, '(');
    mcqArray = mcqArray.replace(/\(\s*(CS|IT)\s+(\d{4})\s*\)/gi, '(GATE $1 $2)');
    mcqArray = mcqArray.replace(/`"/g, '"').replace(/`'/g, "'");
    
    let oldText = fs.readFileSync('src/features/user/tutorials/java/data/chapters/chapter08_arrays.ts', 'utf8');
    
    let startIdx = oldText.indexOf('export const chapter08_MCQ');
    let endIdx = oldText.indexOf('export const chapter08_DEBUG');
    
    if(startIdx !== -1 && endIdx !== -1) {
        let newText = oldText.substring(0, startIdx) + mcqArray + '\n\n' + oldText.substring(endIdx);
        fs.writeFileSync('src/features/user/tutorials/java/data/chapters/chapter08_arrays.ts', newText, 'utf8');
        console.log('Successfully recovered chapter08_arrays.ts completely!');
    } else {
        console.log('Could not find start or end indices!');
    }
}
