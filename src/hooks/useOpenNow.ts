import { useEffect, useState } from "react";
import { nowInAlgiers } from "../helpers";
import { WEEKLY_HOURS } from "../data/hours";

export function useOpenNow() {
  const [{ open, nextChange }, setState] = useState({
    open: false,
    nextChange: "",
  });
  useEffect(() => {
    const pad = (n: number) => String(n).padStart(2, "0");
    function compute() {
      const { minutes, weekday } = nowInAlgiers();
      const { open: o, close: c } = WEEKLY_HOURS[weekday];
      const isOpen = minutes >= o && minutes < c;
      const nc =
        minutes < o
          ? `${pad(Math.floor(o / 60))}:${pad(o % 60)}`
          : `${pad(Math.floor(c / 60))}:${pad(c % 60)}`;
      setState({ open: isOpen, nextChange: nc });
    }
    compute();
    const id = setInterval(compute, 60 * 1000);
    return () => clearInterval(id);
  }, []);
  return { open, nextChange };
}
