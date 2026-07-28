"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { QUIZ, SYMPTOMS, PATHWAYS } from "@/lib/content";

/*
  The filtering questionnaire from the brief ("Take the Hormone Symptom Quiz").
  Preview logic: symptom answers route to the closest care pathway.
  Answers are NOT stored — later this becomes a Zoho CRM lead-capture point.
*/

function recommendPathway(selectedSymptoms: string[]): string {
  const counts = new Map<string, number>();
  for (const name of selectedSymptoms) {
    const symptom = SYMPTOMS.find((s) => s.name === name);
    if (symptom) counts.set(symptom.pathway, (counts.get(symptom.pathway) ?? 0) + 1);
  }
  let best = "hormone-therapy";
  let bestCount = 0;
  for (const p of PATHWAYS) {
    const c = counts.get(p.slug) ?? 0;
    if (c > bestCount) {
      best = p.slug;
      bestCount = c;
    }
  }
  return best;
}

export default function Quiz() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const done = step >= QUIZ.length;
  const question = QUIZ[Math.min(step, QUIZ.length - 1)];

  const selected = answers[question.id] ?? [];

  function toggle(option: string) {
    setAnswers((prev) => {
      const current = prev[question.id] ?? [];
      if (question.multi) {
        return {
          ...prev,
          [question.id]: current.includes(option)
            ? current.filter((o) => o !== option)
            : [...current, option],
        };
      }
      return { ...prev, [question.id]: [option] };
    });
    if (!question.multi) setTimeout(() => setStep((s) => s + 1), 250);
  }

  const recommendation = PATHWAYS.find(
    (p) => p.slug === recommendPathway(answers["symptoms"] ?? []),
  )!;

  const motionProps = reduce
    ? {}
    : {
        initial: { opacity: 0, x: 28 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -28 },
        transition: { duration: 0.3, ease: "easeOut" as const },
      };

  return (
    <div className="mx-auto max-w-2xl">
      {/* progress hairline */}
      <div className="mb-10 h-px w-full bg-line" aria-hidden="true">
        <div
          className="h-px bg-gold-deep transition-all duration-500"
          style={{ width: `${(Math.min(step, QUIZ.length) / QUIZ.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div key={step} {...motionProps}>
            <p className="kicker">
              Question {step + 1} of {QUIZ.length}
            </p>
            <h2 className="h-display mt-3 text-3xl sm:text-4xl">{question.question}</h2>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {question.options.map((option) => {
                const active = selected.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggle(option)}
                    aria-pressed={active}
                    className={`min-h-11 cursor-pointer rounded-full border px-5 py-2.5 text-[14px] transition-colors duration-150 ${
                      active
                        ? "border-burgundy bg-burgundy text-ivory"
                        : "border-line bg-ivory text-ink hover:border-gold"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <div className="mt-10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="cursor-pointer text-[13px] text-ink-soft transition-colors hover:text-ink disabled:cursor-default disabled:opacity-0"
              >
                ← Back
              </button>
              {question.multi && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s + 1)}
                  disabled={selected.length === 0}
                  className="btn-primary disabled:cursor-default disabled:opacity-40"
                >
                  Continue
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div key="result" {...motionProps}>
            <p className="kicker">Your starting point</p>
            <h2 className="h-display mt-3 text-3xl sm:text-4xl">{recommendation.name}</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              {recommendation.whoFor}
            </p>
            <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">
              <span className="font-semibold text-ink">What happens next: </span>
              {recommendation.next}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/book" className="btn-primary">
                Book Your Consultation
              </Link>
              <Link href={`/pathways/${recommendation.slug}`} className="btn-secondary">
                View this pathway
              </Link>
            </div>
            <button
              type="button"
              onClick={() => {
                setStep(0);
                setAnswers({});
              }}
              className="mt-6 cursor-pointer text-[13px] text-ink-soft underline-offset-4 hover:text-ink hover:underline"
            >
              Start over
            </button>
            <p className="mt-8 text-[11.5px] leading-relaxed text-ink-soft/70">
              Preview build: answers are not stored. In production this step becomes a
              gentle lead-capture point connected to Zoho CRM with source tracking.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
