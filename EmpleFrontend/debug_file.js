const fs = require('fs');
let content = fs.readFileSync('C:\\\\Users\\\\ADITI JAIN\\\\.gemini\\\\antigravity\\\\brain\\\\f9fe1045-d659-4c4d-811d-b0bec42edd3d\\\\.system_generated\\\\logs\\\\transcript_full.jsonl', 'utf8');
let lines = content.split(/\r?\n/);
lines.forEach(line => {
    if(!line.trim()) return;
    try {
        let step = JSON.parse(line);
        if (step.tool_calls) {
            step.tool_calls.forEach(call => {
                if (call.name === 'run_command' && call.args.CommandLine && call.args.CommandLine.includes('export const chapter')) {
                    let cmd = call.args.CommandLine;
                    let fileMatch = cmd.match(/\$file = ["']([^"']+)["']/);
                    console.log('File match:', fileMatch ? fileMatch[1] : null);
                }
            });
        }
    } catch(e) {}
});
