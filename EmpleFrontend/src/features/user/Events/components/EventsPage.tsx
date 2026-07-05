'use client';

import { useEffect, useState } from 'react';
import { Trophy, Stars, Rocket, Calendar, MapPin, Gift, SlidersHorizontal, ExternalLink } from 'lucide-react';
import { apiRequest } from '@/shared/utils/api';
import { useRouter } from 'next/navigation';

type EventType = 'hackathon' | 'techfest' | 'our-hackathon';
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
}

const TYPE_CONFIG: Record<EventType, { label: string; color: string; iconBg: string; Icon: React.ElementType }> = {
  hackathon: { label: 'Hackathon', color: 'text-[#f26522]', iconBg: 'bg-[#2a1a10]', Icon: Trophy },
  techfest: { label: 'Techfest', color: 'text-[#9575cd]', iconBg: 'bg-[#1a1030]', Icon: Stars },
  'our-hackathon': { label: 'By Emple', color: 'text-[#2ecc71]', iconBg: 'bg-[#0d2018]', Icon: Rocket },
};

const TABS: { label: string; value: FilterTab }[] = [
  { label: 'All', value: 'all' },
  { label: 'Hackathon', value: 'hackathon' },
  { label: 'Techfest', value: 'techfest' },
  { label: 'By Emple', value: 'our-hackathon' },
];

function formatDate(start?: string, end?: string, fallback?: string) {
  const parse = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  if (start && end) return `${parse(start)} – ${parse(end)}`;
  if (start) return parse(start);
  if (fallback) return parse(fallback);
  return 'TBA';
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await apiRequest('/api/v1/events') as { data: EventItem[] };
        setEvents(res.data || []);
      } catch (err) {
        console.error('Failed to fetch events', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filtered = activeTab === 'all' ? events : events.filter(e => e.type === activeTab);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-medium text-white mb-1">Events</h1>
      <p className="text-sm text-[#888] mb-6">
        Discover hackathons, tech fests, and competitions tailored for you.
      </p>

      {/* Filters */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-2 flex-wrap">
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
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#333] text-[#aaa] text-sm hover:border-[#555]">
          <SlidersHorizontal size={14} /> Filters
        </button>
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
          {filtered.map(event => {
            const config = TYPE_CONFIG[event.type] ?? TYPE_CONFIG['hackathon'];
            const Icon = config.Icon;
            const isEmple = event.type === 'our-hackathon';

            return (
              <div key={event._id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden flex flex-col">

                {/* Banner */}
                {event.banner ? (
                  <div className="w-full h-36 bg-[#111] flex items-center justify-center overflow-hidden">
                    <img
                      src={event.banner}
                      alt={event.title}
                      className="w-full h-full object-contain"
                    />
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
    </div>
  );
}