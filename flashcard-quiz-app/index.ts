interface FlashCard {
  questionText: string;
  questionAnswer: string;
}

class InvalidUserInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidUserInputError";
    Object.setPrototypeOf(this, InvalidUserInputError.prototype);
  }
}

const currentCards: FlashCard[] = [
  {
    questionText: "What is the capital of France?",
    questionAnswer: "Paris",
  },
  {
    questionText: "What is the largest planet in our solar system?",
    questionAnswer: "Jupiter",
  },
  {
    questionText: "What language is primarily used to structure web pages?",
    questionAnswer: "HTML",
  },
];

let currentCardIndex = 0;

const flashcard = document.getElementById("flashcard") as HTMLDivElement;
const questionText = document.getElementById(
  "questionText"
) as HTMLParagraphElement;
const questionAnswer = document.getElementById(
  "questionAnswer"
) as HTMLParagraphElement;

const deleteBtn = document.getElementById(
  "delete-btn"
) as HTMLButtonElement;

const entryForm = document.getElementById(
  "entry-form"
) as HTMLFormElement;

const frontText = document.getElementById(
  "front-text"
) as HTMLTextAreaElement;

const backText = document.getElementById(
  "back-text"
) as HTMLTextAreaElement;

const note = document.getElementById("note") as HTMLParagraphElement;
const allCards = document.getElementById("all-cards") as HTMLDivElement;

const cardList = document.createElement("div");
cardList.id = "card-list";
allCards.appendChild(cardList);

function displayCurrentCard(): void {
  flashcard.classList.remove("flipped");

  if (currentCards.length === 0) {
    questionText.textContent = "No flashcards available. Add a new card!";
    questionAnswer.textContent = "";
    questionText.hidden = false;
    questionAnswer.hidden = true;
    flashcard.setAttribute("aria-label", "No flashcards available.");
    deleteBtn.disabled = true;
    return;
  }

  deleteBtn.disabled = false;

  const card = currentCards[currentCardIndex];

  questionText.textContent = card.questionText;
  questionAnswer.textContent = card.questionAnswer;

  questionText.hidden = false;
  questionAnswer.hidden = true;

  flashcard.setAttribute(
    "aria-label",
    "Flashcard. Click to reveal the answer."
  );
}

function flipCard(): void {
  if (currentCards.length === 0) {
    return;
  }

  flashcard.classList.toggle("flipped");

  const isFlipped = flashcard.classList.contains("flipped");

  questionText.hidden = isFlipped;
  questionAnswer.hidden = !isFlipped;

  flashcard.setAttribute(
    "aria-label",
    isFlipped
      ? "Flashcard answer. Click to reveal the question."
      : "Flashcard. Click to reveal the answer."
  );
}

flashcard.addEventListener("click", flipCard);

flashcard.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    flipCard();
  }
});

function displayAllCards(): void {
  cardList.replaceChildren();

  currentCards.forEach((card, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = card.questionText;
    button.className =
      "bg-blue-500 w-[90%] rounded-xl hover:bg-blue-700";

    button.addEventListener("click", () => {
      currentCardIndex = index;
      displayCurrentCard();
    });

    cardList.appendChild(button);
  });
}

deleteBtn.addEventListener("click", () => {
  if (currentCards.length === 0) {
    return;
  }

  currentCards.splice(currentCardIndex, 1);

  if (currentCards.length === 0) {
    currentCardIndex = 0;
  } else if (currentCardIndex > 0) {
    currentCardIndex--;
  } else {
    currentCardIndex = 0;
  }

  displayCurrentCard();
  displayAllCards();
});

function createFlashCard(
  question: string,
  answer: string
): FlashCard {
  const trimmedQuestion = question.trim();
  const trimmedAnswer = answer.trim();

  if (trimmedQuestion === "" || trimmedAnswer === "") {
    throw new InvalidUserInputError(
      "Please enter both a question and an answer."
    );
  }

  return {
    questionText: trimmedQuestion,
    questionAnswer: trimmedAnswer,
  };
}

entryForm.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();
  note.textContent = "";

  try {
    const newCard = createFlashCard(frontText.value, backText.value);

    currentCards.push(newCard);
    currentCardIndex = currentCards.length - 1;

    frontText.value = "";
    backText.value = "";

    displayCurrentCard();
    displayAllCards();
  } catch (error: unknown) {
    if (error instanceof InvalidUserInputError) {
      note.textContent = error.message;
      return;
    }

    throw error;
  }
});

displayCurrentCard();
displayAllCards();
