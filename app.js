const cookie = document.getElementById("theCookie");

let cookieCounter = 0;
let cps = 1;

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
}

//Add cookies with time
setInterval(function () {
  updateCookies(cps);
}, 1000);

//Save values to restore at the next session
function saveProgress() {
  localStorage.setItem("hoardedCookies", cookieCounter);
  localStorage.setItem("gain$", cps);
}

//Retrieve saved values into corresponding variables
