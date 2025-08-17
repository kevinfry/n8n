# n8n

Kevin Fry's n8n development. Hint's and tricks into developing automated workflows.

[Hostinger](https://hostinger.com?REFERRALCODE=B1QKEVINJ4EM) - Create your own automated workflows.

## Command

[Day of Year](cmd/dates.sh) - Just returns the day of year (1-366). Useful for daily newsletters when you have a file 267 lines.

```bash
#!/bin/bash

# day of the year (1-366)
date +%j
```

## HTML

[newsletter](html/newsletter.html)

## Javascript

[keywords](js/keywords.js) - Extracts the top keywords from text.

```javascript
function extractTopKeywords(html, options = {}) {
    const {
        maxKeywords = 10,
        minWordLength = 3,
        caseSensitive = false
    } = options;

    // Common stop words to ignore
    const stopWords = new Set([
        'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
        'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
        'to', 'was', 'will', 'with', 'would', 'you', 'your', 'this', 'they',
        'we', 'or', 'not', 'but', 'have', 'had', 'what', 'when', 'where',
        'who', 'which', 'why', 'how', 'all', 'any', 'both', 'each', 'few',
        'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'only', 'own',
        'same', 'so', 'than', 'too', 'very', 'can', 'will', 'just', 'should',
        'now', 'get', 'may', 'new', 'take', 'come', 'could', 'way', 'use',
        'her', 'many', 'them', 'these', 'two', 'been', 'call', 'first',
        'made', 'long', 'make', 'part', 'over', 'said', 'water', 'after',
        'back', 'little', 'only', 'round', 'man', 'year', 'came', 'show',
        's', 't', 'm', 'll', 've', 're', 'd', 'debellis', 'sons'
    ]);

    // Remove HTML tags and get text content
    const textContent = html.replace(/<[^>]*>/g, ' ');

    // Extract words and clean them
    const words = textContent
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ')     // Replace punctuation with spaces
        .split(/\s+/)                 // Split on whitespace
        .filter(word =>
            word.length >= minWordLength &&     // Minimum length
            !stopWords.has(word) &&             // Not a stop word
            !/^\d+$/.test(word)                 // Not just numbers
        );

    // Count word frequencies
    const wordCount = {};
    words.forEach(word => {
        const key = caseSensitive ? word : word.toLowerCase();
        wordCount[key] = (wordCount[key] || 0) + 1;
    });

    // Sort by frequency and return top keywords as a string
    return Object.entries(wordCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, maxKeywords)
        .map(([word]) => word)
        .join(', ');
}
```

[markdownToHtml](js/markdownToHtml.js) - AI will often output in `md` or Markdown format for things like GitHub. Converts the output to HTML format, perfect for websites or emails.

```javascript
function markdownToHtml(markdown) {
  let html = markdown;

  // Headers (h1-h6)
  html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");
  html = html.replace(/^#### (.*$)/gim, "<h4>$1</h4>");
  html = html.replace(/^##### (.*$)/gim, "<h5>$1</h5>");
  html = html.replace(/^###### (.*$)/gim, "<h6>$1</h6>");

  // Bold text
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__(.*?)__/g, "<strong>$1</strong>");

  // Italic text
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  html = html.replace(/_(.*?)_/g, "<em>$1</em>");

  // Strikethrough
  html = html.replace(/~~(.*?)~~/g, "<del>$1</del>");

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Code blocks
  html = html.replace(/```([^`]+)```/g, "<pre><code>$1</code></pre>");

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" />');

  // Horizontal rules
  html = html.replace(/^---$/gim, "<hr>");
  html = html.replace(/^\*\*\*$/gim, "<hr>");

  // Blockquotes
  html = html.replace(/^> (.*)$/gim, "<blockquote>$1</blockquote>");

  // Unordered lists
  html = html.replace(/^\* (.*)$/gim, "<li>$1</li>");
  html = html.replace(/^- (.*)$/gim, "<li>$1</li>");
  //html = html.replace(/^+ (.*)$/gim, '<li>$1</li>');

  // Ordered lists
  html = html.replace(/^\d+\. (.*)$/gim, "<li>$1</li>");

  // Wrap consecutive list items in ul/ol tags
  html = html.replace(/(<li>.*<\/li>)/s, function (match) {
    // Simple heuristic: if first li came from numbered list, use ol
    const lines = markdown.split("\n");
    let isOrdered = false;
    for (let line of lines) {
      if (line.match(/^\d+\./)) {
        isOrdered = true;
        break;
      }
      if (line.match(/^[\*\-+]/)) {
        break;
      }
    }
    return isOrdered ? `<ol>${match}</ol>` : `<ul>${match}</ul>`;
  });

  // Line breaks and paragraphs
  html = html.replace(/\n\n/g, "</p><p>");
  html = html.replace(/\n/g, "<br>");

  // Wrap in paragraph tags if not already wrapped in block elements
  if (!html.match(/^<(h[1-6]|p|div|ul|ol|blockquote|pre)/)) {
    html = "<p>" + html + "</p>";
  }

  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/g, "");
  html = html.replace(/<p>(<h[1-6]>.*<\/h[1-6]>)<\/p>/g, "$1");
  html = html.replace(/<p>(<hr>)<\/p>/g, "$1");
  html = html.replace(/<p>(<blockquote>.*<\/blockquote>)<\/p>/g, "$1");
  html = html.replace(/<p>(<[uo]l>.*<\/[uo]l>)<\/p>/g, "$1");
  html = html.replace(/<p>(<pre>.*<\/pre>)<\/p>/g, "$1");

  return html;
}

