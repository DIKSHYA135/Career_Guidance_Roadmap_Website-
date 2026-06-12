# Introduction to HTML5

HTML (HyperText Markup Language) is the **skeleton of every web page**. It provides the structure and content that browsers display.

## What is HTML?
HTML is not a programming language — it is a **markup language**. You use special tags to tell the browser what each piece of content is.

```html
<h1>This is a heading</h1>
<p>This is a paragraph of text.</p>
<img src="photo.jpg" alt="A beautiful photo">
<a href="https://google.com">Click to visit Google</a>
```

## The HTML Document Structure
Every valid HTML page has this basic structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>Welcome to my website!</p>
</body>
</html>
```

**Breaking it down:**
- `<!DOCTYPE html>` — Tells the browser this is an HTML5 document.
- `<html>` — The root element that wraps everything.
- `<head>` — Contains meta-information (title, charset, links to CSS). Not visible to users.
- `<body>` — Contains all visible content.

## Essential HTML Tags

### Headings
```html
<h1>Most Important Heading</h1>
<h2>Second Level</h2>
<h3>Third Level</h3>
<!-- h4, h5, h6 exist too -->
```

### Paragraphs & Text Formatting
```html
<p>This is a paragraph.</p>
<strong>Bold text</strong>
<em>Italic text</em>
<br>  <!-- Line break -->
```

### Links
```html
<a href="https://example.com">Visit Example</a>
<a href="about.html">Go to About Page</a>  <!-- Relative link -->
```

### Images
```html
<img src="cat.jpg" alt="A cute cat" width="300">
```
The `alt` attribute is important for accessibility and SEO.

### Lists
```html
<!-- Unordered List -->
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ul>

<!-- Ordered List -->
<ol>
    <li>Step 1: Learn HTML</li>
    <li>Step 2: Learn CSS</li>
    <li>Step 3: Build a project</li>
</ol>
```

### Semantic HTML5 Elements
HTML5 introduced **semantic tags** — elements that describe their meaning:

```html
<header>   <!-- Top of the page or section -->
<nav>      <!-- Navigation links -->
<main>     <!-- Primary content area -->
<section>  <!-- A distinct section of content -->
<article>  <!-- Self-contained content like a blog post -->
<aside>    <!-- Sidebar content -->
<footer>   <!-- Bottom of the page -->
```

Using semantic HTML is better for SEO and accessibility than using `<div>` everywhere.

## Summary
HTML is the foundation of all web pages. You use tags to structure your content, and the browser interprets those tags to render a visual page. Master these core tags and you're ready to start styling with CSS!