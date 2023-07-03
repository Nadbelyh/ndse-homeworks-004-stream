const fs = require("fs");
const readline = require("readline");
const path = require("path");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function logResult(result, logFile) {
  fs.appendFileSync(logFile, `${result}\n`, "utf8");
}

function playGame(logFile) {
  rl.question("Введите число: 0 - орёл, 1 - решка: ", (number) => {
    const selectedNumber = parseInt(number);

    if (
      isNaN(selectedNumber) ||
      (selectedNumber !== 0 && selectedNumber !== 1)
    ) {
      console.log("Пожалуйста, введите 0 или 1.");
      playGame(logFile);
    } else {
      const randomNubmer = Math.round(Math.random());
      const resultText =
        selectedNumber === randomNubmer ? "Верно!" : "Вы не угадали.";

      console.log(`Результат: ${resultText}`);
      logResult(resultText, logFile);

      rl.question("Еще игра? (y/n): ", (playAgain) => {
        if (playAgain.toLowerCase() === "y") {
          playGame(logFile);
        } else {
          rl.close();
        }
      });
    }
  });
}

const logFileName = path.join(__dirname, "log.txt");
console.log(`Результаты игры будут сохранены в файле: ${logFileName}`);

fs.writeFileSync(logFileName, "", "utf8");

playGame(logFileName);
