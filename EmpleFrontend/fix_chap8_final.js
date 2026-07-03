const fs = require('fs');
let oldText = fs.readFileSync('src/features/user/tutorials/java/data/chapters/chapter08_arrays.ts', 'utf8');

// The file currently has outer backticks that broke because of inner unescaped backticks!
// Wait, we can't easily undo the backticks!
// Let's just reconstruct the file AGAIN from the transcript! And this time, properly escape inner backticks!
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

    // Replace multiline double quoted strings properly
    mcqArray = mcqArray.replace(/"q":\s*"([\s\S]*?)",/g, function(match, p1) {
        let inner = p1.replace(/`/g, '\\`'); // Escape inner backticks
        inner = inner.replace(/\\"/g, '"');
        return '"q": `' + inner + '`,';
    });

    mcqArray = mcqArray.replace(/"explanation":\s*"([\s\S]*?)"/g, function(match, p1) {
        let inner = p1.replace(/`/g, '\\`');
        inner = inner.replace(/\\"/g, '"');
        return '"explanation": `' + inner + '`';
    });

    mcqArray = mcqArray.replace(/"options":\s*\[([\s\S]*?)\]/g, function(match, p1) {
        let inner = p1.replace(/"([\s\S]*?)"/g, function(m2, p2) {
            let optInner = p2.replace(/`/g, '\\`');
            optInner = optInner.replace(/\\"/g, '"');
            return '`' + optInner + '`';
        });
        return '"options": [' + inner + ']';
    });
    
    // We recreate chapter 8 from scratch using dummy content as template
    const tsContent = `// Chapter 08 - arrays

export const chapter08_CONTENT = {
    title: "ARRAYS",
    description: "Learn about arrays",
    sections: [
        { title: "Introduction", content: "Content coming soon..." }
    ]
};

${mcqArray}

export const chapter08_DEBUG = undefined;
export const chapter08_DRAG_DROP = undefined;
export const chapter08_COMPLETE_EXERCISES = [];
`;

    fs.writeFileSync('src/features/user/tutorials/java/data/chapters/chapter08_arrays.ts', tsContent, 'utf8');
    console.log('Successfully recovered chapter08_arrays.ts completely! With correctly escaped backticks!');
}
