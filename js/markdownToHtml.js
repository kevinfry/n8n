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
