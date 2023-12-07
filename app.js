const cookie = document.getElementById("theCookie");
const howManyCookies = document.getElementById("numberOfCookies");
const howFastCookies = document.getElementById("cookiesPerSecond");

//variables for basic functionalities
let cookieCounter = 0;
let cps = 1;

//progress values
// const hoardedCookies = Number(localStorage.getItem("hoardedCookies"));
// const gain$ = Number(localStorage.getItem("gainS"));

//Cookie clicked event listnener
cookie.addEventListener("click", function () {
  updateCookies(1);
});

//function updating the cookies count and cps by a given value
function updateCookies(byHowMany) {
  cookieCounter += byHowMany;
  const howManyCookies = document.getElementById("numberOfCookies");
  const howFastCookies = document.getElementById("cookiesPerSecond");
  howManyCookies.textContent = cookieCounter;
  howFastCookies.textContent = `${cps} cps`;
  saveProgress();
}

//Add cookies with time
setInterval(function () {
  updateCookies(cps);
}, 1000);

const granny = 1;

function upgradePurchased(upgrade) {
  cps += upgrade;
}

//Save values to restore at the next session (simple way)
// function saveProgress() {
//   localStorage.setItem("hoardedCookies", cookieCounter);
//   localStorage.setItem("gain$", cps);
// }

//save values using JSON.stringify
function saveProgress() {
  const progress = {
    cookieCounter,
    cps,
  };
  localStorage.setItem("progress", JSON.stringify(progress));
}

//Retrieve saved values into corresponding variables ***************************UNCOMMENT THIS ONE LATER

// function loadProgress() {
//   const progress = JSON.parse(localStorage.getItem("progress"));
//   if (progress) {
//     cookieCounter = progress.cookieCounter;
//     cps = progress.cps;
//     howManyCookies.textContent = progress.howManyCookies;
//     howFastCookies.textContent = progress.howFastCookies;
//   }
// }

// loadProgress();

//attempl to clear preferences

// function clearPreferences(event) {
//   event.preventDefault();

//   localStorage.removeItem("progress");
// }
// if (hoardedCookies) {
//   cookieCounter = hoardedCookies;
//   cps = gain$;
// }

//Make progress to be saved a com[lex object
