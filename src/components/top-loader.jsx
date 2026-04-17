"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import NProgress from "nprogress";

export default function TopLoader({ height = 2 }) {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const styleRef = useRef(null);

  const color = resolvedTheme === "light" ? "#09090b" : "#ffffff";

  useEffect(() => {
    if (styleRef.current) document.head.removeChild(styleRef.current);
    const styles = document.createElement("style");
    styles.textContent = `
      #nprogress { pointer-events: none; }
      #nprogress .bar {
        background: ${color};
        position: fixed;
        z-index: 9999;
        top: 0; left: 0;
        width: 100%; height: ${height}px;
      }
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0; width: 100px; height: 100%;
        box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
        opacity: 1;
        transform: rotate(3deg) translate(0px, -4px);
      }
      #nprogress .spinner { display: none; }
    `;
    document.head.appendChild(styles);
    styleRef.current = styles;
  }, [color, height]);

  useEffect(() => {
    NProgress.configure({ showSpinner: false, trickle: true, trickleSpeed: 200, minimum: 0.08, easing: "ease", speed: 200 });

    const origPush = window.history.pushState;
    window.history.pushState = (...args) => {
      NProgress.start();
      origPush.apply(window.history, args);
    };

    const handlePop = () => NProgress.start();
    window.addEventListener("popstate", handlePop);

    return () => {
      window.removeEventListener("popstate", handlePop);
      window.history.pushState = origPush;
      if (styleRef.current) document.head.removeChild(styleRef.current);
    };
  }, []);

  useEffect(() => {
    NProgress.done();
  }, [pathname]);

  return null;
}
