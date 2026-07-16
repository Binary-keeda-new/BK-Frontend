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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5 h-64 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-[#555] text-sm mt-10 text-center">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginated.map(event => {
            const config = TYPE_CONFIG[event.type] ?? TYPE_CONFIG['hackathon'];
            const Icon = config.Icon;
            const isEmple = event.type === 'our-hackathon';

            return (
              <div key={event._id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden flex flex-col">

                {/* Banner */}
                {event.banner ? (
                  <div className="w-full h-36 bg-[#111] flex items-center justify-center overflow-hidden">
                    <img src={event.banner} alt={event.title} className="w-full h-full object-contain" />
                  </div>
                ) : (
                  <div className={`w-full h-36 flex items-center justify-center ${config.iconBg}`}>
                    <Icon size={40} className={config.color} />
                  </div>
                )}

                <div className="p-5 flex flex-col gap-3 flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{event.title}</p>
                      <p className="text-xs text-[#777] truncate">{event.organiser}</p>
                    </div>
                    <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${
                      event.registrationOpen
                        ? 'bg-[#0d2a14] text-[#2ecc71] border border-[#1a4a24]'
                        : 'bg-[#2a1010] text-[#e74c3c] border border-[#4a1a1a]'
                    }`}>
                      {event.registrationOpen ? '● Open' : '● Closed'}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#777] line-clamp-2">{event.description}</p>

                  <hr className="border-[#222]" />

                  {/* Meta */}
                  <div className="flex flex-col gap-1.5 text-xs text-[#777]">
                    <span className="flex items-center gap-2">
                      <Calendar size={13} />
                      {formatDate(event.startDate, event.endDate, event.date)}
                    </span>

                    {isEmple && event.rewards && (
                      <span className="flex items-center gap-2">
                        <Gift size={13} /> {event.rewards}
                      </span>
                    )}

                    {!isEmple && (
                      <span className="flex items-center gap-2">
                        <MapPin size={13} /> TBA
                      </span>
                    )}

                    <span className={config.color}>{config.label}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto pt-1">
                    {isEmple ? (
                      <button
                        onClick={() => router.push(`/user/events/${event._id}`)}
                        className="flex-1 py-2 rounded-lg bg-[#f26522] text-white text-sm font-medium hover:bg-[#d4561e] transition"
                      >
                        View Details
                      </button>
                    ) : (
                      <>
                        <button
                          disabled={!event.registrationOpen}
                          onClick={() => event.registrationLink && window.open(event.registrationLink, '_blank')}
                          className="flex-1 py-2 rounded-lg bg-[#f26522] text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                        >
                          <ExternalLink size={13} /> Apply
                        </button>
                        <button
                          onClick={() => router.push(`/user/events/${event._id}`)}
                          className="flex-1 py-2 rounded-lg border border-[#333] text-[#ccc] text-sm hover:border-[#555]"
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