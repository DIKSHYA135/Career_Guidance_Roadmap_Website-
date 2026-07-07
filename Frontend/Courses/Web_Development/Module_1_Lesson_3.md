# Introduction to CSS3

CSS (Cascading Style Sheets) is what transforms plain, structural HTML into beautiful, visually engaging web pages. If HTML is the skeleton of a webpage, CSS is the skin, clothing, and makeup. Without CSS, every website would look like a plain text document from 1993.

---

## What is CSS?

CSS is a **stylesheet language** that describes how HTML elements should look and be laid out on screen. You write CSS as a set of **rules** that target specific elements and apply visual properties to them.

```css
/* CSS Rule Structure */
selector {
    property: value;
    property: value;
}

/* Real example */
h1 {
    color: #2563eb;          /* Blue text */
    font-size: 2.5rem;       /* Large text */
    font-weight: 800;        /* Very bold */
    text-align: center;      /* Centered */
}
```

A CSS rule has two parts:
1. **Selector** — targets which HTML element(s) to style.
2. **Declaration Block** — contains one or more `property: value;` pairs.

---

## Three Ways to Add CSS

### 1. Inline CSS — Directly on the element (Avoid this!)
```html
<p style="color: red; font-size: 18px;">This text is red and large.</p>
```
**Problems:** Hard to maintain. Mixes structure with style. Cannot reuse.

### 2. Internal CSS — Inside a `<style>` tag in the `<head>`
```html
<head>
    <style>
        p { color: blue; }
        h1 { font-size: 2rem; }
    </style>
</head>
```
**Use case:** Small, single-page projects or quick prototypes.

### 3. External CSS — Separate `.css` file (Best practice ✅)
```html
<!-- In your HTML file -->
<head>
    <link rel="stylesheet" href="style.css">
</head>
```
```css
/* In your style.css file */
p { color: blue; }
h1 { font-size: 2rem; }
```
**Why it's best:** One CSS file can style an entire website. Changes apply everywhere instantly.

---

## CSS Selectors — Targeting Elements

Selectors are the most powerful part of CSS. They determine which elements your rules apply to.

### Basic Selectors
```css
/* Type selector — all <p> elements */
p {
    line-height: 1.6;
}

/* Class selector — elements with class="card" */
.card {
    background: white;
    border-radius: 8px;
    padding: 20px;
}

/* ID selector — the single element with id="hero" */
#hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    height: 100vh;
}

/* Universal selector — ALL elements */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
```

### Combinators
```css
/* Descendant — any <a> inside a <nav> */
nav a {
    text-decoration: none;
    color: #2563eb;
}

/* Direct child — only direct <li> children of <ul> */
ul > li {
    list-style: square;
}

/* Adjacent sibling — <p> immediately after an <h2> */
h2 + p {
    font-weight: 600;
    color: #555;
}
```

### Pseudo-classes & Pseudo-elements
```css
/* Pseudo-classes — based on state */
a:hover {
    color: #dc2626;
    text-decoration: underline;
}

button:focus {
    outline: 3px solid #3b82f6;
}

li:first-child {
    font-weight: bold;
}

li:nth-child(odd) {
    background: #f8f9fa;
}

input:valid {
    border-color: green;
}

input:invalid {
    border-color: red;
}

/* Pseudo-elements — style specific parts of elements */
p::first-line {
    font-weight: bold;
}

p::first-letter {
    font-size: 3em;
    float: left;
}

h2::before {
    content: "→ ";
    color: #2563eb;
}

input::placeholder {
    color: #94a3b8;
    font-style: italic;
}
```

---

## The CSS Box Model — The Most Important Concept in CSS

**Every single HTML element is a rectangular box.** The CSS Box Model defines how the space around that box is calculated.

```
┌─────────────────────────────────────────┐
│               MARGIN                    │  ← Space OUTSIDE the border
│   ┌─────────────────────────────────┐   │
│   │            BORDER               │   │  ← The border line itself
│   │   ┌─────────────────────────┐   │   │
│   │   │         PADDING         │   │   │  ← Space INSIDE the border
│   │   │   ┌─────────────────┐   │   │   │
│   │   │   │                 │   │   │   │
│   │   │   │    CONTENT      │   │   │   │  ← The actual text/image
│   │   │   │                 │   │   │   │
│   │   │   └─────────────────┘   │   │   │
│   │   └─────────────────────────┘   │   │
│   └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

```css
.my-box {
    /* Content area */
    width: 300px;
    height: 200px;
    
    /* Padding (space inside, between content and border) */
    padding: 20px;               /* all 4 sides */
    padding: 10px 20px;          /* top/bottom | left/right */
    padding: 10px 20px 15px 5px; /* top | right | bottom | left */
    
    /* Border */
    border: 2px solid #2563eb;
    border-radius: 8px;          /* Rounded corners */
    
    /* Margin (space outside, between this element and others) */
    margin: 30px auto;           /* 30px top/bottom, auto left/right (centers element) */
}
```

### `box-sizing: border-box` — A Must-Have Reset

By default, CSS uses `content-box`, which means `width` only refers to the content area. Padding and border are ADDED on top:

```css
/* Default (content-box): Actual width = 300 + 20 + 20 (padding) + 2 + 2 (border) = 344px */
.element {
    width: 300px;
    padding: 20px;
    border: 2px solid black;
}

