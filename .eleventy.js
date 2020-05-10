module.exports = function(eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    "md",
    "html", 
    "css" // css is not yet a recognized template extension in Eleventy
  ])
  eleventyConfig.addPassthroughCopy([
    "js",
    "data",
    "bird_songs_of_the_rockies",
    "images"
  ])
  // eleventyConfig.addPassthroughCopy("js");
  // eleventyConfig.addPassthroughCopy("data");
  // eleventyConfig.addPassthroughCopy("bird_songs_of_the_rockies");
  // eleventyConfig.addPassthroughCopy("images");
  // eleventyConfig.addPassthroughCopy("css");
  return{
    pathPrefix:"/bird_id_trainer/",
  }
};
