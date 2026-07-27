"use client";

import React from "react";

interface CreateRoadmapButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  cost?: number;
}

const CreateRoadmapButton: React.FC<CreateRoadmapButtonProps> = ({
  onClick,
  disabled = false,
  isLoading = false,
  cost,
}) => {
  return (
    <>
      <style>{`@keyframes crb-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <button
        onClick={onClick}
        disabled={disabled || isLoading}
        className="flex items-center gap-[6px] bg-[#ff5c35] text-white border-none rounded-[7px]
          px-[13px] py-[7px] text-[12px] font-medium cursor-pointer
          hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
      >
        {cost !== undefined && (
          <span className="flex items-center bg-white/20 px-2 py-0.5 rounded mr-1">
            🪙 {cost} Coins
          </span>
        )}
        {isLoading ? (
          <>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ animation: 'crb-spin 1s linear infinite' }}
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            Generating...
          </>
        ) : (
          <>
            <i className="ti ti-sparkles" aria-hidden="true" />
            Create Roadmap
          </>
        )}
      </button>
    </>
  );
};

export default CreateRoadmapButton;