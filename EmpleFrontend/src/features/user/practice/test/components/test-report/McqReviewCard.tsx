import { useState } from 'react';
import { ChevronDown, CheckCircle2, XCircle, SkipForward, Target } from 'lucide-react';
import { UserTestReport } from '../../types/test.types';

type McqReviewItem = UserTestReport['mcqReview'][0];

type Props = {
  item: McqReviewItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
};

export default function McqReviewCard({ item, index, isExpanded, onToggle }: Props) {
  const isAttempted = item.selectedOptions && item.selectedOptions.length > 0;
  const isSkipped = !isAttempted;
  const isCorrect = item.isCorrect;
  const isIncorrect = isAttempted && !isCorrect;

  // Determine semantic colors/text for status
  let statusText = 'Skipped';
  let statusIcon = SkipForward;
  let statusColorClass = 'text-amber-500 bg-amber-500/10 border-amber-500/20';
  
  if (isCorrect) {
    statusText = 'Correct';
    statusIcon = CheckCircle2;
    statusColorClass = 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
  } else if (isIncorrect) {
    statusText = 'Incorrect';
    statusIcon = XCircle;
    statusColorClass = 'text-red-500 bg-red-500/10 border-red-500/20';
  }

  const StatusIcon = statusIcon;

  // Render Marks securely
  const marksColor = item.marks > 0 ? 'text-emerald-500' : (item.marks < 0 ? 'text-red-500' : 'text-[var(--muted2)]');

  const renderOptions = () => {
    return (
      <div className="mt-3 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-[var(--text)]">Your Answer{item.selectedOptions?.length > 1 ? 's' : ''}:</p>
          {isSkipped ? (
            <div className="mt-2 text-sm text-[var(--muted2)] italic">
              No option selected
            </div>
          ) : (
            <ul className="space-y-1">
              {item.selectedOptions.map((opt, i) => (
                <li key={i} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 text-sm text-[var(--text)]">
                  {opt || "Selected option unavailable"}
                </li>
              ))}
            </ul>
          )}
        </div>

        {item.correctOptions && item.correctOptions.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-semibold text-[var(--text)]">Correct Answer{item.correctOptions.length > 1 ? 's' : ''}:</p>
            <ul className="space-y-1">
              {item.correctOptions.map((opt, i) => (
                <li key={i} className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  {opt || "Option unavailable"}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`overflow-hidden rounded-xl transition-all duration-200 ${
      isExpanded 
        ? 'shadow-sm bg-[var(--surface)]' 
        : 'bg-[var(--surface)]'
    }`}>
      {/* Accordion Header */}
      <button 
        onClick={onToggle}
        aria-expanded={isExpanded}
        className="flex w-full items-start justify-between gap-4 p-5 text-left focus:outline-none focus:ring-2 focus:ring-[var(--orange)] focus:ring-inset"
      >
        <div className="flex flex-1 gap-4">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl font-black text-lg transition-colors ${
            isExpanded ? 'bg-[var(--orange)] text-white shadow-md' : 'bg-[var(--surface)] text-[var(--text)] '
          }`}>
            {index + 1}
          </div>
          
          <div className="flex-1 overflow-hidden pt-1">
            <div 
              className={`text-[var(--text)] ${isExpanded ? 'whitespace-normal font-bold text-lg' : 'truncate font-semibold text-base'}`}
              dangerouslySetInnerHTML={{ __html: item.question }}
            />
            
            {!isExpanded && (
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${statusColorClass}`}>
                  <StatusIcon className="h-3.5 w-3.5" />
                  {statusText}
                </span>
                <span className={`text-sm font-black ${marksColor}`}>
                  {item.marks > 0 ? '+' : ''}{item.marks} marks
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="shrink-0 pt-2">
          <ChevronDown className={`h-6 w-6 text-[var(--muted)] transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[var(--orange)]' : ''}`} />
        </div>
      </button>

      {/* Accordion Body */}
      <div 
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-[var(--border)]/50 bg-[var(--surface)]/50 p-6 pl-[5rem] backdrop-blur-sm">
            {/* Metadata Row */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold uppercase tracking-wider shadow-sm ${statusColorClass}`}>
                <StatusIcon className="h-4 w-4" />
                {statusText}
              </span>
              <span className={`rounded-lg  bg-[var(--surface)] px-3 py-1.5 text-sm font-black shadow-sm ${marksColor}`}>
                Marks Earned: {item.marks > 0 ? '+' : ''}{item.marks}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg  bg-[var(--surface)] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--muted2)] shadow-sm">
                <Target className="h-3.5 w-3.5" />
                {item.topic || 'General'}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg  bg-[var(--surface)] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--muted2)] shadow-sm">
                {item.difficulty || 'Medium'}
              </span>
            </div>

            {/* Selected Options */}
            {renderOptions()}
          </div>
        </div>
      </div>
    </div>
  );
}
