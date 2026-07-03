const fs = require('fs');
const path = require('path');

const targetFile = 'src/features/user/tutorials/c/data/cTutorial.ts';
let content = fs.readFileSync(targetFile, 'utf8');

// Paths from the subagents
const paths = {
  basics: 'C:\\Users\\ADITI JAIN\\.gemini\\antigravity\\brain\\dd764894-66a0-4ef7-a916-b39dcd58002b\\scratch\\mcq_basics.json',
  variables: 'C:\\Users\\ADITI JAIN\\.gemini\\antigravity\\brain\\dd764894-66a0-4ef7-a916-b39dcd58002b\\scratch\\mcq_variables.json',
  io: 'C:\\Users\\ADITI JAIN\\.gemini\\antigravity\\brain\\dd764894-66a0-4ef7-a916-b39dcd58002b\\scratch\\mcq_io.json',
  operators: 'C:\\Users\\ADITI JAIN\\.gemini\\antigravity\\brain\\dd764894-66a0-4ef7-a916-b39dcd58002b\\scratch\\mcq_operators.json',
  'control-flow': 'C:\\Users\\ADITI JAIN\\.gemini\\antigravity\\brain\\dd764894-66a0-4ef7-a916-b39dcd58002b\\scratch\\mcq_control-flow.json',
  loops: 'C:\\Users\\ADITI JAIN\\.gemini\\antigravity\\brain\\5d1134ab-7891-4292-bb78-010b0ef54de5\\scratch\\mcq_loops.json',
  functions: 'C:\\Users\\ADITI JAIN\\.gemini\\antigravity\\brain\\5d1134ab-7891-4292-bb78-010b0ef54de5\\scratch\\mcq_functions.json',
  arrays: 'C:\\Users\\ADITI JAIN\\.gemini\\antigravity\\brain\\5d1134ab-7891-4292-bb78-010b0ef54de5\\scratch\\mcq_arrays.json',
  strings: 'C:\\Users\\ADITI JAIN\\.gemini\\antigravity\\brain\\5d1134ab-7891-4292-bb78-010b0ef54de5\\scratch\\mcq_strings.json',
  pointers: 'C:\\Users\\ADITI JAIN\\.gemini\\antigravity\\brain\\3b9cf9be-e40c-439f-9f39-58ce88f0f14d\\scratch\\mcq_pointers.json',
  structures: 'C:\\Users\\ADITI JAIN\\.gemini\\antigravity\\brain\\3b9cf9be-e40c-439f-9f39-58ce88f0f14d\\scratch\\mcq_structures.json',
  'file-handling': 'C:\\Users\\ADITI JAIN\\.gemini\\antigravity\\brain\\3b9cf9be-e40c-439f-9f39-58ce88f0f14d\\scratch\\mcq_file-handling.json',
  memory: 'C:\\Users\\ADITI JAIN\\.gemini\\antigravity\\brain\\3b9cf9be-e40c-439f-9f39-58ce88f0f14d\\scratch\\mcq_memory.json'
};

// We will reconstruct the entire MCQ object in cTutorial.ts
let newMcqString = "export const MCQ: Record<string, MCQQuestion[]> = {\\n";

for (const [key, filepath] of Object.entries(paths)) {
    if (fs.existsSync(filepath)) {
        let jsonStr = fs.readFileSync(filepath, 'utf8');
        try {
            // Validate it parses correctly
            let arr = JSON.parse(jsonStr);
            // Re-stringify cleanly
            newMcqString += `  "${key}": ` + JSON.stringify(arr, null, 4).replace(/\\n/g, '\\n').split('\\n').map((l, i) => i === 0 ? l : '  ' + l).join('\\n') + ",\\n";
        } catch(e) {
            console.error("Failed to parse", filepath, e.message);
        }
    } else {
        console.error("Missing file", filepath);
    }
}
newMcqString += "};\n";

// Now replace the old export const MCQ in content
let mcqStart = content.indexOf('export const MCQ: Record<string, MCQQuestion[]> = {');
let mcqEnd = content.indexOf('};', mcqStart) + 3; // +3 to cover `};\n`

if (mcqStart !== -1 && mcqEnd !== -1) {
    content = content.substring(0, mcqStart) + newMcqString + content.substring(mcqEnd);
    fs.writeFileSync(targetFile, content);
    console.log("Successfully injected all GATE questions into cTutorial.ts!");
} else {
    console.error("Could not find MCQ object in cTutorial.ts");
}
