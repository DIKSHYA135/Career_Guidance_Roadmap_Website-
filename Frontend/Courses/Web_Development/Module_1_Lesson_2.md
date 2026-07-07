# Introduction to HTML5

HTML (HyperText Markup Language) is the **skeleton of every web page**. It defines the structure and meaning of all the content you see — headings, paragraphs, images, forms, links, and more. Every website you have ever visited was built on HTML.

---

## What is HTML, Really?

HTML is **not** a programming language — it doesn't have logic, loops, or variables. It is a **markup language**: you wrap content in special **tags** to tell the browser what each piece of content *is* and how it should be structured.

The browser reads your HTML and creates a visual representation. Think of HTML as a blueprint — the CSS is the paint and decoration, and JavaScript is the electricity that makes it interactive.

```html
<!-- The browser sees tags and knows what to display -->
<h1>This is a main heading</h1>
<p>This is a paragraph of descriptive text.</p>
<img src="profile.jpg" alt="My profile picture">
<a href="https://google.com">Click here to visit Google</a>
```

---

## Anatomy of an HTML Tag

Most HTML elements follow this pattern:

```
<tagname attribute="value">Content goes here</tagname>
  │         │         │        │                │
  │         │         │        │                └── Closing tag
  │         │         │        └─────────────────── Visible content
  │         │         └──────────────────────────── Attribute value
  │         └────────────────────────────────────── Attribute name
  └──────────────────────────────────────────────── Opening tag
```

**Self-closing tags** (void elements) don't need a closing tag because they don't wrap content:
```html
<img src="cat.jpg" alt="A cat">
<br>          <!-- Line break -->
<input type="text">
<hr>          <!-- Horizontal rule -->
<meta charset="UTF-8">
```

---

## The HTML5 Document Structure

Every valid HTML5 page must have this structure. Without it, the browser may not render your page correctly:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="A page about web development">
    <title>My First Web Page</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Hello, World!</h1>
    <p>Welcome to my first web page!</p>
    <script src="app.js"></script>
</body>
</html>
```

**Line-by-line explanation:**
| Tag | Purpose |
|-----|---------|
| `<!DOCTYPE html>` | Tells the browser this is an HTML5 document (not HTML4 or XHTML) |
| `<html lang="en">` | Root element; `lang` helps screen readers and search engines |
| `<head>` | Container for metadata — NOT visible to users |
| `<meta charset="UTF-8">` | Specifies character encoding (supports all languages/emoji) |
| `<meta name="viewport" ...>` | Makes the page responsive on mobile devices |
| `<title>` | The text shown in the browser tab |
| `<link rel="stylesheet">` | Links an external CSS file |
| `<body>` | All VISIBLE content goes here |
| `<script src="...">` | Links JavaScript (typically at the bottom of body, not head) |

---

## Essential HTML Tags Reference

### Headings (h1 to h6)
There are six heading levels. `<h1>` is the most important — use it **once per page** for the main title. Never skip heading levels for styling purposes (use CSS for that).

```html
<h1>Main Page Title — Most Important</h1>
<h2>Major Section Heading</h2>
<h3>Subsection Heading</h3>
<h4>Minor Heading</h4>
<h5>Small Heading</h5>
<h6>Least Important Heading</h6>
```

### Text & Paragraphs
```html
<p>This is a paragraph. Browsers add space above and below paragraphs automatically.</p>

<strong>Bold — semantically important text</strong>
<b>Bold — purely visual, no semantic meaning</b>

<em>Italic — semantically emphasized text</em>
<i>Italic — visual only (used for icons, foreign phrases)</i>

<u>Underlined text</u>
<del>Struck-through / deleted text</del>
<mark>Highlighted text</mark>
<code>Inline code snippet</code>

<br>  <!-- Force a line break — use sparingly -->
<hr>  <!-- Horizontal dividing line -->
```

### Links (Anchor Tags)
The `<a>` tag is what makes the web a "web" — it connects pages together.

```html
<!-- External link (opens another website) -->
<a href="https://www.example.com">Visit Example.com</a>

