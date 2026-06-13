import PDFMerger from 'pdf-merger-js';
import path from 'path';

const base = './public/gate-notes/';

const subjects = [
  { name: 'CD', files: ['CD 1.pdf', 'CD 2.pdf', 'CD 3.pdf'] },
  { name: 'CN', files: ['CN 1.pdf', 'CN 2.pdf', 'CN 3.pdf', 'CN 4.pdf', 'CN 5.pdf', 'CN 6.pdf'] },
  { name: 'COA', files: ['COA 1.pdf', 'COA 2.pdf', 'COA 3.pdf'] },
  { name: 'Combinatorics', files: ['Combinactories.pdf'] },
  { name: 'DAA', files: ['DAA 1.pdf', 'DAA 2.pdf', 'DAA 3.pdf', 'DAA 4.pdf', 'DAA 5.pdf'] },
  { name: 'DLD', files: ['DLD 1.pdf', 'DLD 2.pdf', 'DLD 3.pdf', 'DLD 4.pdf', 'DLD 5.pdf'] },
  { name: 'DS', files: ['DS-1.pdf', 'DS-2.pdf', 'DS-3.pdf', 'DS-4.pdf', 'DS-5.pdf', 'DS-6.pdf', 'DS-7.pdf'] },
  { name: 'Maths', files: ['Engg. Maths.pdf'] },
  { name: 'GraphTheory', files: ['Graph Theory 1.pdf', 'Graph Theory 2.pdf'] },
  { name: 'OS', files: ['OS 1.pdf', 'OS 2.pdf', 'OS 3.pdf', 'OS 4.pdf', 'OS 5.pdf'] },
  { name: 'PropLogic', files: ['Prepositional logic.pdf'] },
  { name: 'SetTheory', files: ['Set Theory.pdf'] },
  { name: 'TOC', files: ['TOC 1.pdf', 'TOC 2.pdf', 'TOC 3.pdf', 'TOC 4.pdf', 'TOC 5.pdf'] },
];

for (const subject of subjects) {
  const merger = new PDFMerger();
  for (const file of subject.files) {
    await merger.add(path.join(base, file));
  }
  await merger.save(path.join(base, `${subject.name}.pdf`));
  console.log(`✅ Merged: ${subject.name}.pdf`);
}

