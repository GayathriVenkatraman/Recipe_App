let recipeObject = {
  id: 1,
  title: "Vegtable Biryani",
  picture_url: "./images/veg_biryani.jpeg",
  ingredients: [
    { NAME: "bay leaf", AMOUNT: "2" },
    { NAME: "cinnamon", AMOUNT: "2 inch" },
    { NAME: "cloves", AMOUNT: "6" },
    { NAME: "star anise", AMOUNT: "2" },
    { NAME: "basmati rice", AMOUNT: "2 cups" },
    { NAME: "green peas", AMOUNT: "1/4 cup" },
    { NAME: "carrot chopped", AMOUNT: "1/4 cup" },
    { NAME: "green beans chopped", AMOUNT: "1/4 cup" },
    { NAME: "potatoes chopped", AMOUNT: "1/4 cup" },
    { NAME: "onions chopped", AMOUNT: "2 medium sized" },
    { NAME: "tomatoes chopped", AMOUNT: "2 small" },
    { NAME: "chopped fresh mint", AMOUNT: "4 teaspoons" },
    { NAME: "ginger garlic paste", AMOUNT: "2 teaspoon" },
    { NAME: "red chili powder", AMOUNT: "1 teaspoon" },
    { NAME: "turmeric powder", AMOUNT: "0.5 teaspoon" },
    { NAME: "garam masala", AMOUNT: "1.5 teaspoon" },
    { NAME: "oil", AMOUNT: "3-4 tablespoons" },
    { NAME: "water ", AMOUNT: "3.5 cups" },
    { NAME: "salt ", AMOUNT: "as required" },
  ],
  description:
    "Wash basmati rice in clean water twice and soak it for 15-20 minutes. Heat oil in a thick bottom pan/ pressure cooker, add bay leaf, star anise, cloves, and cinnamon. Saute it for 1 minute. Add onions, saute for 2 to 3 mins till the onions turn translucent. Next add tomatoes, ginger-garlic paste and saute until the raw smell has gone off. Add all the chopped vegetables and fry for about 2 minutes. Next add salt, mint leaves, red chilli powder, turmeric, and garam masala. Mix all of these and fry it for 2 to 3 mins. Next, add water and bring it to a boil in a high flame. When it starts boiling, open the lid and add soaked basmati rice. Mix well and close the lid and allow it to boil again. Cook in low flame for 15 to 20 minutes. Now veg biryani is ready.",
};

function displayRecipe(recipe) {
  const recipeSection = document.getElementById("recipe-section");

  const recipeTitle = document.createElement("h1");
  recipeTitle.textContent = recipe.title;
  recipeSection.appendChild(recipeTitle);

  const recipeImage = document.createElement("img");
  recipeImage.src = recipe.picture_url;
  recipeImage.alt = recipe.title;
  recipeSection.appendChild(recipeImage);

  const ingredientsHeading = document.createElement("h2");
  ingredientsHeading.textContent = "Ingredients";
  recipeSection.appendChild(ingredientsHeading);

  const ingredientsList = document.createElement("ul");
  ingredientsList.className = "ingredients";

  for (let ingredient of recipe.ingredients) {
    const listItem = document.createElement("li");
    listItem.textContent = `${ingredient.NAME} - ${ingredient.AMOUNT}`;
    ingredientsList.appendChild(listItem);
  }

  recipeSection.appendChild(ingredientsList);

  const descriptionHeading = document.createElement("h2");
  descriptionHeading.textContent = "Description";
  recipeSection.appendChild(descriptionHeading);

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
  recipeSection.appendChild(descriptionList);
}
const form = document.getElementById("add-recipe-form");
function addNewRecipe(event) {
  event.preventDefault();

  const title = document.getElementById("recipe-title").value;
  const picture_url = document.getElementById("recipe-image").value;
  const ingredientsInput = document.getElementById("recipe-ingredients").value;
  const description = document.getElementById("recipe-description").value;

  const ingredients = ingredientsInput.split(",").map((item) => {
    const [name, amount] = item.split("-");
    return { NAME: name.trim(), AMOUNT: amount.trim() };
  });

  recipeObject = {
    id: recipeObject.id + 1,
    title,
    picture_url,
    ingredients,
    description,
  };

  displayRecipe(recipeObject);
  form.reset();
}
form.addEventListener("submit", addNewRecipe);

displayRecipe(recipeObject);
