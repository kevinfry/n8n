# n8n

Kevin Fry's n8n development. Hint's and tricks into developing automated workflows.

[Hostinger](https://hostinger.com?REFERRALCODE=B1QKEVINJ4EM) - Create your own automated workflows.

## Command

[Day of Year](cmd/dates.sh) - Just returns the day of year (1-366). Useful for daily newsletters when you have a file 267 lines.

## HTML

[newsletter](html/newsletter.html)

## Javascript

[keywords](js/keywords.js) - Extracts the top keywords from text.

[markdownToHtml](js/markdownToHtml.js) - AI will often output in `md` or Markdown format for things like GitHub. Converts the output to HTML format, perfect for websites or emails.

[slugify](js/slugify.js) - A title if a document is great, `slugify` is even better. Perfect for creating files, based on the title. `the-perfect-document-title.html` is very easy saving to a file. Very SEO friendly.

## Markdown

[Action Figure](md/action-figure.md) - Action figure text to OpenAI's image generator. Upload and image of yourself and customize the prompt to suite your needs.

[Enhanced Digital Transformation Guide](md/enhanced_digital_transformation_guide.md)

[Midjourney Guide](md/midjourney-guide.md) - This is what was used to create the `robot-image-prompts.md`. Use this guide in accordance with your business to create 366+ image prompts. This was scraped from [Midjourney's](https://www.midjourney.com/) documentation site to create the prompts.

[Robot Image Prompts](md/robot-image-prompts.md) - Like in getting the day of year, of a filename, remember, day of year is 1, line 1 is array 0. If seperating from new lines `\n`, lines start at 0, so if going by day of year, January 1st is 1. Line 1 is the second line. So a file must 367 lines in order to pull in a result every day.

## Prompts

### System messages

#### Weather

[Weather System](prompts/weather-system.md) - A date/time fix for working with time-specific API's for your local area.

---

[BotAdmins](https://botadmins.com/?ref=github)