const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'src', 'features', 'user', 'tutorials', 'java', 'data', 'chapters');

const newChapters = [
    { id: 'jvm-memory', num: '16', name: 'jvm_memory' },
    { id: 'object-wrappers', num: '17', name: 'object_wrappers' },
    { id: 'generics', num: '18', name: 'generics' },
    { id: 'comparable-comparator', num: '19', name: 'comparable_comparator' },
    { id: 'packages-enums', num: '20', name: 'packages_enums' },
    { id: 'nested-classes', num: '21', name: 'nested_classes' },
    { id: 'serialization-reflection', num: '22', name: 'serialization_reflection' },
    { id: 'java-keywords', num: '23', name: 'java_keywords' },
    { id: 'executor-framework', num: '24', name: 'executor_framework' },
    { id: 'modern-java', num: '25', name: 'modern_java' }
];

for (const chap of newChapters) {
    const filename = `chapter${chap.num}_${chap.name}.ts`;
    const filepath = path.join(outDir, filename);

    const tsContent = `// Chapter ${chap.num} - ${chap.name}

export const chapter${chap.num}_CONTENT = {
    title: "${chap.name.replace(/_/g, ' ').toUpperCase()}",
    description: "Learn about ${chap.name.replace(/_/g, ' ')}",
    sections: [
        { title: "Introduction", content: "Content coming soon..." }
    ]
};

export const chapter${chap.num}_MCQ = [
    {
        q: "Sample GATE Question for ${chap.name}? (GATE CS 2020)",
        options: ["Option A", "Option B", "Option C", "Option D"],
        ans: 0,
        explanation: "Explanation coming soon."
    }
];

export const chapter${chap.num}_DEBUG = undefined;
export const chapter${chap.num}_DRAG_DROP = undefined;
export const chapter${chap.num}_COMPLETE_EXERCISES = [];
`;

    fs.writeFileSync(filepath, tsContent);
    console.log(`Created dummy ${filename}`);
}

console.log("Dummy chapters created.");
