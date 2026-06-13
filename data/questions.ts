import {
  CareerStage,
  EmigrationLikelihood,
  FutureSelfImage,
  PrimaryGoal,
  TimelineComfort,
} from "@/types";

export interface ChoiceOption<T extends string> {
  value: T;
  label: string;
}

export interface BaseQuestion {
  id: keyof import("@/types").AssessmentAnswers;
  title: string;
  step: number;
}

export interface ChoiceQuestion<T extends string> extends BaseQuestion {
  type: "choice";
  options: ChoiceOption<T>[];
}

export interface SliderQuestion extends BaseQuestion {
  type: "slider";
  min: number;
  max: number;
  minLabel: string;
  maxLabel: string;
}

export type Question =
  | ChoiceQuestion<CareerStage>
  | ChoiceQuestion<PrimaryGoal>
  | ChoiceQuestion<TimelineComfort>
  | ChoiceQuestion<EmigrationLikelihood>
  | SliderQuestion
  | ChoiceQuestion<FutureSelfImage>;

export const QUESTIONS: Question[] = [
  {
    id: "careerStage",
    type: "choice",
    step: 1,
    title: "شما در چه مرحله‌ای هستید؟",
    options: [
      { value: "intern", label: "اینترن" },
      { value: "gp_in_service", label: "پزشک عمومی در طرح" },
      { value: "gp_post_service", label: "پزشک عمومی پایان طرح" },
      { value: "resident", label: "رزیدنت" },
    ],
  },
  {
    id: "primaryGoal",
    type: "choice",
    step: 2,
    title: "مهم‌ترین هدف حرفه‌ای شما چیست؟",
    options: [
      { value: "high_income", label: "درآمد بالا" },
      { value: "emigration", label: "مهاجرت" },
      { value: "work_life_balance", label: "تعادل کار و زندگی" },
      { value: "academic_status", label: "جایگاه علمی و تخصصی" },
      { value: "own_business", label: "کسب‌وکار شخصی" },
    ],
  },
  {
    id: "timelineComfort",
    type: "choice",
    step: 3,
    title: "اگر رسیدن به هدف نهایی ۵ تا ۷ سال زمان ببرد، چقدر با آن راحت هستید؟",
    options: [
      { value: "not_comfortable", label: "اصلاً راحت نیستم" },
      { value: "somewhat_comfortable", label: "تا حدی" },
      { value: "fully_comfortable", label: "کاملاً راحت هستم" },
    ],
  },
  {
    id: "emigrationLikelihood",
    type: "choice",
    step: 4,
    title: "در حال حاضر چقدر احتمال دارد که ایران را ترک کنید؟",
    options: [
      { value: "near_zero", label: "تقریباً صفر" },
      { value: "maybe", label: "شاید" },
      { value: "high", label: "زیاد" },
      { value: "main_goal", label: "هدف اصلی من است" },
    ],
  },
  {
    id: "riskTolerance",
    type: "slider",
    step: 5,
    title: "میزان ریسک‌پذیری شما چقدر است؟",
    min: 1,
    max: 10,
    minLabel: "ریسک‌گریز",
    maxLabel: "ریسک‌پذیر",
  },
  {
    id: "futureSelfImage",
    type: "choice",
    step: 6,
    title: "در ۱۰ سال آینده دوست دارید بیشتر کدام جمله درباره شما درست باشد؟",
    options: [
      { value: "recognized_specialist", label: "متخصص شناخته‌شده‌ای هستم" },
      { value: "living_abroad", label: "در کشور دلخواهم زندگی می‌کنم" },
      { value: "very_high_income", label: "درآمد بسیار بالایی دارم" },
      { value: "time_for_life", label: "زمان کافی برای زندگی شخصی و خانواده دارم" },
      { value: "business_owner", label: "صاحب کسب‌وکار خودم هستم" },
    ],
  },
];

export const TOTAL_STEPS = QUESTIONS.length;
