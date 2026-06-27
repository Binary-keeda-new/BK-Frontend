'use client';

import React, { useState, useEffect } from 'react';
import RoadmapsListing from '../Roadmaps/Components/RoadmapsListing';
import RoadmapDetail from '../Roadmaps/Components/RoadmapDetail';
import PersonalizedRoadmapDetail from '../Roadmaps/Components/PersonalizedRoadmapDetail';

const PERSONALIZED_PREFIX = 'personalized-';

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

  // ── NEW: Route to the correct detail component based on the ID prefix ──
  const renderDetail = () => {
    if (!selectedRoadmapId) return null;

    if (selectedRoadmapId.startsWith(PERSONALIZED_PREFIX)) {
      // Strip the "personalized-" prefix to get the raw Mongo _id
      const rawId = selectedRoadmapId.slice(PERSONALIZED_PREFIX.length);
      return <PersonalizedRoadmapDetail roadmapId={rawId} onBack={handleBack} />;
    }

    return <RoadmapDetail roadmapId={selectedRoadmapId} onBack={handleBack} />;
  };

  return (
    <div className="p-6 max-w-[1440px] mx-auto w-full">
      {selectedRoadmapId ? (
        renderDetail()
      ) : (
        <RoadmapsListing onView={handleSelect} />
      )}
    </div>
  );
}