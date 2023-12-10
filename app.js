const cookie = document.getElementById("theCookie");
const howManyCookies = document.getElementById("numberOfCookies");
const howFastCookies = document.getElementById("cookiesPerSecond");
const resetBtn = document.getElementById("reset");
const howHardCookies = document.getElementById("clickValue");

//variables for basic functionalities

let data = {
  cookieCounter: 0,
  cps: 1,
  clickValue: 1,
  upgrName: [
    "Grandma",
    "Oven",
    "Factory",
    "Upgrade1",
    "Upgrade2",
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

const defaultData = {
  cookieCounter: 0,
  cps: 1,
  clickValue: 1,
  upgrName: [
    "Grandma",
    "Oven",
    "Factory",
    "Upgrade1",
    "Upgrade2",
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

const buyItem = document.querySelectorAll(".buyItem");

//Cookie clicked event listnener
cookie.addEventListener("click", function () {
  updateCookies(data.clickValue);
});

//function updating the cookies count and data.cps by a given value
function updateCookies(byHowMany) {
  data.cookieCounter += byHowMany;
  howManyCookies.textContent = data.cookieCounter;
  howFastCookies.textContent = `${data.cps} Cookie(s) Per Second`;
  howHardCookies.textContent = `X${data.clickValue} Click Value`;
  const stringifiedData = JSON.stringify(data);
  localStorage.setItem("data", stringifiedData);
  // saveProgress();
}

//Add cookies with time, handles Cookies Per Second
setInterval(function () {
  updateCookies(data.cps);
}, 1000);

//UPGRADES SECTION

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

function loadProgress() {
  const localData = localStorage.getItem("data");
  data = JSON.parse(localData);

  for (let i = 0; i <= 5; i++) {
    updateLabels(i);
  }
}

loadProgress();

function resetProgress() {
  let jasonizedDefault = JSON.stringify(defaultData);
  data = JSON.parse(jasonizedDefault);

  for (let i = 0; i <= 5; i++) {
    updateLabels(i);
  }
}

resetBtn.addEventListener("click", function () {
  resetProgress();
});

//attempl to clear preferences

// function clearPreferences(event) {
//   event.preventDefault();

//   localStorage.removeItem("progress");
// }
// if (hoardedCookies) {
//   data.cookieCounter = hoardedCookies;
//   data.cps = gain$;
// }
