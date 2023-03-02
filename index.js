// Flash Card Project

//DOM Variables
const flashCardForm = document.getElementById("flashCardForm");
const flashCardTitle = document.getElementById("flashCardTitle");
const flashCardDesc = document.getElementById("flashCardDesc");
const flashCardSubmitBtn = document.getElementById("flashCardSubmitBtn");
const DOMflashCardsContainer = document.getElementById("flashCards");
const modalContainer = document.querySelector(".flash-card-modal-container");

let flashCardsList = [];
let flashCardId = 0;

function emptyFrom() {
  flashCardTitle.value = "";
  flashCardDesc.value = "";
}

function focusForm() {
  flashCardTitle.focus();
}

function updateDOMwithFlashCards() {
  let flashCard = flashCardsList.map((flashCard) => {
    return (
      `<li class="flash-card flex-col" onClick="updateModalFlashCard(${flashCard.id})">
        <div class = "flash-card-header flex-row">
          <h3 class="flash-card-title">${flashCard.title}</h3>
          <button class="deleteTrashIcon" onClick="deleteFlashCards(${flashCard.id})">
            <svg fill="#fff" width="20" height="20">
              <use xlink:href="#deleteTrash" />
            </svg>
          </button>
        </div>
        <div class= "flash-card-body">
          <p class= "flash-card-desc">${flashCard.description}</p>
        </div>
      </li>`
    )
  }).join("");

  DOMflashCardsContainer.innerHTML = flashCard;
  addEventListenerToFlashCards();
}

function makeFlashCards(e) {
  e.preventDefault();
  flashCardId++;
  const flashCardTitleVal = flashCardTitle.value;
  const flashCardDescVal = flashCardDesc.value;

  let flashCardObj = {
    title: flashCardTitleVal,
    description: flashCardDescVal,
    id: flashCardId,
  };

  flashCardsList.push(flashCardObj);
  updateDOMwithFlashCards();
  emptyFrom();
  focusForm();
}


function deleteFlashCards(flashCardID) {
  const flashCardToDelete = flashCardsList.findIndex(flashCard => flashCard.id === flashCardID);

  flashCardsList.splice(flashCardToDelete, 1);

  updateDOMwithFlashCards();

}

function addEventListenerToFlashCards() {
  const DOMflashCards = document.querySelectorAll(".flash-card");
  DOMflashCards.forEach(flashCard => {
    flashCard.addEventListener("click", showModal);
  })
}

function showModal() {
  modalContainer.classList.add("show-modal");
}

function updateModalFlashCard(flashCardID) {
  const flashCardToShow = flashCardsList.find(flashCard => flashCard.id === flashCardID);
  modalContainer.innerHTML = (
    `
      <div class="flash-card-modal flex-col">
        <h3 class="flash-card-modal-title">${flashCardToShow.title}</h3>
        <p class="flash-card-modal-desc">${flashCardToShow.description}</p>
        <button class="modal-delete-btn">Delete</button>
      </div> 
    `
  )

}

window.onclick = function (event) {
  if (event.target == modalContainer) {
    modalContainer.classList.remove("show-modal")
  }
}

flashCardForm.addEventListener("submit", makeFlashCards);
