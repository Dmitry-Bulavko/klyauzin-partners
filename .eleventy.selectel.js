module.exports = function (eleventyConfig) {
  // Копируем статические файлы
  eleventyConfig.addPassthroughCopy({
    "src/_images": "images",
    "src/_styles": "styles",
    "src/_scripts": "scripts",
    "src/favicon.ico": "favicon.ico",
    "src/robots.txt": "robots.txt",
    "src/sitemap.xml": "sitemap.xml",
    "src/_includes/icons": "icons",
    "src/_includes/components": "components",
  });

  // Копируем CSS файлы из компонентов
  eleventyConfig.addPassthroughCopy("src/**/*.css");

  // Настройки для Nunjucks
  eleventyConfig.setTemplateFormats(["njk", "md", "html", "svg", "css"]);

  // Добавляем фильтр для даты
  eleventyConfig.addFilter("date", function (date, format) {
    return new Date().getFullYear();
  });

  // Добавляем глобальные данные для Selectel
  eleventyConfig.addGlobalData("isProd", true);
  eleventyConfig.addGlobalData("baseUrl", process.env.BASE_URL || "");

  return {
    dir: {
      input: "src",
      output: "dist-selectel",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
    },
    templateFormats: ["md", "njk", "html", "svg", "css"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
}; 