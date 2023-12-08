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

const upgrName = ["Grandma", "Oven", "Factory"];
const upgrCost = [100, 10000, 1000000];
const upgrMultiplier = [1, 10, 100];
const upgrPurchased = [0, 0, 0];
const upgrType = ["cps", "cps", "cps", "clickVal", "clickVal", "clickVal"];

function updateLabels(index) {
  const purchased = document.getElementsByClassName("purchased");
  purchased[index].textContent = upgrPurchased[index];

  const name = document.getElementsByClassName("name");
  name[index].textContent = upgrName[index];

  const price = document.getElementsByClassName("price");
  price[index].textContent = `🍪${upgrCost[index]}`;

  const upgrade = document.getElementsByClassName("upgrade");
  if (upgrType[index] == "cps") {
    upgrade[index].textContent = `+${upgrMultiplier[index]}cps`;
  } else {
    upgrade[index].textContent = `+${upgrMultiplier[index]}cV`;
  }
}

function purchaseUpgrade(index) {
  //Create an object
  const upgrObj = {
    name: upgrName[index],
    cost: upgrCost[index],
    multiplier: upgrMultiplier[index],
    purchased: upgrPurchased[index],
    type: upgrType[index],
  };
  //update basic values based on the type of upgrade
  if (upgrObj.type == "cps") {
    cps += upgrObj.multiplier;
  } else {
    clickValue += upgrObj.multiplier;
  }
  upgrPurchased[index] += 1;
  //update shop labels]

  updateLabels(index);
}

//save values using JSON.stringify
function saveProgress() {
  const progress = {
    cookieCounter,
    cps,
    clickValue,
    upgrPurchased,
    upgrMultiplier,
    upgrCost,
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
