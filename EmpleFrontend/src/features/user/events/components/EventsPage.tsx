'use client';

import { useEffect, useState, useMemo } from 'react';
import { Trophy, Stars, Rocket, Calendar, MapPin, Gift, ExternalLink, FlaskConical } from 'lucide-react';
import { apiRequest } from '@/shared/utils/api';
import { useRouter } from 'next/navigation';

type EventType = 'hackathon' | 'techfest' | 'our-hackathon' | 'research-conference';
type FilterTab = 'all' | EventType;

interface EventItem {
  _id: string;
  title: string;
  description: string;
  organiser: string;
  type: EventType;
  date: string;
  startDate?: string;
  endDate?: string;
  registrationOpen: boolean;
  registrationLink?: string;
  banner?: string;
  isActive: boolean;
  rewards?: string;
  createdAt?: string;
}

const TYPE_CONFIG: Record<EventType, { label: string; color: string; iconBg: string; Icon: React.ElementType }> = {
  hackathon: { label: 'Hackathon', color: 'text-[#f26522]', iconBg: 'bg-[#2a1a10]', Icon: Trophy },
  techfest: { label: 'Techfest', color: 'text-[#9575cd]', iconBg: 'bg-[#1a1030]', Icon: Stars },
  'our-hackathon': { label: 'Emple Events', color: 'text-[#2ecc71]', iconBg: 'bg-[#0d2018]', Icon: Rocket },
  'research-conference': { label: 'Research Conference', color: 'text-[#38bdf8]', iconBg: 'bg-[#0d1f2a]', Icon: FlaskConical },
};

const TABS: { label: string; value: FilterTab }[] = [
  { label: 'All', value: 'all' },
  { label: 'Hackathon', value: 'hackathon' },
  { label: 'Techfest', value: 'techfest' },
  { label: 'Emple Events', value: 'our-hackathon' },
  { label: 'Research Conferences', value: 'research-conference' },
];

const ITEMS_PER_PAGE = 9;
const SIX_MONTHS_MS = 6 * 30 * 24 * 60 * 60 * 1000;

function formatDate(start?: string, end?: string, fallback?: string) {
  const parse = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  if (start && end) return `${parse(start)} – ${parse(end)}`;
  if (start) return parse(start);
  if (fallback) return parse(fallback);
  return 'TBA';
}

