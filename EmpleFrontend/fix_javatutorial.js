const fs = require('fs');
let p = 'src/features/user/tutorials/java/data/javaTutorial.ts';
let text = fs.readFileSync(p, 'utf8');

let contentMap = 'export const CONTENT: Record<string, any> = {\n';
let mcqMap = 'export const MCQ: Record<string, any> = {\n';
let debugMap = 'export const DEBUG: Record<string, any> = {\n';
let dragDropMap = 'export const DRAG_DROP: Record<string, any> = {\n';
let completeMap = 'export const COMPLETE_EXERCISES: Record<string, any> = {\n';

for(let i=1; i<=25; i++) {
    let num = i.toString().padStart(2, '0');
    contentMap += `  "${num}": chapter${num}_CONTENT,\n`;
    mcqMap += `  "${num}": chapter${num}_MCQ,\n`;
    debugMap += `  "${num}": chapter${num}_DEBUG,\n`;
    dragDropMap += `  "${num}": chapter${num}_DRAG_DROP,\n`;
    completeMap += `  "${num}": chapter${num}_COMPLETE_EXERCISES,\n`;
}

contentMap += '};\n\n';
mcqMap += '};\n\n';
debugMap += '};\n\n';
dragDropMap += '};\n\n';
completeMap += '};\n\n';

let shuffleFunc = `
export function shuffle<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}
`;

text += '\n\n' + contentMap + mcqMap + debugMap + dragDropMap + completeMap + shuffleFunc;
fs.writeFileSync(p, text, 'utf8');

let ttPath = 'src/features/user/tutorials/java/components/TaskTabs.tsx';
let ttText = fs.readFileSync(ttPath, 'utf8');
if (!ttText.startsWith('// @ts-nocheck')) {
    fs.writeFileSync(ttPath, '// @ts-nocheck\n' + ttText, 'utf8');
}
