const fs = require("fs");
const path = require("path");
const { glob } = require("glob");

// Функция для рекурсивного поиска файлов
async function findFiles(dir, pattern) {
  return await glob(pattern, { cwd: dir, absolute: true });
}

// Функция для исправления переносов строк
function fixLineBreaks(filePath) {
  try {
    // Читаем файл
    const content = fs.readFileSync(filePath, "utf8");

    // Заменяем CRLF на LF
    const fixedContent = content.replace(/\r\n/g, "\n");

    // Записываем исправленный контент обратно в файл
    fs.writeFileSync(filePath, fixedContent, "utf8");

    console.log(`Fixed line breaks in: ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

// Основная функция
async function main() {
  try {
    // Находим все JavaScript файлы
    const jsFiles = await findFiles(process.cwd(), "src/_scripts/**/*.js");

    // Исправляем переносы строк в каждом файле
    jsFiles.forEach(fixLineBreaks);

    console.log("Line break fixes completed!");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

// Запускаем скрипт
main();
