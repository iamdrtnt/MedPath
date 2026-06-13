"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveLead } from "@/lib/storage";

interface LeadCaptureProps {
  assessmentResultId: string;
}

export function LeadCapture({ assessmentResultId }: LeadCaptureProps) {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneTrimmed = phone.trim();
    const isValidPhone = /^09\d{9}$/.test(phoneTrimmed) || /^\+?\d{8,14}$/.test(phoneTrimmed);

    if (!phoneTrimmed) {
      setError("لطفاً شماره موبایل خود را وارد کنید.");
      return;
    }
    if (!isValidPhone) {
      setError("شماره موبایل وارد شده معتبر نیست.");
      return;
    }

    setError(null);
    saveLead({
      phone: phoneTrimmed,
      email: email.trim() || undefined,
      assessmentResultId,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl border border-brand-100 bg-brand-50 p-8 text-center"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-glow">
          <CheckCircle2 size={28} />
        </div>
        <h3 className="text-lg font-extrabold text-ink sm:text-xl">ثبت شد!</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-7 text-slate-500">
          درخواست شما با موفقیت ثبت شد. به‌محض آماده شدن نسخه کامل MedPath،
          از طریق همین شماره با شما در ارتباط خواهیم بود.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-6 shadow-soft-lg sm:p-8"
    >
      <div className="text-center">
        <h3 className="text-lg font-extrabold text-ink sm:text-xl">
          نسخه کامل MedPath در حال توسعه است
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">
          به‌زودی تحلیل‌های عمیق‌تر، مقایسه مسیرها و نقشه راه اختصاصی به
          MedPath اضافه خواهد شد. اگر می‌خواهید جزو اولین کاربران باشید
          اطلاعات خود را ثبت کنید.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phone">
            شماره موبایل <span className="text-brand-600">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            inputMode="numeric"
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            dir="ltr"
            className="text-right"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">ایمیل (اختیاری)</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            dir="ltr"
            className="text-right"
          />
        </div>

        {error && <p className="text-sm font-medium text-red-500">{error}</p>}

        <Button type="submit" size="lg" className="group w-full">
          ثبت درخواست دسترسی زودهنگام
          <Send size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
        </Button>
      </form>
    </motion.div>
  );
}
