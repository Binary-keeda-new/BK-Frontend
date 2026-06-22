"use client";
import DownloadProtection from "@/shared/components/access/DownloadProtection";

type Subject = { name: string; shortName: string; file: string };

const subjects: Subject[] = [
  { name: "Compiler Design", shortName: "CD", file: "/gate-notes/CD.pdf" },
  { name: "Computer Networks", shortName: "CN", file: "/gate-notes/CN.pdf" },
  { name: "Computer Organisation & Architecture", shortName: "COA", file: "/gate-notes/COA.pdf" },
  { name: "Combinatorics", shortName: "COMB", file: "/gate-notes/Combinatorics.pdf" },
  { name: "Design & Analysis of Algorithms", shortName: "DAA", file: "/gate-notes/DAA.pdf" },
  { name: "Digital Logic Design", shortName: "DLD", file: "/gate-notes/DLD.pdf" },
  { name: "Data Structures", shortName: "DS", file: "/gate-notes/DS.pdf" },
  { name: "Engineering Mathematics", shortName: "MATH", file: "/gate-notes/Maths.pdf" },
  { name: "Graph Theory", shortName: "GT", file: "/gate-notes/GraphTheory.pdf" },
  { name: "Operating Systems", shortName: "OS", file: "/gate-notes/OS.pdf" },
  { name: "Propositional Logic", shortName: "PL", file: "/gate-notes/PropLogic.pdf" },
  { name: "Set Theory", shortName: "ST", file: "/gate-notes/SetTheory.pdf" },
  { name: "Theory of Computation", shortName: "TOC", file: "/gate-notes/TOC.pdf" },
];

const accentColors: Record<string, string> = {
  CD:   "#e63946",
  CN:   "#1BA0D7",
  COA:  "#f97316",
  COMB: "#8b5cf6",
  DAA:  "#7c3aed",
  DLD:  "#10b981",
  DS:   "#ec4899",
  MATH: "#16a34a",
  GT:   "#059669",
  OS:   "#d97706",
  PL:   "#0891b2",
  ST:   "#0284c7",
  TOC:  "#6366f1",
};

export default function GateNotesHome() {
  const downloadPdf = (url: string, name: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.pdf`;
    a.click();
  };

  return (
    <div className="min-h-screen px-8 py-10 bg-gray-950">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-white tracking-tight">GATE Notes</h1>
          <p className="text-gray-500 text-sm mt-1">Handwritten preparation notes — one PDF per subject</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {subjects.map((subject) => {
            const accent = accentColors[subject.shortName] ?? "#6b7280";
            return (
              <div
                key={subject.shortName}
                className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col gap-3 hover:border-gray-600 transition-colors duration-200"
              >
                {/* Top row */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-mono font-semibold px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: `${accent}18`,
                      color: accent,
                    }}
                  >
                    {subject.shortName}
                  </span>
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>

                {/* Name */}
                <p className="text-white text-sm font-medium leading-snug">
                  {subject.name}
                </p>

                {/* Download button */}
                <DownloadProtection onDownloadAction={() => downloadPdf(subject.file, subject.name)}>
                  <button
                    className="mt-auto flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors group"
                  >
                    <span
                      className="w-6 h-6 rounded-md flex items-center justify-center transition-colors"
                      style={{ backgroundColor: `${accent}20` }}
                    >
                      <svg className="w-3.5 h-3.5" style={{ color: accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </span>
                    Download PDF
                  </button>
                </DownloadProtection>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}