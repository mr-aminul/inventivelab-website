import { useEffect, useRef, useState } from "react";

const TYPE_MS = 75;
const DELETE_MS = 45;
const PAUSE_MS = 1200;

type TypingHeadlineWordProps = {
  words: readonly string[];
  index: number;
  onIndexChange: (index: number) => void;
};

export function TypingHeadlineWord({ words, index, onIndexChange }: TypingHeadlineWordProps) {
  const [text, setText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const syncedIndexRef = useRef(index);
  const timerRef = useRef<number>();
  const machineRef = useRef({ wordIndex: index, phase: "typing" as "typing" | "pause" | "deleting", charIndex: 0 });
  const runRef = useRef<() => void>(() => {});

  const clearTimer = () => {
    if (timerRef.current !== undefined) {
      window.clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
  };

  const schedule = (delay: number, fn: () => void) => {
    clearTimer();
    timerRef.current = window.setTimeout(fn, delay);
  };

  useEffect(() => {
    const blink = window.setInterval(() => setCursorVisible((visible) => !visible), 530);
    return () => window.clearInterval(blink);
  }, []);

  useEffect(() => {
    let cancelled = false;

    runRef.current = () => {
      if (cancelled) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      const machine = machineRef.current;
      const word = words[machine.wordIndex];

      if (machine.phase === "typing") {
        if (machine.charIndex < word.length) {
          machine.charIndex += 1;
          setText(word.slice(0, machine.charIndex));
          schedule(TYPE_MS, runRef.current);
          return;
        }

        machine.phase = "pause";
        schedule(PAUSE_MS, () => {
          machine.phase = "deleting";
          runRef.current();
        });
        return;
      }

      if (machine.phase === "deleting") {
        if (machine.charIndex > 0) {
          machine.charIndex -= 1;
          setText(word.slice(0, machine.charIndex));
          schedule(DELETE_MS, runRef.current);
          return;
        }

        const nextIndex = (machine.wordIndex + 1) % words.length;
        machine.wordIndex = nextIndex;
        machine.phase = "typing";
        machine.charIndex = 0;
        syncedIndexRef.current = nextIndex;
        onIndexChange(nextIndex);
        schedule(TYPE_MS, runRef.current);
      }
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      setText(words[syncedIndexRef.current]);
      return;
    }

    schedule(TYPE_MS, runRef.current);

    return () => {
      cancelled = true;
      clearTimer();
    };
  }, [onIndexChange, words]);

  useEffect(() => {
    if (index === syncedIndexRef.current) return;

    syncedIndexRef.current = index;
    clearTimer();
    machineRef.current = { wordIndex: index, phase: "typing", charIndex: 0 };
    setText("");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      setText(words[index]);
      return;
    }

    schedule(TYPE_MS, runRef.current);
  }, [index, words]);

  return (
    <span className="landing-headline-typing landing-title-accent" aria-live="polite">
      {text}
      <span className="landing-headline-cursor" aria-hidden data-visible={cursorVisible} />
    </span>
  );
}
