import { Compass } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Compass size={15} strokeWidth={2.5} />
          </div>
          <span className="text-sm font-bold text-ink">MedPath</span>
        </div>
        <p className="text-xs text-slate-400">
          © ۱۴۰۳ MedPath — یک پروژه‌ی نسخه‌ی اولیه (MVP) برای کمک به تصمیم‌گیری شغلی پزشکان
        </p>
      </div>
    </footer>
  );
}
