let words = [];

// Dark Mode / Light Mode

const darkIcon = document.querySelector(".dark-icon");
const lightIcon = document.querySelector(".light-icon");
const playAudioEl2 = document.querySelector(".play-icon-2");
const buttonEl = document.querySelector(".btn");

darkIcon.addEventListener("click", () => {
  document.body.style.backgroundColor = "#171824";
  document.body.style.color = "white";
  darkIcon.style.display = "none";
  lightIcon.style.display = "block";
  buttonEl.style.backgroundColor = "white";
  buttonEl.style.color = "black";
  newWordInput.style.color = "black";
  inputSpellingEl.style.color = "black";
});

lightIcon.addEventListener("click", () => {
  document.body.style.backgroundColor = "white";
  document.body.style.color = "black";
  darkIcon.style.display = "block";
  lightIcon.style.display = "none";
  buttonEl.style.backgroundColor = "black";
  buttonEl.style.color = "white";
});

// Open & Close Sidebar

const arrowIcon = document.querySelector(".arrow");
const menuIcon = document.querySelector(".menu-icon");
const asideEl = document.getElementById("aside");

arrowIcon.addEventListener("click", () => {
  asideEl.style.display = "none";
  arrowIcon.style.display = "none";
  menuIcon.style.display = "block";
});

menuIcon.addEventListener("click", () => {
  asideEl.style.display = "block";
  arrowIcon.style.display = "block";
  menuIcon.style.display = "none";
});

// Adding New Words

const newWordInput = document.querySelector(".aside-input");
const newWordSubmit = document.querySelector(".aside-input-submit");
const ulEl = document.querySelector(".saved-words");
const listPlaceholder = document.querySelector(".list-placeholder");

function updatePlaceholder() {
  // Check if <ul> is empty and show/hide placeholder accordingly
  if (ulEl.children.length === 1) {
    listPlaceholder.style.display = "block";
  } else {
    listPlaceholder.style.display = "none";
  }
}

// Adding New Words
newWordSubmit.addEventListener("click", function addNewWord() {
  let newWord = newWordInput.value.trim();
  if (newWord !== "") {
    words.push(newWord.toLowerCase());
    localStorage.setItem("words", JSON.stringify(words));

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

    updatePlaceholder();
  }
});

// Saving/Deleting Words To Local Storage

const deleteIcon = document.querySelector(".delete-icon");

// Load and Display Saved Words from Local Storage
document.addEventListener("DOMContentLoaded", () => {
  const savedWords = localStorage.getItem("words");

  if (savedWords) {
    words = JSON.parse(savedWords);

    words.forEach((word) => {
      const newListItemHTML = `
          <li class="saved-word">
            ${word}
            <button class="delete-word">
              <img class="delete-icon" src="assets/icons8-garbage-24.png" alt="garbage" width="15" />
            </button>
          </li>
        `;
      ulEl.insertAdjacentHTML("beforeend", newListItemHTML);
    });

    updatePlaceholder();
  }
});

// Delete Saved Word with Proper Event Delegation
ulEl.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-icon")) {
    // Get the parent <li> element
    const listItem = event.target.closest(".saved-word");
    if (listItem) {
      // Remove the word from the words array
      const wordText = listItem.textContent.trim().split(" ")[0].toLowerCase();
      words = words.filter((word) => word !== wordText);

      // Remove the <li> element from the DOM
      listItem.remove();

      // Update local storage after deletion
      localStorage.setItem("words", JSON.stringify(words));

      updatePlaceholder();
    }
  }
});

updatePlaceholder();

// Text To Speech

const playAudioEl = document.querySelector(".play-icon");
const playAudioDiv = document.querySelector(".audio");

let randomWord = ""; // Declare randomWord in a scope where it persists

playAudioDiv.addEventListener("click", () => {
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

const correctAudio = new Audio("assets/ding.mp3");
const incorrectAudio = new Audio("assets/wrong.mp3");

correctAudio.volume = 0.2;
incorrectAudio.volume = 0.2;

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

    correctAudio.play();

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

    incorrectAudio.play();

    setTimeout(() => {
      correctSpelling.style.display = "none";
    }, 5000);
    setTimeout(() => {
      incorrectText.style.display = "none";
    }, 5000);
  }
});

inputSpellingEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    // Trigger the click event on the button to reuse the logic
    inputSpellingBtn.click();
  }
});