const htmlOutput = markdownToHtml($("AI Agent").first().json.output);

const weather = markdownToHtml($("AI Forecast").first().json.output);

const funko = markdownToHtml($input.first().json.output);

return {
  today: {
    doy: $("Execute Command").first().json.stdout,
    joke: $("jokeOfTheDay").first().json.stdout,
    prompt: $("promptOfTheDay").first().json.stdout,
    funkoNew: funko,
    aiResp: $("AI Agent").first().json.output,
    aiRespHTML: htmlOutput,
    forecast: weather,
    imgPrompt: $("imagePrompt").first().json.stdout,
    imgURL:
      "http://botadmins.com/img/ai/" +
      $("Execute Command").first().json.stdout +
      ".png",
  },
};

```

[slugify](js/slugify.js) - A title if a document is great, `slugify` is even better. Perfect for creating files, based on the title. `the-perfect-document-title.html` is very easy saving to a file. Very SEO friendly.

```javascript
function slugify(text) {
    return text
        .toLowerCase()                    // Convert to lowercase
        .trim()                          // Remove leading/trailing whitespace
        .replace(/[^\w\s-]/g, '')        // Remove special characters except word chars, spaces, and hyphens
        .replace(/[\s_-]+/g, '-')        // Replace spaces, underscores, and multiple hyphens with single hyphen
        .replace(/^-+|-+$/g, '');        // Remove leading and trailing hyphens
}
```

## Markdown

[Action Figure](md/action-figure.md) - Action figure text to OpenAI's image generator. Upload and image of yourself and customize the prompt to suite your needs.

```text
Draw an action figure toy (gi joe type) of the person in this photo. The figure should be full figure and displayed in its original blister pack packaging. On top of the box is the name of the toy "Senior Developer" with a headline of "Code Reviews" across a single line of text. In the blister pack packaging, next to the figure show the toy's accessories including a laptop, cell phone, coffee, earbuds, a tv, and three screens.
```

[Enhanced Digital Transformation Guide](md/enhanced_digital_transformation_guide.md) - A small business guide to surviving in the year 2025 digitally.

[Midjourney Guide](md/midjourney-guide.md) - This is what was used to create the `robot-image-prompts.md`. Use this guide in accordance with your business to create 366+ image prompts. This was scraped from [Midjourney's](https://www.midjourney.com/) documentation site to create the prompts.

[Robot Image Prompts](md/robot-image-prompts.md) - Like in getting the day of year, of a filename, remember, day of year is 1, line 1 is array 0. If seperating from new lines `\n`, lines start at 0, so if going by day of year, January 1st is 1. Line 1 is the second line. So a file must 367 lines in order to pull in a result every day.

## Prompts

### System messages

#### Weather

[Weather System](prompts/weather-system.md) - A date/time fix for working with time-specific API's for your local area.

```text
if asked for the time or need to provide any time information, the current date and time of the server is {{ $now }}, but the user time is assumed to be in the New York Timezone, EST or -14400, the timezone field in the json, use the time in the json as the user's time, but just give that information, not the reasoning. also if they ask for the time, assume the time in new york, unless they asked for weather in any other zip code, privide the time related to the latest pull of the json for that zip code
```

---

[BotAdmins](https://botadmins.com/?ref=github)