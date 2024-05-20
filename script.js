const currencyFirst = document.querySelector("#currency-first");
const currencySecond = document.querySelector("#currency-second");
const inputFirst = document.querySelector("#worth-first");
const inputSecond = document.querySelector("#worth-second");
const exchangeRate = document.querySelector(".exchange-rate");
const refreshBtn = document.querySelector("#refresh-btn");
const favoriteBtn = document.querySelector(".favorite-btn");
const favoriteRatesContainer = document.querySelector(
  ".favorite-rates-container"
);
const deleteBtn = document.querySelector(".delete-favorite-rate");

function updateRate() {
  fetch(
    `https://v6.exchangerate-api.com/v6/91f874083e2f05653fcd82cd/latest/${currencyFirst.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      const rate = data.conversion_rates[currencySecond.value];
      exchangeRate.innerHTML = `1 ${currencyFirst.value} = ${rate} ${currencySecond.value}`;
      inputSecond.value = (inputFirst.value * rate).toFixed(2);
    });
}

function refresh() {
  const tempCurrency = currencyFirst.value;
  currencyFirst.value = currencySecond.value;
  currencySecond.value = tempCurrency;

  const tempImput = inputFirst.value;
  inputFirst.value = inputSecond.value;
  inputSecond.value = tempImput;

  updateRate();
}

function saveFavoriteRate() {
  const rateText = exchangeRate.innerHTML;
  const favoriteRates = JSON.parse(localStorage.getItem("favoriteRates")) || [];

  const newRate = {
    from: currencyFirst.value,
    to: currencySecond.value,
    rate: rateText,
  };

  favoriteRates.push(newRate);
  localStorage.setItem("favoriteRates", JSON.stringify(favoriteRates));
  displayFavoriteRate();
}

function displayFavoriteRate() {
  const favoriteRates = JSON.parse(localStorage.getItem("favoriteRates")) || [];
  favoriteRatesContainer.innerHTML = "";
  favoriteRates.forEach((rate) => {
    const rateElement = document.createElement("p");
    rateElement.innerHTML = `${rate.rate}`;
    favoriteRatesContainer.appendChild(rateElement);
  });
}

function deleteFavoriteRates(index) {
  let favoriteRates = JSON.parse(localStorage.getItem("favoriteRates")) || [];
  favoriteRates.splice(index, 1);
  localStorage.setItem("favoriteRates", JSON.stringify(favoriteRates));

  displayFavoriteRate();
}

currencyFirst.addEventListener("change", updateRate);

currencySecond.addEventListener("change", updateRate);

inputFirst.addEventListener("input", updateRate);

refreshBtn.addEventListener("click", refresh);

favoriteBtn.addEventListener("click", saveFavoriteRate);

deleteBtn.addEventListener("click", deleteFavoriteRates);

document.addEventListener("DOMContentLoaded", () => {
  updateRate();
  displayFavoriteRate();
});
