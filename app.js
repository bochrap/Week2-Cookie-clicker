const cookie = document.getElementById("theCookie");
const howManyCookies = document.getElementById("numberOfCookies");
const howFastCookies = document.getElementById("cookiesPerSecond");
const resetBtn = document.getElementById("reset");
const howHardCookies = document.getElementById("clickValue");
const hiddenCookie = document.getElementById("hiddenCookie");

//variables for basic functionalities

let data = {
  cookieCounter: 0,
  cps: 1,
  clickValue: 1,
  upgrName: [
    "Swift Mixers",
    "Golden Pin",
    "Quantum Compressor",
    "Choco Boost",
    "Diamond Cutter",
    "The Midas Touch",
  ],
  upgrCost: [100, 10000, 1000000, 500, 5000, 50000],
  upgrMultiplier: [1, 10, 100, 2, 15, 50],
  upgrPurchased: [0, 0, 0, 0, 0, 0],
  upgrType: [
    "data.cps",
    "data.cps",
    "data.cps",
    "clickVal",
    "clickVal",
    "clickVal",
  ],
};

//default copy of data object for reseting the game
const defaultData = {
  cookieCounter: 0,
  cps: 1,
  clickValue: 1,
  upgrName: [
    "Swift Mixers",
    "Golden Pin",
    "Quantum Compressor",
    "Choco Boost",
    "Diamond Cutter",
    "The Midas Touch",
  ],
  upgrCost: [10, 100, 1000, 50, 500, 5000],
  upgrMultiplier: [1, 10, 100, 2, 15, 50],
  upgrPurchased: [0, 0, 0, 0, 0, 0],
  upgrType: [
    "data.cps",
    "data.cps",
    "data.cps",
    "clickVal",
    "clickVal",
    "clickVal",
  ],
};

for (let i = 0; i <= 5; i++) {
  updateLabels(i);
}

//wonky ass animation
function triggerAnimation() {
  cookie.classList.add("spin-me-round");

  setTimeout(() => {
    cookie.classList.remove("spin-me-round");
  }, 300);
}

const buyItem = document.querySelectorAll(".buyItem");

//Cookie clicked event listnener
cookie.addEventListener("click", function () {
  updateCookies(data.clickValue);
  triggerAnimation();
});

//function updating the cookies count and data.cps by a given value
function updateCookies(byHowMany) {
  data.cookieCounter += byHowMany;
  howManyCookies.textContent = data.cookieCounter;
  hiddenCookie.textContent = `(🍪 ${data.cookieCounter})`;
  howFastCookies.textContent = `${data.cps} Cookie(s) Per Second`;
  howHardCookies.textContent = `X${data.clickValue} Click Value`;
  //each time the values are updated stringified version of data is added to local storage
  //saving progress
  //   let jsonData = JSON.stringify(data);
  //   localStorage.setItem("data", jsonData);
}

//keep buttons disabled if any items cost is bigger than owned cookies
function hideButtons(availableFunds) {
  buyItem.forEach((element, index) => {
    const price = data.upgrCost[index];
    if (price > availableFunds) {
      element.disabled = true;
    } else {
      element.disabled = false;
    }
  });
}

//Add cookies with time, handles Cookies Per Second
setInterval(function () {
  updateCookies(data.cps);
  hideButtons(data.cookieCounter);
}, 1000);

//every shop button triggers item purchase
buyItem.forEach(function (button, index) {
  button.addEventListener("click", function () {
    purchaseUpgrade(index);
  });
});

function updateLabels(index) {
  const purchased = document.getElementsByClassName("purchased");
  purchased[index].textContent = data.upgrPurchased[index];

  const name = document.getElementsByClassName("name");
  name[index].textContent = data.upgrName[index];

  const price = document.getElementsByClassName("price");
  price[index].textContent = `🍪${data.upgrCost[index]}`;

  const upgrade = document.getElementsByClassName("upgrade");
  if (data.upgrType[index] == "data.cps") {
    upgrade[index].textContent = `+${data.upgrMultiplier[index]}cps`;
  } else {
    upgrade[index].textContent = `+${data.upgrMultiplier[index]}cV`;
  }
}

function purchaseUpgrade(index) {
  //Create an object
  const upgrObj = {
    name: data.upgrName[index],
    cost: data.upgrCost[index],
    multiplier: data.upgrMultiplier[index],
    purchased: data.upgrPurchased[index],
    type: data.upgrType[index],
  };
  //update basic values based on the type of upgrade

  if (data.cookieCounter - upgrObj.cost < 0) {
    console.log("You're poor, ha ha!");
  } else {
    if (upgrObj.type == "data.cps") {
      data.cps += upgrObj.multiplier;
    } else {
      data.clickValue += upgrObj.multiplier;
    }
    data.upgrPurchased[index] += 1;
    data.cookieCounter -= upgrObj.cost;
  }

  //update shop labels]

  updateLabels(index);
}

// function loadProgress() {
//   const localData = localStorage.getItem("data");
//   data = JSON.parse(localData);

//   for (let i = 0; i <= 5; i++) {
//     updateLabels(i);
//   }
// }

// loadProgress();

//reset works only when default objest is stringified and parsed back
function resetProgress() {
  let stringifieldDefaultData = JSON.stringify(defaultData);
  data = JSON.parse(stringifieldDefaultData);

  for (let i = 0; i <= 5; i++) {
    updateLabels(i);
  }
}

resetBtn.addEventListener("click", function () {
  resetProgress();
});
