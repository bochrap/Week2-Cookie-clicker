const cookie = document.getElementById("theCookie");
const howManyCookies = document.getElementById("numberOfCookies");
const howFastCookies = document.getElementById("cookiesPerSecond");

//variables for basic functionalities
let cookieCounter = 0;
let cps = 1;
let clickValue = 1;

//Cookie clicked event listnener
cookie.addEventListener("click", function () {
  updateCookies(clickValue);
});

//function updating the cookies count and cps by a given value
function updateCookies(byHowMany) {
  cookieCounter += byHowMany;
  howManyCookies.textContent = cookieCounter;
  howFastCookies.textContent = `${cps} cps`;
  saveProgress();
}

//Add cookies with time
setInterval(function () {
  updateCookies(cps);
}, 1000);

//UPGRADES SECTION

const cpsGranny = 1;
const cpsOven = 10;
const copsFactory = 100;
const cpsMine = 1000;
const cpsBank = 10000;

const clickVal1 = 1;
const clickVal2 = 10;
const clickVal3 = 100;
const clickVal4 = 1000;

function upgradePurchasedCps(upgrade) {
  cps += upgrade;
}

function upgradePurchasedClickValue(upgrade) {
  clickValue += upgrade;
}

//save values using JSON.stringify
function saveProgress() {
  const progress = {
    cookieCounter,
    cps,
    clickValue,
  };
  localStorage.setItem("progress", JSON.stringify(progress));
}

//Retrieve saved values into corresponding variables ***************************UNCOMMENT THIS ONE LATER

// function loadProgress() {
//   const progress = JSON.parse(localStorage.getItem("progress"));
//   if (progress) {
//     cookieCounter = progress.cookieCounter;
//     cps = progress.cps;
//     clickValue = progress.clickValue;
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
