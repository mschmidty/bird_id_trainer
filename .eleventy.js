module.exports = function(eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    "md",
    "css",
    "html" // css is not yet a recognized template extension in Eleventy
  ]);
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("data");
  eleventyConfig.addPassthroughCopy("bird_songs_of_the_rockies");
  eleventyConfig.addPassthroughCopy("images");
  return{
    pathPrefix:'bird_id_trainer'
  };
};
