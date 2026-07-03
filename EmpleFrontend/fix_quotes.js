const fs = require('fs');
const files = [
    'src/features/user/tutorials/java/data/chapters/chapter16_jvm_memory.ts',
    'src/features/user/tutorials/java/data/chapters/chapter17_object_wrappers.ts',
    'src/features/user/tutorials/java/data/chapters/chapter18_generics.ts',
    'src/features/user/tutorials/java/data/chapters/chapter19_comparable_comparator.ts',
    'src/features/user/tutorials/java/data/chapters/chapter20_packages_enums.ts'
];
files.forEach(f => {
    let oldText = fs.readFileSync(f, 'utf8');
    let newText = oldText.replace(/\`\"/g, '\"');
    // Also remove backticks before single quotes if they exist
    newText = newText.replace(/\`\'/g, '\'');
    if (oldText !== newText) {
        fs.writeFileSync(f, newText, 'utf8');
        console.log('Fixed quotes in', f);
    }
});
