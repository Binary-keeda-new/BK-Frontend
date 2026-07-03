const fs = require('fs');
let oldText = fs.readFileSync('src/features/user/tutorials/java/data/chapters/chapter08_arrays.ts', 'utf8');

let newText = oldText;
newText = newText.replace(/"q":\s*"([\s\S]*?)",/g, function(match, p1) {
    let inner = p1.replace(/\\"/g, '"');
    return '"q": `' + inner + '`,';
});

newText = newText.replace(/"explanation":\s*"([\s\S]*?)"/g, function(match, p1) {
    let inner = p1.replace(/\\"/g, '"');
    return '"explanation": `' + inner + '`';
});

newText = newText.replace(/"options":\s*\[([\s\S]*?)\]/g, function(match, p1) {
    let inner = p1.replace(/"([\s\S]*?)"/g, function(m2, p2) {
        let optInner = p2.replace(/\\"/g, '"');
        return '`' + optInner + '`';
    });
    return '"options": [' + inner + ']';
});

if (oldText !== newText) {
    fs.writeFileSync('src/features/user/tutorials/java/data/chapters/chapter08_arrays.ts', newText, 'utf8');
    console.log('Fixed Chapter 8 multiline strings!');
}
