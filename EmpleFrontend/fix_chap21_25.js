const fs = require('fs');

let content = fs.readFileSync('C:\\\\Users\\\\ADITI JAIN\\\\.gemini\\\\antigravity\\\\brain\\\\eeac914f-7c35-44aa-842c-72b86b8900f5\\\\.system_generated\\\\logs\\\\transcript_full.jsonl', 'utf8');
let lines = content.split(/\r?\n/);
let chapterMaps = {};

lines.forEach(line => {
    if(!line.trim()) return;
    try {
        let step = JSON.parse(line);
        if (step.tool_calls) {
            step.tool_calls.forEach(call => {
                if (call.args.ReplacementContent && call.args.TargetFile) {
                    let file = call.args.TargetFile;
                    let chapMatch = file.match(/chapter(21|22|23|24|25)_/);
                    if (chapMatch) {
                        let chapNum = chapMatch[1];
                        chapterMaps[chapNum] = {
                            file: file,
                            content: call.args.ReplacementContent,
                            name: chapMatch[0].replace(/_$/, '')
                        };
                    }
                }
            });
        }
    } catch(e) {}
});

for(let chap in chapterMaps) {
    let data = chapterMaps[chap];
    let mcqArray = data.content;
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

    let filename = data.file.split(/[\\/]/).pop();
    let name = filename.replace('chapter' + chap + '_', '').replace('.ts', '');

    const tsContent = `// Chapter ${chap} - ${name}

export const chapter${chap}_CONTENT = {
    title: "${name.replace(/_/g, ' ').toUpperCase()}",
    description: "Learn about ${name.replace(/_/g, ' ')}",
    sections: [
        { title: "Introduction", content: "Content coming soon..." }
    ]
};

${mcqArray}

export const chapter${chap}_DEBUG = undefined;
export const chapter${chap}_DRAG_DROP = undefined;
export const chapter${chap}_COMPLETE_EXERCISES = [];
`;

    fs.writeFileSync(data.file, tsContent, 'utf8');
    console.log('Successfully recovered', filename);
}
