'use client';

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="page-main shell" role="alert">
      <h1>This page couldn’t load.</h1>
      <p>Check your connection and try again.</p>
      <button type="button" className="button button-dark" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
