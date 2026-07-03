const fs = require('fs');
const path = require('path');

const javaTutorial = require('./scratch/javaTutorial.js');

const outDir = path.join(__dirname, 'src', 'features', 'user', 'tutorials', 'java', 'data', 'chapters');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

// Map the first 15 old chapters to the new naming convention
const chapterNames = [
    { id: 'basics', num: '01', name: 'basics' },
    { id: 'variables', num: '02', name: 'variables' },
    { id: 'io', num: '03', name: 'io' },
    { id: 'operators', num: '04', name: 'operators' },
    { id: 'control-flow', num: '05', name: 'control_flow' },
    { id: 'loops', num: '06', name: 'loops' },
    { id: 'functions', num: '07', name: 'methods' },
    { id: 'arrays', num: '08', name: 'arrays' },
    { id: 'strings', num: '09', name: 'strings' },
    { id: 'pointers', num: '10', name: 'classes_objects' },
    { id: 'structures', num: '11', name: 'oop_principles' },
    { id: 'file-handling', num: '12', name: 'exception_handling' },
    { id: 'memory', num: '13', name: 'collections' },
    { id: 'multithreading', num: '14', name: 'multithreading' },
    { id: 'java8', num: '15', name: 'streams_lambdas' }
];

for (const chap of chapterNames) {
    const filename = `chapter${chap.num}_${chap.name}.ts`;
    const filepath = path.join(outDir, filename);

    let tsContent = `// Chapter ${chap.num} - ${chap.name}\n\n`;

    if (javaTutorial.CONTENT && javaTutorial.CONTENT[chap.id]) {
        tsContent += `export const chapter${chap.num}_CONTENT = ${JSON.stringify(javaTutorial.CONTENT[chap.id], null, 2)};\n\n`;
    }
    if (javaTutorial.MCQ && javaTutorial.MCQ[chap.id]) {
        tsContent += `export const chapter${chap.num}_MCQ = ${JSON.stringify(javaTutorial.MCQ[chap.id], null, 2)};\n\n`;
    }
    if (javaTutorial.DEBUG && javaTutorial.DEBUG[chap.id]) {
        tsContent += `export const chapter${chap.num}_DEBUG = ${JSON.stringify(javaTutorial.DEBUG[chap.id], null, 2)};\n\n`;
    }
    if (javaTutorial.DRAG_DROP && javaTutorial.DRAG_DROP[chap.id]) {
        tsContent += `export const chapter${chap.num}_DRAG_DROP = ${JSON.stringify(javaTutorial.DRAG_DROP[chap.id], null, 2)};\n\n`;
    }
    if (javaTutorial.COMPLETE_EXERCISES && javaTutorial.COMPLETE_EXERCISES[chap.id]) {
        tsContent += `export const chapter${chap.num}_COMPLETE_EXERCISES = ${JSON.stringify(javaTutorial.COMPLETE_EXERCISES[chap.id], null, 2)};\n\n`;
    }

    fs.writeFileSync(filepath, tsContent);
    console.log(`Created ${filename}`);
}

console.log("Splitting existing chapters completed.");