<!-- Internal link (another page in your project) -->
<a href="about.html">About Us</a>

<!-- Anchor link (jumps to a section on the same page) -->
<a href="#contact">Jump to Contact Section</a>

<!-- Opens link in a new browser tab -->
<a href="https://google.com" target="_blank" rel="noopener noreferrer">Open in new tab</a>

<!-- Email link -->
<a href="mailto:hello@example.com">Email Us</a>
```

> **Important:** Always add `rel="noopener noreferrer"` with `target="_blank"` for security reasons.

### Images
```html
<!-- Basic image -->
<img src="photo.jpg" alt="Description of the image" width="400" height="300">

<!-- Responsive image from the web -->
<img src="https://picsum.photos/600/400" alt="A random placeholder photo">

<!-- Image with a link -->
<a href="gallery.html">
    <img src="thumb.jpg" alt="Click to see gallery">
</a>
```

**The `alt` attribute is NOT optional.** It:
- Helps visually impaired users (screen readers read the alt text aloud).
- Displays as text if the image fails to load.
- Helps search engines understand what the image is about (SEO).

### Lists
```html
<!-- Unordered (bulleted) list — for items without a specific order -->
<ul>
    <li>HTML — Structure</li>
    <li>CSS — Styling</li>
    <li>JavaScript — Interactivity</li>
</ul>

<!-- Ordered (numbered) list — for sequential steps -->
<ol>
    <li>Learn HTML basics</li>
    <li>Style with CSS</li>
    <li>Add interactivity with JavaScript</li>
    <li>Build your first project</li>
</ol>

<!-- Definition list — for terms and their definitions -->
<dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language — the structure of web pages.</dd>
    <dt>CSS</dt>
    <dd>Cascading Style Sheets — the visual design of web pages.</dd>
</dl>
```

### Tables
Tables are for **tabular data** (like spreadsheets), NOT for page layout.

```html
<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Score</th>
            <th>Grade</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Alice</td>
            <td>95</td>
            <td>A</td>
        </tr>
        <tr>
            <td>Bob</td>
            <td>82</td>
            <td>B</td>
        </tr>
    </tbody>
</table>
```

### Forms & Inputs
Forms let users input data and submit it to a server.

```html
<form action="/submit" method="POST">
    
    <!-- Text input -->
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" placeholder="Enter username" required>
    
    <!-- Email input (validates email format) -->
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    
    <!-- Password input (hides characters) -->
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" minlength="8" required>
    
    <!-- Number input -->
    <input type="number" min="1" max="100" value="25">
    
    <!-- Dropdown select -->
    <label for="career">Choose your path:</label>
    <select id="career" name="career">
        <option value="">-- Select --</option>
        <option value="web">Web Development</option>
        <option value="data">Data Science</option>
    </select>
    
    <!-- Textarea (multi-line text) -->
    <textarea name="message" rows="5" placeholder="Your message..."></textarea>
    
    <!-- Radio buttons (single choice from a group) -->
    <input type="radio" name="level" value="beginner" id="beg"> 
    <label for="beg">Beginner</label>
    <input type="radio" name="level" value="advanced" id="adv">
    <label for="adv">Advanced</label>
    
    <!-- Checkbox (multiple choices) -->
    <input type="checkbox" name="terms" id="terms" required>
    <label for="terms">I agree to the terms</label>
    
    <!-- Submit button -->
    <button type="submit">Create Account</button>
    <button type="reset">Clear Form</button>
    
