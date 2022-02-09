const section = document.querySelector("section");
const template = document.querySelector("template").content;
const header = document.querySelector("h1");

const url = "https://babushka-dd8a.restdb.io/rest/menu";

const options = {
  headers: {
    "x-apikey": "600ec2fb1346a1524ff12de4",
  },
};

document.addEventListener("DOMContentLoaded", start);
let kategori;
let filter = "alle";
let menu;
function start() {
  // alle knapperne
  const filterKnapper = document.querySelectorAll("nav button");
  // looper, der er eventlistener på hver knap
  filterKnapper.forEach((knap) =>
    knap.addEventListener("click", filtrerKategori)
  );
  hentData();
}

function filtrerKategori() {
  filter = this.dataset.kategori;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");

  // overskrifter skifter mellem kategorierne
  header.textContent = this.textContent;
  vis();
}

async function hentData() {
  const resspons = await fetch(url, options);
  //   console.log(resspons);
  menu = await resspons.json();
  vis();
}

function vis() {
  console.log(menu);
  section.textContent = "";

  menu.forEach((menu) => {
    if (filter == menu.kategori || filter == "alle") {
      const klon = template.cloneNode(true);
      klon.querySelector("h2").textContent = menu.navn;
      klon.querySelector(".info").textContent = menu.kortbeskrivelse;
      klon.querySelector(".pris").textContent = menu.pris + " kr";

      klon.querySelector("img").src = "/medium/" + menu.billednavn + "-md.jpg";
      // laver en anonym funktion ()=> som kan kalde en ny fuktion nedeudner - så kommer dataten (JSON) med ned i funktionen
      klon
        .querySelector("article")
        .addEventListener("click", () => visDetaljer(menu));

      section.appendChild(klon);
    }
  });
}

// single view window
function visDetaljer(menu) {
  console.log("visDetaljer", menu);
  modal.querySelector("h2").textContent = menu.navn;
  modal.querySelector("img").src = "medium/" + menu.billednavn + "-md.jpg";
  modal.querySelector(".info").textContent = menu.langbeskrivelse;
  modal.querySelector(".pris").textContent = menu.pris + " kr";
  modal.style.display = "block";
}

// når ma klikker igen fjerner den sig
modal.addEventListener("click", () => (modal.style.display = "none"));
