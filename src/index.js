const cards = [
  { name: "aquaman", img: "aquaman.jpg" },
  { name: "batman", img: "batman.jpg" },
  { name: "captain america", img: "captain-america.jpg" },
  { name: "fantastic four", img: "fantastic-four.jpg" },
  { name: "flash", img: "flash.jpg" },
  { name: "green arrow", img: "green-arrow.jpg" },
  { name: "green lantern", img: "green-lantern.jpg" },
  { name: "ironman", img: "ironman.jpg" },
  { name: "spiderman", img: "spiderman.jpg" },
  { name: "superman", img: "superman.jpg" },
  { name: "the avengers", img: "the-avengers.jpg" },
  { name: "thor", img: "thor.jpg" },
  { name: "aquaman", img: "aquaman.jpg" },
  { name: "batman", img: "batman.jpg" },
  { name: "captain america", img: "captain-america.jpg" },
  { name: "fantastic four", img: "fantastic-four.jpg" },
  { name: "flash", img: "flash.jpg" },
  { name: "green arrow", img: "green-arrow.jpg" },
  { name: "green lantern", img: "green-lantern.jpg" },
  { name: "ironman", img: "ironman.jpg" },
  { name: "spiderman", img: "spiderman.jpg" },
  { name: "superman", img: "superman.jpg" },
  { name: "the avengers", img: "the-avengers.jpg" },
  { name: "thor", img: "thor.jpg" },
];

const memoryGame = new MemoryGame(cards, 16);

window.addEventListener("load", (event) => {
  let html = "";

  memoryGame.cards.forEach((card) => {
    html += `
      <div class="card" data-card-name="${card.name}">
        <div class="back" name="${card.img}"></div>
        <div class="front" style="background: url(img/${card.img}) no-repeat"></div>
      </div>
    `;
  });

  // loops of forEach

  /* 1. """ -->  "
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    "

    2. "
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    "
    -->
    "
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>

      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
      ...
    "
*/

  // Add all the divs to the HTML
  document.querySelector("#memory-board").innerHTML = html;

  // Bind the click event of each element to a function
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      // Esto es lo mismo que el toggle pero a la antigua usanza
      //
      // const hasTurnedClass = new Array(card.classList).includes("turned");
      // if (hasTurnedClass) {
      //   card.classList.remove("turned");
      // } else {
      //   card.classList.add("turned");
      // }

      card.classList.toggle("turned");

      memoryGame.pickedCards.push(card.dataset.cardName);

      // 2. Si hay 2 en pickedCards

      const allTurnedCards = document.querySelectorAll(".turned");

      if (memoryGame.pickedCards.length === 2) {
        const allCards = document.querySelectorAll(".card");

        allCards.forEach((card) => {
          card.classList.add("blocked");
        });

        const arePair = memoryGame.checkIfPair(
          memoryGame.pickedCards[0],
          memoryGame.pickedCards[1]
        );

        if (arePair) {
          allCards.forEach((card) => {
            card.classList.remove("blocked");
          });

          allTurnedCards.forEach((card) => {
            card.classList.add("guessed");
          });

          const isFinished = memoryGame.checkIfFinished();

          if (isFinished) {
            document.querySelector(
              "#memory-board"
            ).innerHTML = `<h1>Lucas has ganado y papa te quiere muchisimo tu puntuacion  es: ${memoryGame.pairsGuessed}</h1>`;
          }
        } else {
          setTimeout(() => {
            allTurnedCards.forEach((card) => {
              if (!card.classList.contains("guessed")) {
                card.classList.remove("turned");
              }
            });

            allCards.forEach((card) => {
              card.classList.remove("blocked");
            });
          }, 1000);
        }

        memoryGame.pickedCards = [];

        document.getElementById("pairs-clicked").textContent =
          memoryGame.pairsClicked;
        document.getElementById("pairs-guessed").textContent =
          memoryGame.pairsGuessed;
      }
    });
  });
});
