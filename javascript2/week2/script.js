let recipeObject = {
  id: 1,
  title: "Vegetable Biryani",
  picture_url: "./images/veg_biryani.jpeg",
  ingredients: [
    { name: "bay leaf", amount: "2" },
    { name: "cinnamon", amount: "2 inch" },
    { name: "cloves", amount: "6" },
    { name: "star anise", amount: "2" },
    { name: "basmati rice", amount: "2 cups" },
    { name: "green peas", amount: "1/4 cup" },
    { name: "carrot chopped", amount: "1/4 cup" },
    { name: "green beans chopped", amount: "1/4 cup" },
    { name: "potatoes chopped", amount: "1/4 cup" },
    { name: "onions chopped", amount: "2 medium sized" },
    { name: "tomatoes chopped", amount: "2 small" },
    { name: "chopped fresh mint", amount: "4 teaspoons" },
    { name: "ginger garlic paste", amount: "2 teaspoon" },
    { name: "red chili powder", amount: "1 teaspoon" },
    { name: "turmeric powder", amount: "0.5 teaspoon" },
    { name: "garam masala", amount: "1.5 teaspoon" },
    { name: "oil", amount: "3-4 tablespoons" },
    { name: "water ", amount: "3.5 cups" },
    { name: "salt ", amount: "as required" },
  ],
  description:
    "Wash basmati rice in clean water twice and soak it for 15-20 minutes. Heat oil in a thick bottom pan/ pressure cooker, add bay leaf, star anise, cloves, and cinnamon. Saute it for 1 minute. Add onions, saute for 2 to 3 mins till the onions turn translucent. Next add tomatoes, ginger-garlic paste and saute until the raw smell has gone off. Add all the chopped vegetables and fry for about 2 minutes. Next add salt, mint leaves, red chilli powder, turmeric, and garam masala. Mix all of these and fry it for 2 to 3 mins. Next, add water and bring it to a boil in a high flame. When it starts boiling, open the lid and add soaked basmati rice. Mix well and close the lid and allow it to boil again. Cook in low flame for 15 to 20 minutes. Now veg biryani is ready.",
};

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

let recipes = [];
recipes.push(recipeObject);

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
    return { NAME: name, AMOUNT: amount };
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
  sortRecipeByIngredientsCount();

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

function sortRecipeByIngredientsCount() {
  recipes.sort((a, b) => a.ingredients.length - b.ingredients.length);
  displayRecipe();
}

sortRecipeByIngredientsCount();

displayRecipe();
