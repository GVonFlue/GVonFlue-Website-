"use client";

import { useRef } from "react";
import DrawPath from "./DrawPath";
import { usePinProgress, mapRange } from "./useScroll";

const JOURNEY_HEAD = "Here with you every step of the way.";
const GOLD_WORDS = new Set(["every", "way"]);

export default function Journey() {
  const ref = useRef(null);
  const p = usePinProgress(ref);

  const words = JOURNEY_HEAD.split(" ");
  const litStart = 0.05;
  const litEnd = 0.46;
  const bgShift = mapRange(p, 0, 1, 215, 232);

  const W = "#ffffff";
  const G = "#E7B53C";
  const lot = mapRange(p, 0.03, 0.1, 0, 1);
  const found = mapRange(p, 0.1, 0.2, 0, 1);
  const frameW = mapRange(p, 0.2, 0.33, 0, 1);
  const studs = mapRange(p, 0.27, 0.39, 0, 1);
