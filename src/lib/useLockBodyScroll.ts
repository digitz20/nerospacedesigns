"use client";

import { useEffect } from "react";

/**
 * iOS-safe body scroll lock.
 *
 * `overflow: hidden` on <body> does NOT stop touch scrolling on iOS Safari —
 * rubber-band scrolling keeps working and the page behind a modal moves.
 * The reliable cross-platform technique (works on every iPhone/Android) is to
 * fix the body to the viewport at the negative of the current scroll offset,
 * then restore both on release. Returns a cleanup function.
 */
export function lockBodyScroll(): () => void {
  const body = document.body;
  const scrollY = window.scrollY;
  const prev = {
    position: body.style.position,
    top: body.style.top,
    width: body.style.width,
    overflow: body.style.overflow,
  };
  body.style.position = "fixed";
  body.style.top = `-${scrollY}px`;
  body.style.width = "100%";
  body.style.overflow = "hidden";
  return () => {
    body.style.position = prev.position;
    body.style.top = prev.top;
    body.style.width = prev.width;
    body.style.overflow = prev.overflow;
    window.scrollTo(0, scrollY);
  };
}

/** Hook form of lockBodyScroll for components mounted only while open. */
export function useLockBodyScroll(): void {
  useEffect(() => lockBodyScroll(), []);
}
