const main = document.getElementById("root");
const heading = document.createElement("h2");
heading.innerHTML = "Hello wordle clone";
main.appendChild(heading);

let alert = document.createElement("div");

alert.classList.add("alerts");

let rows = 6;
let cols = 5;
let r = 0;
let c = 0;
let isGameOver = false;
let guessWordArray = [];
let attempts = [];

const wordBook = [
  "hello",
  "above",
  "below",
  "flask",
  "house",
  "taser",
  "cloth",
  "mouth",
  "apple",
  "flock",
];

let correctGuess = wordBook[Math.floor(Math.random() * wordBook.length)];
console.log(correctGuess);

const localStoredWords = JSON.parse(localStorage.getItem("guessedWords"));
if (localStoredWords) {
  guessWordArray = localStoredWords;
  attempts = localStoredWords;
}

buildGrid();

if (guessWordArray.length > 0) {
  r = r + guessWordArray.length;
  gedBgColor(r, c);
}

function buildGrid() {
  for (let i = 0; i < rows; i++) {
    let row = document.createElement("div");
    main.appendChild(row);
    row.classList.add("row");
    // window.localStorage.setItem("row", row[i]);

    for (let j = 0; j < cols; j++) {
      let column = document.createElement("div");
      row.appendChild(column);
      column.id = i.toString() + "-" + j.toString();
      column.textContent = guessWordArray[i] ? guessWordArray[i][j] : "";
      gedBgColor(i, j);
      column.classList.add("columns");
    }
  }

  document.addEventListener("keyup", (e) => {
    if (isGameOver) return;
    if ("KeyA" <= e.code && e.code <= "KeyZ") {
      if (c < cols) {
        let curCol = document.getElementById(r.toString() + "-" + c.toString());
        curCol.classList.add("active");
        curCol.style.color = "gray";
        if (curCol.innerText == "") {
          curCol.innerText = e.code[3];
          c += 1;
        }
      }
    } else if (e.code == "Backspace") {
      if (0 < c && c <= cols) {
        c -= 1;
      }
      let curCol = document.getElementById(r.toString() + "-" + c.toString());
      curCol.innerText = "";
      curCol.classList.remove("active");
    } else if (e.code == "Enter") {
      if (c === cols) {
        updateGrid();
        r += 1;
        c = 0;
      } else {
        alert.textContent = "Not enough letters";
        let curCol = document.getElementById(r.toString() + "-" + c.toString());
        curCol.classList.add("not-enough");
        main.prepend(alert);
        setTimeout(function () {
          alert.remove();
        }, 1000);
      }
    }
    if (!isGameOver && r == rows) {
      isGameOver = true;
      alert.innerHTML = `The right answer was ${correctGuess.toUpperCase()}`;
      main.prepend(alert);
    }
  });
}

function gedBgColor(i, j) {
  let curCol = document.getElementById(i.toString() + "-" + j.toString());
  const letter = curCol.textContent;

  if (attempts.length !== 0) {
    curCol.style.color = "white";
  }

  if (!letter) {
    curCol.style.backgroundColor = "transparent";
  } else if (correctGuess[j] == letter.toLowerCase()) {
    curCol.style.backgroundColor = "#6aaa64"; // in exact position
  } else if (correctGuess.includes(letter.toLocaleLowerCase())) {
    curCol.style.backgroundColor = "#c9b458";
  } else {
    curCol.style.backgroundColor = "#787c7e";
  }
}

function updateGrid() {
  let correct = 0;
  let localWord = "";
  for (let a = 0; a < cols; a++) {
    let curCol = document.getElementById(r.toString() + "-" + a.toString());
    curCol.classList.add("submit");
    let letter = curCol.innerText;
    curCol.style.color = "white";
    localWord += letter;

    gedBgColor(r, a);

    if (correct == cols) {
      isGameOver = true;
      alert.innerHTML = `Yhoo !! Congratulations! You got the right answer ${correctGuess.toUpperCase()}`;
      main.append(alert);
    }
  }

  guessWordArray.push(localWord);
  attempts.push(localWord);
  window.localStorage.setItem("guessedWords", JSON.stringify(guessWordArray));
}

// function updateGrid() {
//   for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < cols; j++) {}
//   }
// }

// function drawAttempt(el, letter) {
//   if (letter) {
//     el.innerHTML = letter;
//   } else {
//     el.innerHTML = "";
//   }
// }

// const keyPressed

// column.innerHTML = guessWord[i]
//   ? guessWord[i].charAt(j).toUpperCase()
//   : "";

// if (!guessWord || !guessWord[i]) {
//   column.style.backgroundColor = "transparent";
// } else {
//   if (correctGuess[j] === guessWord[i][j]) {
//     column.style.backgroundColor = "#6aaa64"; // in exact position
//   } else if (correctGuess.includes(guessWord[i][j])) {
//     column.style.backgroundColor = "#c9b458"; //possible word not at right position
//   } else {
//     column.style.backgroundColor = "#787c7e"; // un matched word
//   }
// }