function Pagination({ page, totalPages, onPageChange }: { page: number; totalPages: number; onPageChange: (p: number) => void }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 rounded-lg border border-[#333] text-[#aaa] text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#555]"
      >
        ← Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-9 h-9 rounded-lg text-sm font-semibold border transition-all ${
            p === page
              ? 'bg-[#f26522] border-[#f26522] text-white'
              : 'border-[#333] text-[#aaa] hover:border-[#555]'
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 rounded-lg border border-[#333] text-[#aaa] text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#555]"
      >
        Next →
      </button>
    </div>
  );
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await apiRequest('/api/v1/events') as { data: EventItem[] };
        const data = res.data || [];

        // Filter out events older than 6 months
        const now = Date.now();
        const recent = data.filter(event => {
          const uploadDate = new Date(event.createdAt ?? event.date ?? 0).getTime();
          return now - uploadDate < SIX_MONTHS_MS;
        });

        // Sort FIFO — oldest first
        const sorted = [...recent].sort((a, b) => {
          const dateA = new Date(a.createdAt ?? a.date ?? 0).getTime();
          const dateB = new Date(b.createdAt ?? b.date ?? 0).getTime();
          return dateA - dateB;
        });

        setEvents(sorted);
      } catch (err) {
        console.error('Failed to fetch events', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filtered = useMemo(() => {
    if (activeTab === 'all') return events;
    return events.filter(e => e.type === activeTab);
  }, [events, activeTab]);

  // Reset to page 1 when filter changes
  useEffect(() => { setPage(1); }, [activeTab]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-medium text-white mb-1">Events</h1>
      <p className="text-sm text-[#888] mb-6">
        Discover hackathons, tech fests, research conferences, and competitions tailored for you.
      </p>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap mb-5">
        {TABS.map(tab => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-1.5 rounded-full text-sm border transition-all ${
              activeTab === tab.value
                ? 'bg-[#f26522] border-[#f26522] text-white font-medium'
                : 'border-[#333] text-[#aaa] hover:border-[#555] hover:text-[#ccc]'
            }`}
          >
            {tab.label}
          </button>
        ))}
        <span className="ml-auto text-sm text-[#555] self-center">
          {filtered.length} events
        </span>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', alignItems: 'stretch' }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5 h-64 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-[#555] text-sm mt-10 text-center">No events found.</p>
      ) : (
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', alignItems: 'stretch' }}>
          {paginated.map(event => {
            const config = TYPE_CONFIG[event.type] ?? TYPE_CONFIG['hackathon'];
            const Icon = config.Icon;
            const isEmple = event.type === 'our-hackathon';

            return (
              <div 
                key={event._id} 
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:border-[#f26522]/35 hover:shadow-[0_4px_24px_rgba(241,90,34,0.08)]"
              >
                {/* Banner - Larger Image Area */}
                <div className="relative w-full h-[145px] bg-[#1a1a1a] overflow-hidden flex-shrink-0">
                  {event.banner ? (
                    <img src={event.banner} alt={event.title} className="w-full h-full object-cover block" />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${config.iconBg}`}>
                      <Icon size={40} className={config.color} />
                    </div>
                  )}
                </div>

                <div className="px-4 py-3 flex flex-col flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[15px] font-bold text-white truncate leading-tight">{event.title}</h3>
                      <p className="text-[12px] font-medium text-[#777] truncate mt-0.5">{event.organiser}</p>
                    </div>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 flex items-center gap-1 ${
                      event.registrationOpen
                        ? 'bg-[rgba(34,197,94,0.1)] text-[#22c55e] border border-[#22c55e]/20'
                        : 'bg-[rgba(245,158,11,0.1)] text-[#f59e0b] border border-[#f59e0b]/20'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${event.registrationOpen ? 'bg-[#22c55e]' : 'bg-[#f59e0b]'}`} />
                      {event.registrationOpen ? 'Open' : 'Closed'}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-[13px] text-[#888] line-clamp-1 mb-2 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Meta - Compact Multi-row/Wrapped */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12px] text-[#777] mb-3">
                    <span className="flex items-center gap-1">
                      📅 {formatDate(event.startDate, event.endDate, event.date)}
                    </span>

                    {!isEmple && (
                      <span className="flex items-center gap-1">
                        📍 TBA
                      </span>
                    )}
                    
                    <span className="flex items-center gap-1">
                      💼 <span className={config.color}>{config.label}</span>
                    </span>

                    {isEmple && event.rewards && (
                      <span className="flex items-center gap-1 text-[#2ecc71]">
                        🏆 <span className="font-semibold">{event.rewards}</span>
                      </span>
                    )}
                  </div>

                  {/* Spacer to push actions to bottom */}
                  <div className="flex-1" />

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto">
                    {isEmple ? (
                      <button
                        onClick={() => router.push(`/user/events/${event._id}`)}
                        className="flex-1 h-[36px] rounded-[9px] border border-[#333] bg-[#1a1a1a] text-[#ccc] text-[13px] font-semibold hover:border-[#f26522] hover:text-[#f26522] transition-colors"
                      >
                        View Details
                      </button>
                    ) : (
                      <>
                        <button
                          disabled={!event.registrationOpen}
                          onClick={() => event.registrationLink && window.open(event.registrationLink, '_blank')}
                          className="flex-1 h-[36px] rounded-[9px] bg-[#f26522] text-white text-[13px] font-bold disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-opacity hover:opacity-90"
                        >
                          Apply
                        </button>
                        <button
                          onClick={() => router.push(`/user/events/${event._id}`)}
                          className="flex-1 h-[36px] rounded-[9px] border border-[#333] bg-[#1a1a1a] text-[#ccc] text-[13px] font-semibold hover:border-[#f26522] hover:text-[#f26522] transition-colors"
                        >
                          View
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {!loading && <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />}
    </div>
  );
}