/* With border-box: Actual width = exactly 300px (padding+border are INCLUDED) */
* {
    box-sizing: border-box; /* Apply to everything! */
}
.element {
    width: 300px;
    padding: 20px;
    border: 2px solid black;
}
```

**Always add `box-sizing: border-box` to all your projects.** It makes width/height calculations far more predictable.

---

## Colors in CSS

```css
/* Named colors */
color: red;
color: dodgerblue;
color: coral;

/* Hex — #RRGGBB */
color: #2563eb;   /* Blue */
color: #10b981;   /* Green */
color: #ef4444;   /* Red */
color: #fff;      /* White (shorthand for #ffffff) */
color: #000;      /* Black */

/* RGB */
color: rgb(37, 99, 235);        /* Same as #2563eb */
color: rgba(37, 99, 235, 0.5);  /* 50% transparent blue */

/* HSL — Hue, Saturation, Lightness (most intuitive) */
color: hsl(217, 91%, 53%);          /* Vivid blue */
color: hsl(217, 91%, 80%);          /* Light blue */
color: hsla(217, 91%, 53%, 0.3);    /* Transparent blue */
```

---

## Typography in CSS

```css
body {
    /* Font family — always provide fallbacks */
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    
    font-size: 16px;        /* Base font size */
    font-weight: 400;       /* Normal weight */
    line-height: 1.6;       /* Space between lines (unitless recommended) */
    color: #1e293b;         /* Dark gray for body text */
}

h1 {
    font-size: clamp(1.8rem, 4vw, 3.5rem);  /* Responsive font size */
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.1;
}

/* Text alignment */
p { text-align: left; }      /* Default */
h1 { text-align: center; }
.price { text-align: right; }
.justified { text-align: justify; }

/* Text decoration */
a { text-decoration: none; }        /* Remove underline */
del { text-decoration: line-through; }
h2 { text-decoration: underline; }

/* Text transformation */
.uppercase { text-transform: uppercase; }
.capitalize { text-transform: capitalize; }

/* Text overflow */
.truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;  /* Shows "..." for overflowing text */
    max-width: 200px;
}
```

### Loading Google Fonts
```html
<!-- In your HTML <head> -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
```
```css
/* Then use in CSS */
body {
    font-family: 'Inter', sans-serif;
}
```

---

## CSS Units

```css
/* Absolute units */
width: 300px;     /* Pixels — most common */
font-size: 12pt;  /* Points — mostly for print */

/* Relative units */
font-size: 1.5em;    /* 1.5x the PARENT element's font size */
font-size: 1.5rem;   /* 1.5x the ROOT (html) font size — preferred */

width: 50%;          /* 50% of the parent element's width */

height: 100vh;       /* 100% of the viewport (screen) height */
width: 100vw;        /* 100% of the viewport width */

gap: 1rem;           /* Scales with user's font size preferences */
```

**Rule of thumb:**
- Use `rem` for font sizes.
- Use `px` for borders and shadows.
- Use `%` or `vh/vw` for layouts.

---

## CSS Variables (Custom Properties)

CSS variables let you store values and reuse them everywhere, making your code DRY (Don't Repeat Yourself):

```css
/* Define variables in :root (global scope) */
:root {
    --color-primary: #2563eb;
    --color-text: #1e293b;
    --color-bg: #f8fafc;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 32px;
    --border-radius: 8px;
    --shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
}

/* Use variables with var() */
.button {
    background: var(--color-primary);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    color: white;
}

.card {
    background: white;
    padding: var(--spacing-lg);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
}

/* Override for dark mode */
@media (prefers-color-scheme: dark) {
    :root {
        --color-text: #f1f5f9;
        --color-bg: #0f172a;
    }
}
```

---

## CSS Specificity — Who Wins?

When multiple CSS rules target the same element, the browser needs to decide which one to apply. This is decided by **specificity** — a scoring system:

| Selector Type | Points |
|--------------|--------|
| `!important` | Overrides everything (avoid!) |
| Inline styles | 1000 points |
| ID selector `#id` | 100 points |
| Class `.class`, attribute `[type]`, pseudo-class `:hover` | 10 points |
| Type selector `p`, `div`, pseudo-element `::before` | 1 point |

