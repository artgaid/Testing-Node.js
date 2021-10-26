//Напишите программу для вывода в консоль простых чисел, чтобы они попадали в указанный диапазон включительно. При этом числа должны окрашиваться в цвета по принципу светофора:
// первое - зелёным;
// второе — жёлтым;
// третье — красным.
// Диапазон, куда попадут числа, указывается при запуске программы.
// Если простых чисел в диапазоне нет, нужно, чтобы программа сообщила об этом в терминале красным цветом.
// Если аргумент, переданный при запуске, не считается числом — сообщите об этом ошибкой и завершите программу.

const colors = require("colors");

const number1 = parseInt(process.argv[2]);
const number2 = parseInt(process.argv[3]);

var i = number1;
var mas = [];
var colorNumber = "green";

console.log(isNaN(number1), isNaN(number2));

if (isNaN(number1) || isNaN(number2)) {
  console.log(colors.red("Error: this is not a number"));
} else {
  while (i <= number2) {
    var n = 2;
    while (n <= i) {
      if (n == i) {
        mas.push(i);
      }
      n++;
      if (i % (n - 1) == 0) {
        break;
      }
    }
    i++;
  }
  if (mas.length) {
    for (let i = 0; i < mas.length; i++) {
      const el = mas[i];
      if (colorNumber === "green") {
        colorNumber = "yellow";
        console.log(colors.green(el));
      } else if (colorNumber === "yellow") {
        colorNumber = "red";
        console.log(colors.yellow(el));
      } else if (colorNumber === "red") {
        colorNumber = "green";
        console.log(colors.red(el));
      }
    }
  } else console.log(colors.red("Sorry, no simple numbers"));
}
