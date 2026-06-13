"use client";

type Subject = {
  name: string;
  shortName: string;
  fileCount: number;
};

const subjects: Subject[] = [
  { name: "Compiler Design", shortName: "CD", fileCount: 3 },
  { name: "Computer Networks", shortName: "CN", fileCount: 6 },
  { name: "Computer Organisation & Architecture", shortName: "COA", fileCount: 1 },
  { name: "Combinatorics", shortName: "COMB", fileCount: 1 },
  { name: "Design & Analysis of Algorithms", shortName: "DAA", fileCount: 5 },
  { name: "Digital Logic Design", shortName: "DLD", fileCount: 5 },
  { name: "Data Structures", shortName: "DS", fileCount: 7 },
  { name: "Engineering Mathematics", shortName: "MATH", fileCount: 1 },
  { name: "Graph Theory", shortName: "GT", fileCount: 2 },
  { name: "Operating Systems", shortName: "OS", fileCount: 5 },
  { name: "Propositional Logic", shortName: "PL", fileCount: 1 },
  { name: "Set Theory", shortName: "ST", fileCount: 1 },
  { name: "Theory of Computation", shortName: "TOC", fileCount: 5 },
];

const subjectColors: Record<string, string> = {
  CD: "from-[#e63946] to-[#1d3557]",
  CN: "from-[#1BA0D7] to-[#004B87]",
  COA: "from-[#FF6F00] to-[#FF8F00]",
  COMB: "from-[#7c3aed] to-[#4c1d95]",
  DAA: "from-[#7c3aed] to-[#4c1d95]",
  DLD: "from-[#059669] to-[#064e3b]",
  DS: "from-[#db2777] to-[#831843]",
  MATH: "from-[#16a34a] to-[#14532d]",
  GT: "from-[#16a34a] to-[#14532d]",
  OS: "from-[#d97706] to-[#78350f]",
  PL: "from-[#0891b2] to-[#164e63]",
  ST: "from-[#0891b2] to-[#164e63]",
  TOC: "from-[#0891b2] to-[#164e63]",
};

export default function GateNotesHome() {
  return (
    <div className="min-h-screen p-8 bg-gray-950">
      <h1 className="text-3xl font-bold text-center mb-1 text-white">
        GATE Notes
      </h1>
      <p className="text-center text-gray-500 text-sm mb-10">
        Handwritten GATE preparation notes — subject wise
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {subjects.map((subject) => {
          const color = subjectColors[subject.shortName] ?? "from-gray-700 to-gray-900";
          return (
            <div
              key={subject.shortName}
              className="rounded-xl border border-gray-700 overflow-hidden shadow-lg shadow-black/40 hover:border-gray-500 hover:scale-105 transition-all duration-200"
            >
              {/* Header */}
              <div className={`bg-gradient-to-br ${color} p-5`}>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-xs font-mono bg-white/10 px-2 py-0.5 rounded">
                    {subject.shortName}
                  </span>
                  <span className="text-white/60 text-xs">
                    {subject.fileCount} notes
                  </span>
                </div>
                <h2 className="text-white font-bold text-sm mt-2">
                  {subject.name}
                </h2>
              </div>

              {/* Coming Soon / PDF buttons */}
              <div className="bg-gray-900 p-4">
                <p className="text-gray-500 text-xs text-center">
                  📄 PDFs uploading soon...
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}