```css
p               { color: black; }    /* 1 point */
.text           { color: blue; }     /* 10 points */
#intro          { color: green; }    /* 100 points */
<p style="..."> { color: red; }     /* 1000 points */

/* 1 + 10 = 11 points — beats #intro (100)? NO! */
p.text          { color: purple; }  /* 11 points */

/* Be more specific instead of using !important */
#intro.text     { color: orange; }  /* 110 points — wins! */
```

**Golden rule:** The more specific selector always wins. If two selectors have equal specificity, the one written **later in the CSS file** wins.

---

## Backgrounds & Shadows

```css
.hero {
    /* Solid color */
    background-color: #2563eb;
    
    /* Gradient */
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    background: radial-gradient(circle, #ff6b6b, #4ecdc4);
    
    /* Image */
    background-image: url('hero.jpg');
    background-size: cover;         /* Fill the entire element */
    background-position: center;    /* Center the image */
    background-repeat: no-repeat;   /* Don't tile */
    
    /* Combine image + overlay */
    background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
                url('hero.jpg') center/cover no-repeat;
}

/* Box shadows */
.card {
    box-shadow: 0 4px 6px rgba(0,0,0,0.07);              /* Subtle */
    box-shadow: 0 20px 60px rgba(0,0,0,0.15);             /* Dramatic */
    box-shadow: 0 0 0 3px #2563eb;                         /* Outline effect */
    box-shadow: 5px 5px 10px #bebebe, -5px -5px 10px #ffffff; /* Neumorphism */
}

/* Text shadows */
h1 {
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}
```

---

## Transitions & Animations

Make your UI feel alive with smooth transitions:

```css
/* Transition — smooth change from state A to state B */
.button {
    background: #2563eb;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
}

.button:hover {
    background: #1d4ed8;
    transform: translateY(-2px);      /* Float up slightly */
    box-shadow: 0 10px 25px rgba(37, 99, 235, 0.4);
}

.button:active {
    transform: translateY(0);         /* Press down effect */
}

/* Keyframe Animations — custom multi-step animations */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

.card {
    animation: fadeIn 0.5s ease forwards;
}

.badge {
    animation: pulse 2s ease-in-out infinite;
}
```

---

## Responsive Design with Media Queries

Make your site look great on all screen sizes:

```css
/* Mobile-first approach (start with small, add rules for larger) */

/* Base styles (for all screens, especially mobile) */
.container {
    width: 100%;
    padding: 0 16px;
}

.grid {
    display: grid;
    grid-template-columns: 1fr;  /* 1 column on mobile */
    gap: 16px;
}

/* Tablet and up (≥ 768px) */
@media (min-width: 768px) {
    .container {
        max-width: 720px;
        margin: 0 auto;
    }
    
    .grid {
        grid-template-columns: repeat(2, 1fr);  /* 2 columns */
        gap: 24px;
    }
}

/* Desktop and up (≥ 1024px) */
@media (min-width: 1024px) {
    .container {
        max-width: 1200px;
    }
    
    .grid {
        grid-template-columns: repeat(3, 1fr);  /* 3 columns */
        gap: 32px;
    }
}

/* Extra large screens (≥ 1440px) */
@media (min-width: 1440px) {
    .container {
        max-width: 1400px;
    }
}
```

---

## Summary Reference Sheet

| Property | What It Does | Example |
|----------|-------------|---------|
| `color` | Text color | `color: #2563eb` |
| `background` | Background color/gradient/image | `background: linear-gradient(...)` |
| `font-size` | Text size | `font-size: 1.5rem` |
| `font-weight` | Text boldness | `font-weight: 700` |
| `padding` | Space inside border | `padding: 16px 24px` |
| `margin` | Space outside border | `margin: 0 auto` |
| `border` | Element border | `border: 2px solid #ccc` |
| `border-radius` | Rounded corners | `border-radius: 8px` |
| `width / height` | Element dimensions | `width: 100%` |
| `display` | Layout type | `display: flex` |
| `position` | Positioning method | `position: relative` |
| `box-shadow` | Drop shadow | `box-shadow: 0 4px 12px rgba(0,0,0,0.1)` |
| `transition` | Smooth state changes | `transition: all 0.3s ease` |
| `opacity` | Transparency (0-1) | `opacity: 0.5` |
| `overflow` | Content overflow handling | `overflow: hidden` |

---

## What's Next?

Excellent work! You've learned the core principles of CSS3. In Module 2, we'll go much deeper into two of the most important layout systems in modern web development: **Flexbox** and **CSS Grid** — the tools you'll use every single day as a developer to build complex, responsive page layouts.

> 💡 **Practice Challenge:** Take the HTML page you built in Lesson 2 and apply CSS to it. Try to style the header, add colors, use proper typography with a Google Font, add hover effects to buttons and links, and make at least one section use a gradient background. Don't copy — experiment and discover!
