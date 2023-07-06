let buttonpressed = "";
let urlToSearch = null;

const getImage = function () {
  let urlImage1 = "https://api.pexels.com/v1/search?query=iceland";
  let urlImage2 = "https://api.pexels.com/v1/search?query=norway";
  let url = "https://api.pexels.com/v1/search?query=iceland";
  apiKey = "reIT898vbm2v5cPN4tcWCqi8GlU7YhiWGHzYsCVDo2CkwDtgh4eKuvWd";

  if (buttonpressed === "secondary") {
    url = urlImage2;
  }

  if (urlToSearch !== null) {
    url = "https://api.pexels.com/v1/search?query=";
    url = url + urlToSearch;
    console.log(url);
  }

  fetch(url, {
    headers: {
      Authorization: apiKey,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nella chiamata alle API");
      }
    })
    .then((data) => {
      console.log(data.photos);

      //------------------------------riferimento html elements------------------------------
      primaryButton = document.querySelector(".btn-primary"); //riferimento bottone rpimario
      secondaryButton = document.querySelector(".btn-secondary"); //riferimento bottone secondario
      allPlaceHolder = document.querySelectorAll(".bd-placeholder-img"); //riferimento tutti i placeholder
      allCards = document.querySelectorAll(".card"); //riferimento tutte le cards
      allCardsButtons = document.querySelectorAll("div.card-body button");
      allCardImgDiv = document.querySelectorAll(".card-img"); //tutti i div con le immagini nelle cards
      allSmall = document.querySelectorAll("small");
      formReference = document.querySelector("form");
      searchText = document.getElementById("search-text");
      //--------------------------------------------------------------------------------------






      //-------------------------------funzione inserimento img------------------------------
      const placeImg = function () {
        //ciclo tutti i placeholders
        allPlaceHolder.forEach((e) => {
          e.classList.add("d-none");
        });

        //tolgo evenutali immagini
        allCardImgDiv.forEach((e) => {
          e.classList.add("d-none");
        });

        //ciclo tutte le card e inserisoc le immagini
        for (let i = 0; i < allCards.length; i++) {
          let newDiv = document.createElement("div");
          newDiv.innerHTML = `
                <div class = "card-img"><img src=${data.photos[i].src.original}  width="100%" height="225"></div>
                `;
          allCards[i].prepend(newDiv);

          allSmall[i].innerText = data.photos[i].id; //cambio 9min con l'id dell'immagine
        }
      };
      //---------------------------------------------------------------------------------------








      //-------------------------------search form------------------------------
      formReference.addEventListener("submit", function (e) {
        e.preventDefault();
        urlToSearch = searchText.value;
        getImage();
      });

      //---------Inserisco immagini richieste
      if (urlToSearch !== null) {
        placeImg();
      }
      //---------------------------------------------------------------------------------------



      



      //-------------------------------cambio edit con hide------------------------------

      const editButtons = [];
      allCardsButtons.forEach((e, i) => {
        if (i % 2 !== 0) {
          editButtons.push(e);
        }
      });

      editButtons.forEach((e) => {
        e.innerText = "Hide";
      });

      //---------------------------------------------------------------------------------------






      //-------------------------------buttons pressed------------------------------
      //premo primary button
      primaryButton.addEventListener("click", () => {
        placeImg();
      });

      //premo secondary button
      secondaryButton.addEventListener("click", () => {
        buttonpressed = "secondary";
        getImage();
      });
      if (buttonpressed === "secondary") {
        placeImg();
      }

      //premo hide button
      editButtons.forEach((button) => {
        button.addEventListener("click", function (e) {
          console.log(e.target);
          e.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
        });
      });
      //---------------------------------------------------------------------------------------
    })
    .catch((err) => {
      console.log(err);
    });
};

getImage();
