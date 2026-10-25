@import "tailwindcss";

@theme {
  --color-paper: #f5f2eb;
  --color-ink: #20251f;
  --color-forest: #284d3a;
  --color-olive: #a3ac8a;
  --color-sand: #e8e1d4;
  /* Тёмный лесной тон: производный от лесного зелёного, для иллюстраций и подвала */
  --color-deep: #16211a;
  /* Приглушённый текст: контраст ≥ 5:1 на paper и sand */
  --color-muted: #566053;
  --color-line: rgb(32 37 31 / 0.2);

  --font-serif: "Literata Variable", Georgia, "Times New Roman", serif;
  --font-sans:
    "Inter Variable", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;

  --animate-rise: rise 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both;
  --animate-fade: fade 1.4s ease both;

  @keyframes rise {
    from {
      opacity: 0;
      transform: translateY(14px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}

@layer base {
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 5.5rem;
    -webkit-text-size-adjust: 100%;
  }
  body {
    background: var(--color-paper);
    color: var(--color-ink);
    font-family: var(--font-sans);
    font-size: 1rem;
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  h1,
  h2,
  h3,
  h4 {
    font-family: var(--font-serif);
    font-weight: 600;
    letter-spacing: -0.015em;
    line-height: 1.12;
    text-wrap: balance;
  }
  a {
    text-underline-offset: 0.2em;
    text-decoration-thickness: 1px;
  }
  :focus-visible {
    outline: 3px solid var(--color-forest);
    outline-offset: 3px;
    border-radius: 2px;
  }
  .on-dark :focus-visible {
    outline-color: var(--color-paper);
  }
  ::selection {
    background: var(--color-olive);
    color: var(--color-ink);
  }
  img,
  svg {
    max-width: 100%;
  }
}

@layer components {
  .kicker {
    font-family: var(--font-sans);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
  .wrap {
    width: 100%;
    max-width: 78rem;
    margin-inline: auto;
    padding-inline: 1.25rem;
  }
  @media (min-width: 768px) {
    .wrap {
      padding-inline: 2rem;
    }
  }
  .rule-top {
    border-top: 1px solid var(--color-line);
  }
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-height: 3rem;
    padding: 0.7rem 1.4rem;
    font-weight: 600;
    font-size: 0.95rem;
    text-decoration: none;
    border: 1px solid var(--color-forest);
    transition:
      background-color 0.2s,
      color 0.2s;
    cursor: pointer;
  }
  .btn-solid {
    background: var(--color-forest);
    color: var(--color-paper);
  }
  .btn-solid:hover {
    background: var(--color-deep);
  }
  .btn-line {
    background: transparent;
    color: var(--color-forest);
  }
  .btn-line:hover {
    background: var(--color-forest);
    color: var(--color-paper);
  }
  .btn-on-dark {
    border-color: var(--color-paper);
    color: var(--color-paper);
    background: transparent;
  }
  .btn-on-dark:hover {
    background: var(--color-paper);
    color: var(--color-deep);
  }
  .btn-solid-on-dark {
    border-color: var(--color-paper);
    background: var(--color-paper);
    color: var(--color-deep);
  }
  .btn-solid-on-dark:hover {
    background: var(--color-sand);
  }

  /* Текст статьи */
  .prose-ed {
    font-family: var(--font-serif);
    font-size: 1.1875rem;
    line-height: 1.75;
    max-width: 42rem;
  }
  .prose-ed p {
    margin-top: 1.25rem;
  }
  .prose-ed h2 {
    font-size: clamp(1.65rem, 3.2vw, 2.2rem);
    margin-top: 3.25rem;
    padding-top: 1.25rem;
    border-top: 1px solid var(--color-line);
  }
  .prose-ed h3 {
    font-size: 1.35rem;
    margin-top: 2rem;
  }
  .prose-ed ul {
    margin-top: 1.25rem;
    padding-left: 1.25rem;
    list-style: square;
  }
  .prose-ed li {
    margin-top: 0.5rem;
    padding-left: 0.25rem;
  }
  .prose-ed li::marker {
    color: var(--color-forest);
  }
  .prose-ed a {
    color: var(--color-forest);
  }
  .prose-ed strong {
    font-weight: 650;
  }

  .link-term {
    color: var(--color-forest);
    text-decoration: underline;
    text-decoration-style: dotted;
    text-decoration-thickness: 2px;
  }
  .cite {
    font-family: var(--font-sans);
    font-size: 0.72em;
    font-weight: 600;
    vertical-align: super;
    line-height: 0;
    padding: 0 0.12em;
    color: var(--color-forest);
    text-decoration: none;
    white-space: nowrap;
  }
  .cite:hover {
    text-decoration: underline;
  }

  /* Анимации появления при прокрутке (включаются скриптом) */
  .reveal {
    opacity: 0;
    transform: translateY(18px);
    transition:
      opacity 0.8s ease,
      transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
  }
  .reveal.is-visible {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-delay: 0ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
  .reveal {
    opacity: 1;
    transform: none;
  }
}

@media print {
  header,
  footer,
  nav {
    display: none;
  }
}
