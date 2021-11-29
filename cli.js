// Создать программу - консольное приложение и добавьте следующие функции:
// *** Возможность передавать путь к директории в программу. Это актуально, когда вы не хотите покидать текущую директорию, но вам необходимо просмотреть файл, находящийся в другом месте;
// *** В содержимом директории переходить во вложенные каталоги;
// *** При чтении файлов искать в них заданную строку.

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const inquirer = require("inquirer");
var searchText = "";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("close", () => {
  console.log("Finished");
});

const question = async (query) =>
  new Promise((resolve) => rl.question(query, resolve));

(async () => {
  const pathToFile = await question("Please inter the path to the file: ");
  searchText = await question("Please inter the search text: ");
  navigation(pathToFile);
})();

// const executionDir = process.cwd(); // путь до текущего расположения
const isFile = (fileName) => fs.lstatSync(fileName).isFile(); // определяет это файл или папка с файлами // .filter(isFile)

const navigation = (p) => {
  const filesList = fs.readdirSync(p);

  inquirer
    .prompt([
      {
        name: "fileName",
        type: "list", // input, number, confirm, list, checkbox, password
        message: "Choose the file or folder to read",
        choices: filesList,
      },
    ])
    .then((answer) => answer.fileName)
    .then((fileName) => {
      // const fullPath = path.join(executionDir, fileName); // в текущей деректории
      const fullPath = path.resolve(p, fileName);
      if (isFile(fullPath)) {
        fs.readFile(fullPath, "utf-8", function (err, data) {
          if (err) throw err;
          if (data.includes(searchText)) {
            console.log(data);
          }
          console.log(
            "Text" + (data.includes(searchText) ? " " : " not ") + "found"
          );
        });
        rl.close();
      } else {
        navigation(fullPath);
      }
    });
};
