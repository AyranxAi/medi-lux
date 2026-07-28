import type { Metadata } from "next";
import Quiz from "@/components/Quiz";

export const metadata: Metadata = {
  title: "The Hormone Symptom Quiz",
  description:
    "Two minutes, no wrong answers — find the Medi-Gyn care pathway that fits what you’re experiencing.",
};

export default function QuizPage() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="kicker">The Hormone Symptom Quiz</p>
          <h1 className="h-display mt-4 text-4xl sm:text-5xl">
            Two minutes. No wrong answers.
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
            This routes you to the right starting point — not to a sales page.
          </p>
        </div>
        <Quiz />
      </div>
    </section>
  );
}
