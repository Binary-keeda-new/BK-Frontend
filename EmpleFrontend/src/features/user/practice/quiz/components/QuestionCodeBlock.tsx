import React from "react";

interface QuestionCodeBlockProps {
  code: string | null | undefined;
}

export const QuestionCodeBlock: React.FC<QuestionCodeBlockProps> = ({ code }) => {
  if (!code) {
    return null;
  }

  return (
    <div className="w-full max-w-3xl mx-auto my-4 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
      <div className="overflow-x-auto p-4">
        <pre className="m-0 text-sm font-mono text-gray-800 dark:text-gray-200 text-left" style={{ whiteSpace: "pre" }}>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};
