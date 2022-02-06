module.exports = {
  eleventyComputed: {
    title: data => `${data.page.fileSlug}`,
    when: data => `Updated on ${data.date}`,
    permalink: data => `/content-updates/${data.page.fileSlug}/index.html`
  }
}