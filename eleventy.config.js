const markdownit = require('markdown-it');
const pluginWebc = require('@11ty/eleventy-plugin-webc');
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('./content/robots.txt');
  eleventyConfig.addPassthroughCopy('./content/favicon.ico');
  eleventyConfig.addPlugin(pluginWebc, {
    components: ['./components/**/*.webc']
  });
  eleventyConfig.addGlobalData('markdownit', (md) => markdownit(md));
  eleventyConfig.setUseGitIgnore(false);
  return {
    dir: {
      input: 'content',
      output: 'public',
      data: '../data',
      layouts: '../layouts'
    }
  };
};
