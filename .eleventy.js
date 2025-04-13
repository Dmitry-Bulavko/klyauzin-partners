const CleanCSS = require("clean-css");
const Terser = require("terser");

module.exports = function (eleventyConfig) {
  // Копируем статические файлы
  eleventyConfig.addPassthroughCopy("src/styles");
  eleventyConfig.addPassthroughCopy("src/scripts");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/sitemap.xml");

  // Минификация CSS
  eleventyConfig.addTemplateFormats("css");
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async function (inputContent) {
      return async function () {
        const minified = new CleanCSS().minify(inputContent);
        return minified.styles;
      };
    },
  });

  // Минификация JS
  eleventyConfig.addTemplateFormats("js");
  eleventyConfig.addExtension("js", {
    outputFileExtension: "js",
    compile: async function (inputContent) {
      return async function () {
        const minified = await Terser.minify(inputContent);
        return minified.code;
      };
    },
  });

  // Настройки для Nunjucks
  eleventyConfig.setTemplateFormats(["njk", "md", "html", "css", "js"]);

  // Добавляем глобальные данные для GitHub Pages
  eleventyConfig.addGlobalData("isProd", process.env.GITHUB_ACTIONS === "true");
  eleventyConfig.addGlobalData(
    "baseUrl",
    process.env.GITHUB_ACTIONS === "true"
      ? "/klyauzin-partners" // Замените на имя вашего репозитория
      : ""
  );

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};
