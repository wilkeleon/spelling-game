let words = [];

// Adding New Words

const newWordInput = document.querySelector(".aside-input");
const newWordSubmit = document.querySelector(".aside-input-submit");
const ulEl = document.querySelector(".saved-words");

newWordSubmit.addEventListener("click", function addNewWord() {
  let newWord = newWordInput.value.trim();
  words.push(newWord);
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

playAudioEl.addEventListener("click", () => {
  let randomIdx = Math.floor(Math.random() * words.length);
  let randomWord = words[randomIdx];
  let msg = new SpeechSynthesisUtterance();
  msg.text = randomWord;
  window.speechSynthesis.speak(msg);
});
