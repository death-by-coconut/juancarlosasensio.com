const rssPlugin = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const fs = require('fs');

// Import filters
const dateFilter = require('./src/filters/date-filter.js');
const markdownFilter = require('./src/filters/markdown-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');
const onlyUniqueFilter = require('./src/filters/only-unique-filter.js');
const getUniqueTagsList = require('./src/filters/getUniqueTagsList.js');

// Import transforms
const htmlMinTransform = require('./src/transforms/html-min-transform.js');
const parseTransform = require('./src/transforms/parse-transform.js');

// Import data files
const site = require('./src/_data/site.json');

module.exports = function(config) {
  // Filters
  config.addFilter('dateFilter', dateFilter);
  config.addFilter('markdownFilter', markdownFilter);
  config.addFilter('w3DateFilter', w3DateFilter);
  config.addFilter("keys", obj => Object.keys(obj));
  config.addFilter("getUniqueTagsList", getUniqueTagsList);
  config.addFilter("onlyUniqueFilter", onlyUniqueFilter);

  // Layout aliases
  config.addLayoutAlias('home', 'layouts/home.njk');
  config.addLayoutAlias('demos', 'layouts/demos-base.njk')

  // Transforms
  config.addTransform('htmlmin', htmlMinTransform);
  config.addTransform('parse', parseTransform);

  // Passthrough copy
  config.addPassthroughCopy('src/fonts');
  config.addPassthroughCopy('src/images');
  config.addPassthroughCopy('src/js');
  config.addPassthroughCopy('src/admin/config.yml');
  config.addPassthroughCopy('src/admin/previews.js');
  config.addPassthroughCopy('node_modules/nunjucks/browser/nunjucks-slim.js');
  config.addPassthroughCopy('src/robots.txt');

  const now = new Date();

  //Get demos
  // const getDemos = (collectionApi) => {
  //   return [
  //     ...collectionApi.getFilteredByGlob('./src/demos/*.md')
  //   ].reverse();
  // }

  // const getDemosUniqueTags = (collectionApi) => {
  //   let tags = [];
  //   const demosCollection = getDemos(collectionApi);

  //   demosCollection.forEach(demo => {
  //     tags = [...tags, ...demo.data.tags]
  //   })
  //   return tags.filter(onlyUniqueFilter)
  // }
  

  // config.addCollection("tagList", require("./src/utils/getTagList.js"));

  /* TODO: in order to "fix" the bug of post-list.njk not working when adding the demoTags collection, I'm thinking of using a util function that can get me the unique tags for a specific collection, for example getTagListFor("demos") will return unique tags only for the "demos" collection.

  One idea is to add a function that uses a closure function to specifcy the collection ('demos') over another function that gets the unique tags. In this way, we could call getTagListFor('posts'), getTagListFor('demos') and so on...
  
  Useful links:
  https://www.markllobrera.com/posts/eleventy-tag-list-sorting-and-post-count/
  https://github.com/philhawksworth/hawksworx.com/blob/master/src/site/_filters/getTagList.js
  https://github.com/11ty/eleventy/pull/1060
  */
  // config.addNunjucksGlobal("getTagListFor", closureStyle = (arrow) => console.log(arrow))

  // Custom collections
  config.addCollection("allMyContent", function(collectionApi) {
    return collectionApi.getAll();
  });

  const livePosts = post => post.date <= now && !post.data.draft;
  
  config.addCollection('posts', collectionApi => {
    return [
      ...collectionApi.getFilteredByGlob('./src/posts/*.md').filter(livePosts)
    ].reverse();
  });


  config.addCollection('demos', collectionApi => {
    return [
      ...collectionApi.getFilteredByGlob('./src/demos/*.md')
    ].reverse();
  });

  // config.addCollection('demoTags', getDemosUniqueTags)

  config.addCollection('postFeed', collection => {
    return [...collection.getFilteredByGlob('./src/posts/*.md').filter(livePosts)]
      .reverse()
      .slice(0, site.maxPostsPerPage);
  });

  // Plugins
  config.addPlugin(rssPlugin);
  config.addPlugin(syntaxHighlight);
  
  /* Forestry instant previews 
  if( process.env.ELEVENTY_ENV == "staging" ) {
    eleventyConfig.setBrowserSyncConfig({
      host: "0.0.0.0"
    });
  }*/

  // 404
  config.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('dist/404.html');

        browserSync.addMiddleware('*', (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    passthroughFileCopy: true
  };
};
