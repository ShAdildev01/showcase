import { forwardRef } from "react";

type Props = { url: string; children: React.ReactNode; className?: string };

const DemoFrame = forwardRef<HTMLDivElement, Props>(function DemoFrame({ url, children, className = "" }, ref) {
  return (
    <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl bg-[#1c1c1c] ring-1 ring-white/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        </div>
        <p className="mx-auto w-full max-w-sm truncate rounded-md bg-white/5 px-3 py-1 text-center text-xs text-white/50">{url}</p>
        <span className="w-10" aria-hidden />
      </div>
      <div ref={ref} className={`relative h-[min(76vh,720px)] overflow-y-auto overflow-x-hidden ${className}`}>
        {children}
      </div>
    </div>
  );
});

export default DemoFrame;