</form>
```

> **Why `<label for="id">` matters:** When you click a label, it focuses its associated input. This is crucial for accessibility — screen readers and keyboard users depend on it.

---

## HTML5 Semantic Elements — Write Code That Means Something

HTML5 introduced **semantic elements**: tags that carry meaning about their content. Before HTML5, developers used `<div>` for everything. Now we have dedicated elements:

```html
<!DOCTYPE html>
<html lang="en">
<body>

    <header>
        <!-- Site logo, title, main nav -->
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <!-- Primary content — only ONE <main> per page -->
        
        <section>
            <!-- A thematically grouped section -->
            <h2>Latest Blog Posts</h2>
            
            <article>
                <!-- Self-contained, could be shared independently -->
                <h3>Getting Started with HTML</h3>
                <time datetime="2024-01-15">January 15, 2024</time>
                <p>In this post, we explore...</p>
            </article>
            
            <article>
                <h3>CSS Tips for Beginners</h3>
                <p>Learn how to style your pages...</p>
            </article>
        </section>
        
        <aside>
            <!-- Supplementary content — sidebar, related links -->
            <h3>Related Resources</h3>
            <ul>
                <li><a href="#">MDN Web Docs</a></li>
            </ul>
        </aside>
        
    </main>

    <footer>
        <!-- Copyright, links, contact info -->
        <p>&copy; 2024 My Website. All rights reserved.</p>
    </footer>

</body>
</html>
```

**Why use semantic HTML?**
- **SEO:** Search engines like Google better understand your content and rank it higher.
- **Accessibility:** Screen readers can navigate the page structure for visually impaired users.
- **Maintainability:** Other developers (and future you!) instantly understand what each section does.
- **Browser compatibility:** Browsers can apply default styles and behaviors more intelligently.

---

## HTML Attributes Deep Dive

Attributes provide additional information about elements. They are always placed in the **opening tag** as `name="value"` pairs.

```html
<!-- Common global attributes (work on any HTML element) -->
<div id="main-container">       <!-- Unique identifier -->
<p class="intro-text">          <!-- For CSS/JS targeting (can repeat) -->
<span title="More info">        <!-- Tooltip on hover -->
<p style="color: red;">         <!-- Inline CSS (avoid when possible) -->
<div hidden>                    <!-- Hides element completely -->
<input disabled>                <!-- Disables interaction -->
<p contenteditable="true">      <!-- Makes element editable -->
```

---

## Common Beginner Mistakes to Avoid

```html
<!-- ❌ WRONG: Using headings for visual sizing -->
<h3>I just want smaller text here</h3>

<!-- ✅ CORRECT: Use CSS for visual styling, headings for structure -->
<p style="font-size: 14px;">I just want smaller text here</p>

<!-- ❌ WRONG: Skipping alt text -->
<img src="photo.jpg">

<!-- ✅ CORRECT -->
<img src="photo.jpg" alt="A mountain landscape at sunset">

<!-- ❌ WRONG: Nesting block elements inside inline elements -->
<span><div>Don't do this</div></span>

<!-- ✅ CORRECT: Block inside block, or inline inside block -->
<div><span>This is fine</span></div>

<!-- ❌ WRONG: Using <br> for spacing -->
<p>First paragraph</p>
<br><br><br>
<p>Second paragraph</p>

<!-- ✅ CORRECT: Use CSS margin/padding for spacing -->
<p>First paragraph</p>
<p style="margin-top: 30px;">Second paragraph</p>
```

---

## Validate Your HTML

Always validate your HTML using the **W3C Validator**: [validator.w3.org](https://validator.w3.org/). It checks for errors like unclosed tags, invalid nesting, and missing required attributes.

---

## Summary

| Concept | Key Point |
|---------|-----------|
| **HTML** | Markup language that defines structure, not appearance |
| **Tags** | Wrapped around content: `<tag>content</tag>` |
| **Attributes** | Extra info inside opening tags: `<tag attr="value">` |
| **Document Structure** | `<!DOCTYPE>`, `<html>`, `<head>`, `<body>` |
| **Semantic HTML** | Use meaningful tags (`<article>`, `<nav>`) not just `<div>` |
| **Forms** | Collect user data with `<input>`, `<select>`, `<textarea>` |
| **Accessibility** | Always use `alt`, `label`, and semantic tags |

You now have a deep understanding of HTML5. In the next lesson, we'll bring your pages to life with CSS3!