// Next.js renders this automatically while a route segment streams in.
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-5 bg-black"
    >
      <span className="text-xl font-black tracking-tight text-white">
        Deft<span className="text-brand-teal">.</span>
      </span>
      <div className="progress-loader">
        <div />
      </div>
    </div>
  );
}
