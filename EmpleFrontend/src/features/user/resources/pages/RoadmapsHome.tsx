'use client';

import React, { useState, useEffect } from 'react';
import RoadmapsListing from '../Roadmaps/Components/RoadmapsListing';
import RoadmapDetail from '../Roadmaps/Components/RoadmapDetail';

export default function RoadmapsHome() {
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string | null>(null);

  // Check URL query parameters (e.g., ?id=ai-ml) on load.
  // This allows shared links to open directly to the correct detailed roadmap.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
      setSelectedRoadmapId(id);
    }
  }, []);

  // Back button resets the selected ID and removes "?id=..." from the browser URL.
  const handleBack = () => {
    setSelectedRoadmapId(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('id');
    window.history.pushState({}, '', url.pathname);
  };

  // Selecting a card opens details and sets "?id=..." in the browser URL for easy copy-sharing.
  const handleSelect = (id: string) => {
    setSelectedRoadmapId(id);
    const url = new URL(window.location.href);
    url.searchParams.set('id', id);
    window.history.pushState({}, '', url.toString());
  };

  return (
    <div className="p-6 max-w-[1440px] mx-auto w-full">
      {selectedRoadmapId ? (
        <RoadmapDetail roadmapId={selectedRoadmapId} onBack={handleBack} />
      ) : (
        <RoadmapsListing onView={handleSelect} />
      )}
    </div>
  );
}