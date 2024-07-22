# Bookstore Guide

An API driven 11ty site with a built in Express server. Uses dotenv for environment variables. Uses GoatCounter for analytics. Templates and components in WebC. Zero Javascript is served to site visitors. There are additional codebases for the content API and a content management UI which are not public.

[Live site](https://bookstore.guide)

I am making this code public because while I was building, I had difficulty finding good examples of a few challenges I encountered.

**Dynamic generation of content from an API**
Which turns out to be pretty easy, once you understand the data cascade. See: `data/stores.js` used in `content/store/page_generator.webc`

**Dynamically generated permalinks in WebC**
Which appears to require JS frontmatter. See: `content/store/page_generator.webc`

**Built-in webserver for production**
I needed this for server-side analytics tracking. Added an Express server at the top level and used `express.static` to serve the files with a catch-all method to serve the 404 page. See: `index.js`

**Data and layouts not under content path**
Relative paths mean that these folders can live where you like, but this was not obvious from the documentation. See: `eleventy.config.js`

**Markdown in API content**
My site data may include Markdown in one field. While 11ty is great at converting Markdown files to HTML, I needed to expose access to the markdown-it library (already imported as a dependency by 11ty) for use in template functions. See: `eleventy.config.js` and `components/store-description.webc`
