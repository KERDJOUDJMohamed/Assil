import React from "react";
import { BRAND } from "../utils/brand";

interface TypewriterTextProps {
  text: string;
  navShrink: boolean;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({ text, navShrink }) => {
  const [display, setDisplay] = React.useState("");
  const [deleting, setDeleting] = React.useState(false);
  const [idx, setIdx] = React.useState(0);
  const [fontSize, setFontSize] = React.useState(navShrink ? 18 : 22);

  // Responsive font size effect
  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setFontSize(navShrink ? 8 : 8);
      } else {
        setFontSize(navShrink ? 18 : 22);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [navShrink]);

  React.useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && idx < text.length) {
      timeout = setTimeout(() => setIdx(idx + 1), 270); // 50% slower
    } else if (!deleting && idx === text.length) {
      timeout = setTimeout(() => setDeleting(true), 1050); // 50% slower
    } else if (deleting && idx > 0) {
      timeout = setTimeout(() => setIdx(idx - 1), 150); // 50% slower
    } else if (deleting && idx === 0) {
      timeout = setTimeout(() => setDeleting(false), 600); // 50% slower
    }
    setDisplay(text.slice(0, idx));
    return () => clearTimeout(timeout);
  }, [idx, deleting, text]);

  return (
    <span style={{
      fontFamily: 'monospace',
      fontWeight: 700,
      fontSize,
      color: BRAND.violet,
      marginLeft: 8,
      letterSpacing: 2,
      borderRight: '2px solid ' + BRAND.violet,
      paddingRight: 2,
      whiteSpace: 'pre',
      minWidth: 48,
      display: 'inline-block',
      verticalAlign: 'middle',
    }}>{display}</span>
  );
};
