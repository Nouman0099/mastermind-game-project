document.addEventListener("DOMContentLoaded", function () {
  const colors = ["red", "green", "blue", "yellow", "purple", "orange"];
  let code = [];
  let currentAttempt = new Array(4);
  const totalAttempts = 8;
  let currentRow;

  function generateCode() {
    code = [];
    for (let i = 0; i < 4; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      code.push(randomColor);
    }
    console.log("Generated code:", code);
  }

  function createBoard() {
    const board = document.getElementById("board");
    board.innerHTML = "";

    for (let i = 0; i < totalAttempts; i++) {
      let row = document.createElement("div");
      row.classList.add("flex", "justify-between", "space-x-3", "mb-4");
      row.dataset.rowIndex = i; // Order from top to bottom
      for (let j = 0; j < 4; j++) {
        let colorSlot = document.createElement("div");
        colorSlot.classList.add(
          "w-12",
          "h-12",
          "rounded-full",
          "cursor-pointer",
          "bg-blue-200"
        );
        colorSlot.addEventListener("click", () => selectColor(i, j));
        row.appendChild(colorSlot);
      }
      board.appendChild(row);
    }
  }

  function selectColor(rowIndex, slotIndex) {
    if (rowIndex !== currentRow) return;
    let color = prompt(
      "Please enter color [red, green, blue, yellow, purple, orange]"
    );
    if (colors.includes(color)) {
      const row = document.querySelector(`[data-row-index='${rowIndex}']`);
      const slots = row.children;
      slots[slotIndex].style.backgroundColor = color;
      currentAttempt[slotIndex] = color;
    } else {
      alert("Invalid color, Try again!");
    }
  }

  function submitGuess() {
    if (currentAttempt.length !== 4 || currentAttempt.includes(undefined)) {
      alert("Please fill all the color slots!");
      return;
    }

    const feedback = getFeedback(currentAttempt);
    if (feedback.correct === 4) {
      alert(
        `Congratulations! You've guessed the code in ${
          totalAttempts - currentRow
        } attempts`
      );
      startNewGame();
      return;
    } else {
      alert(
        `Feedback: ${feedback.correct} correct, ${feedback.misplaced} misplaced`
      );
    }

    if (currentRow === 0) {
      alert("Game Over! You've used all your chances.");
      startNewGame();
      return;
    }

    currentAttempt = new Array(4);
    currentRow--;
  }

  function getFeedback(guess) {
    let correct = 0;
    let misplaced = 0;
    let codeCopy = [...code];
    let guessCopy = [...guess];

    for (let i = 0; i < 4; i++) {
      if (guess[i] === code[i]) {
        correct++;
        guessCopy[i] = null;
        codeCopy[i] = null;
      }
    }

    for (let i = 0; i < 4; i++) {
      if (guessCopy[i] && codeCopy.includes(guessCopy[i])) {
        misplaced++;
        const index = codeCopy.indexOf(guessCopy[i]);
        codeCopy[index] = null;
      }
    }

    return { correct, misplaced };
  }

  function startNewGame() {
    currentRow = totalAttempts - 1; // Start at the bottom row
    currentAttempt = new Array(4);
    generateCode();
    createBoard();
  }

  document.getElementById("submitGuess").addEventListener("click", submitGuess);
  document.getElementById("newGame").addEventListener("click", startNewGame);

  startNewGame();
});
