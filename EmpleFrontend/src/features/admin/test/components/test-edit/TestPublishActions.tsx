type TestPublishActionsProps = {
  saving: boolean;
  onSave: () => void;
  onPublish: () => void;
};

export default function TestPublishActions({
  saving,
  onSave,
  onPublish,
}: TestPublishActionsProps) {
  return (
    <div className="mt-8 flex justify-end gap-3 border-t border-[var(--clr-border)] pt-5">
      <button
        onClick={onSave}
        disabled={saving}
        className="rounded-2xl border border-[var(--clr-border)] px-5 py-3 text-sm font-semibold text-[var(--clr-text)] disabled:opacity-60"
      >
        {saving ? 'Saving...' : 'Save Details'}
      </button>

      <button
        onClick={onPublish}
        disabled={saving}
        className="rounded-2xl bg-green-600 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        Publish Test
      </button>
    </div>
  );
}