let words = [];

// Adding New Words

const newWordInput = document.querySelector(".aside-input");
const newWordSubmit = document.querySelector(".aside-input-submit");
const ulEl = document.querySelector(".saved-words");

newWordSubmit.addEventListener("click", function addNewWord() {
  let newWord = newWordInput.value.trim();
  words.push(newWord.toLowerCase());
  if (newWord !== "") {
    // Only proceed if the input is not empty
    // Create the HTML string for the new list item
    const newListItemHTML = `
        <li class="saved-word">
          ${newWord}
          <button class="delete-word">
            <img class="delete-icon" src="assets/icons8-garbage-24.png" alt="garbage" width="15" />
          </button>
        </li>
      `;

    // Insert the new HTML into the <ul> element
    ulEl.insertAdjacentHTML("beforeend", newListItemHTML);

    // Clear the input field after adding the new word
    newWordInput.value = "";
    console.log(words);
  }
});

// Text To Speech

const playAudioEl = document.querySelector(".play-icon");

let randomWord = ""; // Declare randomWord in a scope where it persists

playAudioEl.addEventListener("click", () => {
  let randomIdx = Math.floor(Math.random() * words.length);
  randomWord = words[randomIdx];
  let msg = new SpeechSynthesisUtterance();
  msg.text = randomWord;
  window.speechSynthesis.speak(msg);
});

// Check if word was spelt correct or incorrect and display

const inputSpellingEl = document.querySelector(".input-spelling");
const inputSpellingBtn = document.querySelector(".input-spelling-btn");

const correctText = document.querySelector(".correct-text");
const incorrectText = document.querySelector(".incorrect-text");

const correctCounter = document.querySelector(".correct-counter-count");
const incorrectCounter = document.querySelector(".incorrect-counter-count");

const correctSpelling = document.querySelector(".incorrect-correct-spelling");

let correctCount = 0;
let incorrectCount = 0;

inputSpellingBtn.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent form submission refresh

  let mySpelling = inputSpellingEl.value.toLowerCase().trim();

  if (mySpelling === randomWord) {
    correctText.textContent = `"${inputSpellingEl.value}" is Correct ✔️`;
    correctText.style.display = "block";
    incorrectText.style.display = "none"; // Hide incorrect message
    inputSpellingEl.value = "";
    correctCount++;
    correctCounter.textContent = correctCount;
    setTimeout(() => {
      correctText.style.display = "none";
    }, 3000);
  }
  //
  else {
    incorrectText.textContent = `"${inputSpellingEl.value}" is Incorrect ❌`;
    correctText.style.display = "none"; // Hide correct message
    incorrectText.style.display = "block";
    inputSpellingEl.value = "";
    incorrectCount++;
    incorrectCounter.textContent = incorrectCount;
    correctSpelling.style.display = "block";
    correctSpelling.textContent = `${randomWord} is the correct spelling.`;
    setTimeout(() => {
      correctSpelling.style.display = "none";
    }, 5000);
    setTimeout(() => {
      incorrectText.style.display = "none";
    }, 5000);
  }
});
