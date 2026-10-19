export function PageLoading() {
  return (
    <output className="page-loading" aria-live="polite">
      <span className="page-loading-mark" aria-hidden="true" />
      <span className="page-loading-name">Solytes</span>
      <span className="page-loading-label">Loading your next view…</span>
    </output>
  );
}
