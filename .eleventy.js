module.exports = function (eleventyConfig) {
  // Копируем статические файлы
  eleventyConfig.addPassthroughCopy({
    "src/images": "images",
    "src/styles": "styles",
    "src/scripts": "scripts",
    "src/favicon.ico": "favicon.ico",
    "src/robots.txt": "robots.txt",
    "src/sitemap.xml": "sitemap.xml",
  });

  // Настройки для Nunjucks
  eleventyConfig.setTemplateFormats(["njk", "md", "html"]);

  // Добавляем фильтр для даты
  eleventyConfig.addFilter("date", function (date, format) {
    return new Date().getFullYear();
  });

  // Добавляем глобальные данные
  eleventyConfig.addGlobalData("isProd", process.env.GITHUB_ACTIONS === "true");
  eleventyConfig.addGlobalData(
    "baseUrl",
    process.env.GITHUB_ACTIONS === "true" ? "/klyauzin-partners" : ""
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
