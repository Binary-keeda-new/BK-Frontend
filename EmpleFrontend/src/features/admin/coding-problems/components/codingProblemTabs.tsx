interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  'details',
  'statement',
  'examples',
  'constraints',
  'languages',
  'templates',
  'tests',
  'hints',
  'editorial',
  'publish',
];

export default function CodingProblemTabs({
  activeTab,
  onTabChange,
}: Props) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={
            activeTab === tab
              ? 'rounded-xl bg-[var(--clr-accent)] px-4 py-2 text-white'
              : 'rounded-xl border border-[var(--clr-border)] px-4 py-2'
          }
        >
          {tab}
        </button>
      ))}
    </div>
  );
}