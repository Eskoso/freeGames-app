// Api call show all--->
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "855c413c4cmshde43fb1cdd88bc3p18781djsn98fd95ea16d7",
    "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
  },
};

function searchGames() {
  let input = document.getElementById("search").value;
  input = input.toLowerCase();
  let x = document.getElementsByClassName("card");
  console.log(input);

  for (i = 0; i < x.length; i++) {
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
      x[i].style.display = "none";
    } else {
      x[i].style.display = "flex";
    }
  }
}

fetch("https://free-to-play-games-database.p.rapidapi.com/api/games", options)
  .then((response) => response.json())
  .then((data) => {
    let output = "";
    data.map((game) => {
      output += `
 	  <a href="${game.game_url}" target="_blank" class="card">
 	  	<img class="thumbnail" src=${game.thumbnail} alt="">
 	  	<h1 class="title">${game.title}</h1>
 	  	<p class="description">${game.short_description}</p>
 		  <p class="release_date">Published: ${game.release_date}</p>
 		  <p class="publisher">Game publisher: ${game.publisher}</p>
 		  <p class="developed">Developer: ${game.developer}</p>
 		  <p class="genre">Genre: ${game.genre}</p>
    </a>
 			`;
    });
    document.querySelector("#game-cards").innerHTML = output;
  })
  .catch((err) => console.error(err));

// <--- ending ^Api call show all^

// Api call when tagged --->
// selects all the tags
const tag = document.querySelectorAll(".tag");

const tagResults = (e) => {
  // taking the value of the #tags
  genre = e.target.value;
  console.log(e.target.value);

  fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${genre}`,
    options
  )
    .then((response) => response.json())
    // makes a card with a free game on it
    .then((data) => {
      let output = "";
      data.map((game) => {
        output += `
      <a href="${game.game_url}" class="card">
        <img class="thumbnail" src=${game.thumbnail} alt="">
        <h1 class="title">${game.title}</h1>
        <p class="description">${game.short_description}</p>
        <p class="release_date">Published: ${game.release_date}</p>
        <p class="publisher">Game publisher: ${game.publisher}</p>
        <p class="developed">Developer: ${game.developer}</p>
        <p class="genre">Genre: ${game.genre}</p>
      </a>
        `;
      });
      // then output prints on the screen
      document.querySelector("#game-cards").innerHTML = output;
    })

    .catch((err) => console.error(err));
};

// when a tag is clicked it retrive information from the variable "tagResults"
tag.forEach((tagName) => {
  tagName.addEventListener("click", tagResults);
});
// <--- ending ^Api call when tagged^

// const btn = document.getElementById("add-more")

// btn.addEventListener("click", callMoreCards)

// Scrollbar functionality --->
const tabsBox = document.querySelector(".tags-box"),
  allTabs = tabsBox.querySelectorAll(".tag"),
  arrowIcons = document.querySelectorAll(".icon i");

let isDragging = false;

const handleIcons = (scrollVal) => {
  let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
  arrowIcons[0].parentElement.style.display = scrollVal <= 0 ? "none" : "flex";
  arrowIcons[1].parentElement.style.display =
    maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    // if clicked icon is left, reduce 350 from tabsBox scrollLeft else add
    let scrollWidth = (tabsBox.scrollLeft += icon.id === "left" ? -340 : 340);
    handleIcons(scrollWidth);
  });
});

allTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabsBox.querySelector(".active")?.classList.remove("active");
    tab.classList.add("active");
  });
});

const dragging = (e) => {
  if (!isDragging) return;
  tabsBox.classList.add("dragging");
  tabsBox.scrollLeft -= e.movementX;
  handleIcons(tabsBox.scrollLeft);
};

const dragStop = () => {
  isDragging = false;
  tabsBox.classList.remove("dragging");
};

tabsBox.addEventListener("mousedown", () => (isDragging = true));
tabsBox.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
// <--- ending ^Scrollbar functionality^

// // darkmode toggle + localstorage --->
// let lightMode = localStorage.getItem("lightMode");
// const lightModeToggle = document.querySelector("#dark-mode-toggle");

// const enablelightMode = () => {
//   document.body.classList.add("lightMode");

//   localStorage.setItem("lightMode", "enabled");
// };

// const disablelightMode = () => {
//   document.body.classList.remove("lightMode");

//   localStorage.setItem("lightMode", null);
// };

// if (lightMode === "enabled") {
//   enablelightMode();
// }

// lightModeToggle.addEventListener("click", () => {
//   lightMode = localStorage.getItem("lightMode");
//   if (lightMode != "enabled") {
//     enablelightMode();
//   } else {
//     disablelightMode();
//   }
// });
// // <--- ending ^darkmode toggle + localstorage^

// scroll indicator (top) --->
window.onscroll = function () {
  scrollIndicator();
};

function scrollIndicator() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("scroll-indicator").style.width = scrolled + "%";
}
// <--- ending ^scroll indicator (top)^

/* hover cards light --->
 document.getElementById("game-cards").onmousemove = (e) => {
   for (const card of document.getElementsByClassName("card")) {
     const rect = card.getBoundingClientRect(),
       x = e.clientX - rect.left,
       y = e.clientY - rect.top;
     card.style.setProperty("--mouse-x", `${x}px`);
     card.style.setProperty("--mouse-y", `${y}px`);
   }
 };

<--- ending ^hover cards light^ */

