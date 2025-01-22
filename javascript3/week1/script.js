const apiURL =
  "https://raw.githubusercontent.com/GayathriVenkatraman/gayathrivenkatraman.github.io/refs/heads/main/recipeApp.json";
let recipes = [];
async function fetchRecipes() {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from the API`);
    }
    recipes = await response.json();
    console.log("Recipes fetched successfully:", recipes);
    //sortRecipesByIngredientCount();
    displayRecipe();
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("recipe-section").innerHTML =
      "<p>Error loading recipes. Please try again later.</p>";
  }
}

function displayRecipe(filteredRecipes = recipes) {
  const recipeSection = document.getElementById("recipe-section");
  recipeSection.innerHTML = "";
  //recipeSection.tagName = "UL";
  recipeSection.className = "recipe-list";

  if (filteredRecipes.length === 0) {
    const noResultsMessage = document.createElement("p");
    noResultsMessage.textContent = "No matching recipes found.";
    noResultsMessage.className = "no-results";
    recipeSection.appendChild(noResultsMessage);
    return;
  }

  filteredRecipes.forEach((recipe) => {
    const recipeItem = document.createElement("li");
    recipeItem.className = "recipe-item";

    const recipeCard = document.createElement("div");
    recipeCard.className = "recipe-card";

    const recipeTitle = document.createElement("h1");
    recipeTitle.textContent = recipe.title;
    recipeCard.appendChild(recipeTitle);

    const recipeImage = document.createElement("img");
    recipeImage.src = recipe.picture_url;
    recipeImage.alt = recipe.title;
    recipeCard.appendChild(recipeImage);

    const ingredientsHeading = document.createElement("h2");
    ingredientsHeading.textContent = "Ingredients";
    recipeCard.appendChild(ingredientsHeading);

    const ingredientsList = document.createElement("ul");
    ingredientsList.className = "ingredients";

    for (let ingredient of recipe.ingredients) {
      const listItem = document.createElement("li");
      listItem.textContent = `${ingredient.name} - ${ingredient.amount}`;
      listItem.addEventListener("click", () =>
        fetchIngredientPrice(ingredient.name)
      );
      ingredientsList.appendChild(listItem);
    }

    recipeCard.appendChild(ingredientsList);

    const descriptionHeading = document.createElement("h2");
    descriptionHeading.textContent = "Description";
    recipeCard.appendChild(descriptionHeading);

    const descriptionList = document.createElement("ul");
    descriptionList.className = "description";
    const descriptionItem = recipe.description.split(".");
    for (let item of descriptionItem) {
      const trimmedItem = item.trim();
      if (trimmedItem) {
        const listItem = document.createElement("li");
        listItem.textContent = trimmedItem;
        descriptionList.appendChild(listItem);
      }
    }
    recipeCard.appendChild(descriptionList);

    recipeItem.appendChild(recipeCard);

    recipeSection.appendChild(recipeItem);
  });
}

function addNewRecipe(event) {
  event.preventDefault();

  const title = document.getElementById("recipe-title").value.trim();
  if (title === "") {
    alert("Please enter a title!");
    return;
  }

  const picture_url = document.getElementById("recipe-image").value.trim();
  if (picture_url === "") {
    alert("Please enter a pictural URL!");
    return;
  }

  try {
    const newUrl = new URL(picture_url);
    if (newUrl.protocol !== "http:" && newUrl.protocol !== "https:") {
      alert("Enter a valid URL starting with http or https");
      return;
    }
  } catch (error) {
    alert("Enter a valid URL");
    return;
  }

  const description = document
    .getElementById("recipe-description")
    .value.trim();
  if (description === "") {
    alert("Please enter the description");
    return;
  }

  const ingredientRows = document.querySelectorAll(".ingredient-row");
  const ingredients = Array.from(ingredientRows).map((row) => {
    const name = row.querySelector(".ingredient-name").value.trim();
    const amount = row.querySelector(".ingredient-amount").value.trim();
    return { name: name, amount: amount };
  });

  if (ingredients.length < 5) {
    const errorMessage = document.createElement("p");
    errorMessage.textContent =
      "Error: A recipe must have at least 5 ingredients.";
    errorMessage.className = "error-message";
    document.getElementById("recipe-section").innerHTML = "";
    document.getElementById("recipe-section").appendChild(errorMessage);
    return;
  }

  const newRecipe = {
    id: recipes.length + 1,
    title,
    picture_url,
    ingredients,
    description,
  };

  recipes.push(newRecipe);
  //sortRecipesByIngredientCount();

  displayRecipe();
  form.reset();
  document.getElementById("ingredients-container").innerHTML = "";
  addIngredientRow();
}

function addIngredientRow() {
  const container = document.getElementById("ingredients-container");

  for (let i = 0; i < 5; i++) {
    const ingredientRow = document.createElement("div");
    ingredientRow.className = "ingredient-row";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Ingredient Name";
    nameInput.className = "ingredient-name";
    nameInput.required = true;
    ingredientRow.appendChild(nameInput);

    const amountInput = document.createElement("input");
    amountInput.type = "text";
    amountInput.placeholder = "Amount";
    amountInput.className = "ingredient-amount";
    amountInput.required = true;
    ingredientRow.appendChild(amountInput);

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      container.removeChild(ingredientRow);
    });
    ingredientRow.appendChild(removeButton);

    container.appendChild(ingredientRow);
  }
}

const form = document.getElementById("add-recipe-form");
form.addEventListener("submit", addNewRecipe);

const addIngredientButton = document.getElementById("add-ingredient-button");
addIngredientButton.addEventListener("click", addIngredientRow);

addIngredientRow();

function findRecipeByTitle(searchTitle) {
  const searchLower = searchTitle.toLowerCase();
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchLower)
  );

  displayRecipe(filteredRecipes);
}

const searchInput = document.getElementById("search-element");
searchInput.addEventListener("input", (event) => {
  const searchValue = event.target.value;
  findRecipeByTitle(searchValue);
});

function searchIngredientName() {
  const searchIngredient = document
    .getElementById("ingredient-name")
    .value.trim()
    .toLowerCase();

  const foundIngredients = recipes
    .flatMap((recipe) => recipe.ingredients)
    .filter((ingredient) =>
      ingredient.name.toLowerCase().includes(searchIngredient)
    );

  const uniqueIngredients = [
    ...new Map(foundIngredients.map((item) => [item.name, item])).values(),
  ];

  if (uniqueIngredients.length === 0) {
    alert(`No ingredients found matching "${searchIngredient}".`);
    return;
  }

  uniqueIngredients.forEach((ingredient) =>
    fetchIngredientPrice(ingredient.name)
  );
}

async function fetchIngredientPrice(ingredient) {
  try {
    const ingredientAPI =
      "https://raw.githubusercontent.com/GayathriVenkatraman/gayathrivenkatraman.github.io/refs/heads/main/ingredientPrice.json";
    const response = await fetch(ingredientAPI);

    if (!response.ok) {
      throw new Error("Failed to fetch ingredient price");
    }
    const priceData = await response.json();
    const ingredientInfo = priceData[ingredient];

    if (ingredientInfo) {
      alert(
        `The price of ${ingredient} is ${ingredientInfo.price} ${ingredientInfo.currency}.`
      );
    } else {
      alert(`Price information for ${ingredient} is not available.`);
    }
  } catch (error) {
    console.error(error);
    alert(`Failed to fetch price for ${ingredient}. Please try again later.`);
  }
}

function sortRecipesByIngredientCount() {
  recipes.sort((a, b) => a.ingredients.length - b.ingredients.length);
  displayRecipe();
}

const sortButton = document.getElementById("sort-button");
sortButton.addEventListener("click", sortRecipesByIngredientCount);

//sortRecipesByIngredientCount();

displayRecipe();

//!-----Cooking Timer----------!
function initializeCookingTimer() {
  const timerInput = document.createElement("div");
  timerInput.innerHTML = `
  <h2>Cooking Timer</h2>
  <lable for="time-input">Enter time in minutes:</lable>
  <input type="number" id="time-input" min="1" max="120" class="timer-input" />
  <button id="start-timer">Start timer</button>
  <button id="stop-timer">Stop timer</button>
  <div id="countdown"></div>`;

  document.body.appendChild(timerInput);

  const timeInput = document.getElementById("time-input");
  const startButton = document.getElementById("start-timer");
  const stopButton = document.getElementById("stop-timer");
  const countDownDisplay = document.getElementById("countdown");

  let timer;

  function startCookingTimer() {
    const timeInMinutes = parseInt(timeInput.value);

    if (isNaN(timeInMinutes) || timeInMinutes <= 0 || timeInMinutes > 120) {
      alert("Please enter a valid cooking time between 1 and 120 minutes");
    }

    timeInput.disabled = true;
    startButton.disabled = true;

    let remainingTime = timeInMinutes * 60;
    const maxTime = 120 * 60;

    timer = setInterval(() => {
      if (remainingTime < 0 || remainingTime > maxTime) {
        clearInterval(timer);
        countDownDisplay.textContent = "Time is up!";
        alert("Cooking time is over. Your dish is ready!");
        playSound();
        timeInput.disabled = false;
        startButton.disabled = false;
        timeInput.value = "";
        return;
      }

      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;

      countDownDisplay.textContent = `${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}`;

      remainingTime--;
    }, 1000);
  }

  function playSound() {
    const audio = new Audio("https://www.soundjay.com/button/beep-07.wav");
    audio.play();
  }

  function stopCookingTimer() {
    clearInterval(timer);
    countDownDisplay.textContent = "Timer stopped!";
    timeInput.disabled = false;
    startButton.disabled = false;
    timeInput.value = "";
    return;
  }

  startButton.addEventListener("click", startCookingTimer);
  stopButton.addEventListener("click", stopCookingTimer);
}

initializeCookingTimer();

const pageTimerDisplay = document.getElementById("page-timer");

let pageTimeInSeconds = 0;

function timeSpentOnThePage() {
  pageTimeInSeconds++;
  const minutes = Math.floor(pageTimeInSeconds / 60);
  const seconds = pageTimeInSeconds % 60;

  pageTimerDisplay.textContent = `Time spent on this page: ${
    minutes > 0 ? `${minutes} minute(s) and ` : ""
  }${seconds} second(s)`;
}

setInterval(timeSpentOnThePage, 1000);

fetchRecipes();
