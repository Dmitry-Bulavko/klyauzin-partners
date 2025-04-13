const fs = require("fs");
const path = require("path");

// Функция для проверки существования директории
function checkDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.error(`❌ Директория ${dir} не существует`);
    return false;
  }
  console.log(`✅ Директория ${dir} существует`);
  return true;
}

// Функция для проверки существования файла
function checkFile(file) {
  if (!fs.existsSync(file)) {
    console.error(`❌ Файл ${file} не существует`);
    return false;
  }
  console.log(`✅ Файл ${file} существует`);
  return true;
}

// Проверяем основные директории
const distDir = path.join(__dirname, "dist");
const stylesDir = path.join(distDir, "styles");
const scriptsDir = path.join(distDir, "scripts");
const imagesDir = path.join(distDir, "images");
const includesDir = path.join(distDir, "_includes");
const layoutsDir = path.join(distDir, "_layouts");

// Проверяем основные файлы
const indexFile = path.join(distDir, "index.html");
const aboutFile = path.join(distDir, "about", "index.html");
const mainCssFile = path.join(stylesDir, "main.css");
const mainJsFile = path.join(scriptsDir, "main.js");
const logoFile = path.join(imagesDir, "logo.svg");
const sitemapFile = path.join(distDir, "sitemap.xml");
const robotsFile = path.join(distDir, "robots.txt");

console.log("Проверка структуры сборки:");
console.log("------------------------");

// Проверяем директории
const dirsExist =
  checkDirectory(distDir) &&
  checkDirectory(stylesDir) &&
  checkDirectory(scriptsDir) &&
  checkDirectory(imagesDir);

// Проверяем файлы
const filesExist =
  checkFile(indexFile) &&
  checkFile(aboutFile) &&
  checkFile(mainCssFile) &&
  checkFile(mainJsFile) &&
  checkFile(logoFile) &&
  checkFile(sitemapFile) &&
  checkFile(robotsFile);

if (dirsExist && filesExist) {
  console.log("------------------------");
  console.log(
    "✅ Сборка успешна! Все необходимые файлы и директории существуют."
  );
} else {
  console.log("------------------------");
  console.log(
    "❌ Сборка неполная. Некоторые файлы или директории отсутствуют."
  );
}
