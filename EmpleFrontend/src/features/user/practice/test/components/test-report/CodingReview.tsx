'use client';

import { useState, useMemo } from 'react';
import { TerminalSquare } from 'lucide-react';
import { UserTestReport } from '../../types/test.types';
import CodingReviewFilters, { CodingFilterType } from './CodingReviewFilters';
import CodingReviewCard from './CodingReviewCard';
import ReportSection from './shared/ReportSection';
import EmptyState from './shared/EmptyState';

type Props = {
  report: UserTestReport;
};

export default function CodingReview({ report }: Props) {
  const [filter, setFilter] = useState<CodingFilterType>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { codingReview, summary } = report;

  // Empty state handling
  if (summary.totalCodingProblems === 0) {
    return null; // Entirely hidden if there are no coding problems
  }

  if (!codingReview || codingReview.length === 0) {
    return (
      <ReportSection title="Coding Detailed Review" icon={TerminalSquare}>
        <EmptyState message="Detailed coding submissions are unavailable." />
      </ReportSection>
    );
  }

  // Calculate counts for filters
  const counts = useMemo(() => {
    let accepted = 0;
    let rejected = 0;

    codingReview.forEach((item) => {
      if (item.accepted) {
        accepted++;
      } else {
        rejected++;
      }
    });

    return {
      all: codingReview.length,
      accepted,
      rejected,
    };
  }, [codingReview]);

  // Apply Filter
  const filteredReview = useMemo(() => {
    return codingReview.filter((item) => {
      if (filter === 'all') return true;
      if (filter === 'accepted') return item.accepted;
      if (filter === 'rejected') return !item.accepted;
      return true;
    });
  }, [codingReview, filter]);

  const handleToggle = (problemId: string) => {
    setExpandedId((prev) => (prev === problemId ? null : problemId));
  };

  return (
    <ReportSection title="Coding Detailed Review" icon={TerminalSquare}>
      <CodingReviewFilters 
        currentFilter={filter} 
        onFilterChange={(f) => {
          setFilter(f);
          setExpandedId(null); // Close accordion on filter change
        }} 
        counts={counts} 
      />

      {filteredReview.length > 0 ? (
        <div className="space-y-4">
          {filteredReview.map((item, index) => {
            // Find original index to maintain correct numbering even when filtered
            const originalIndex = codingReview.findIndex(q => q.problemId === item.problemId);
            const displayIndex = originalIndex !== -1 ? originalIndex : index;
            
            // Using problemId or falling back to index for keying securely
            const key = item.problemId ? item.problemId.toString() : index.toString();
            
            return (
              <CodingReviewCard 
                key={key}
                item={item}
                index={displayIndex}
                isExpanded={expandedId === key}
                onToggle={() => handleToggle(key)}
              />
            );
          })}
        </div>
      ) : (
        <EmptyState message={`No submissions match the "${filter}" filter.`} />
      )}
    </ReportSection>
  );
}
