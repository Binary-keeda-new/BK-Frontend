interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  {
    id: 'details',
    label: 'Details',
  },
  {
    id: 'statement',
    label: 'Statement',
  },
  {
    id: 'examples',
    label: 'Examples',
  },
  {
    id: 'constraints',
    label: 'Constraints',
  },
  {
    id: 'languages',
    label: 'Languages',
  },
  {
    id: 'templates',
    label: 'Templates',
  },
  {
    id: 'execution',
    label: 'Execution',
  },
  {
    id: 'tests',
    label: 'Tests',
  },
  {
    id: 'hints',
    label: 'Hints',
  },
  {
    id: 'editorial',
    label: 'Editorial',
  },
  {
    id: 'publish',
    label: 'Publish',
  },
];

export default function CodingProblemTabs({
  activeTab,
  onTabChange,
}: Props) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={
            activeTab === tab.id
              ? 'rounded-xl bg-[var(--clr-accent)] px-4 py-2 text-white'
              : 'rounded-xl border border-[var(--clr-border)] px-4 py-2'
          }
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}