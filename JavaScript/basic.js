const drinkIngred = document.querySelector(".ingedients");
const searchBTN = document.querySelector(".search_btn");
const myDrink = document.querySelector(".myDrink");
const nextbtn = document.querySelector(".next");
const prevbtn = document.querySelector(".previous");
const drinkPics = document.querySelector(".drinkPics");
const slide_images = drinkPics.querySelectorAll("li img");
const imgWidth = 430;
// const imgWidth = document.querySelectorAll("img")[0].clientWidth;
let counter = 1;
let drinksObj = [];
let thumbs = [];
let instructions = "";
searchBTN.addEventListener("click", fetchFun);

function fetchFun() {
  document.querySelectorAll(".shaker").forEach((x) => x.remove());
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${myDrink.value}`
  )
    .then((resp) => resp.json())
    .then((data) => {
      drinksObj = data.drinks.map((drink) => ({
        drink_name: drink.strDrink,
        drink_instructions: drink.strInstructions,
        drink_ingredients: [
          drink.strIngredient1,
          drink.strIngredient2,
          drink.strIngredient3,
          drink.strIngredient4,
          drink.strIngredient5,
        ],
      }));
      //console.log(drinksObj);
      data.drinks.forEach((drink) => thumbs.push(drink.strDrinkThumb));
      //console.log(data);
      thumbs.forEach((pic) => {
        const picture = document.createElement("img");
        picture.setAttribute("src", `${pic}`);
        drinkPics.appendChild(picture);
      });
    });
}
drinkPics.style.transform = `translateX(-${imgWidth * counter}px)`;

//drinkPics.style.transform = `translateX(${counter * imgWidth}px)`;
nextbtn.addEventListener("click", () => {
  if (counter >= thumbs.length - 1) return;
  counter++;
  drinkPics.style.transform = `translateX(-${imgWidth * counter}px)`;
  document.querySelector("h3").textContent =
    "Name: " + drinksObj[counter].drink_name;
  drinkIngred.innerHTML = "";
  drinksObj[counter].drink_ingredients
    .filter((ingredient) => ingredient !== null)
    .forEach((ingredient) => {
      const ingred = document.createElement("li");
      ingred.textContent = ingredient;
      drinkIngred.appendChild(ingred);
    });
  document.querySelector(".instructions").textContent =
    drinksObj[counter].drink_instructions;
  //   console.log(counter, counter * imgWidth);
  //   console.log(window.getComputedStyle(drinkPics).transform);
});
prevbtn.addEventListener("click", () => {
  if (counter <= 0) return;
  counter--;
  drinkPics.style.transform = `translateX(-${imgWidth * counter}px)`;
  document.querySelector("h3").textContent =
    "Name: " + drinksObj[counter].drink_name;
  drinkIngred.innerHTML = "";
  drinksObj[counter].drink_ingredients
    .filter((ingredient) => ingredient !== null)
    .forEach((ingredient) => {
      const ingred = document.createElement("li");
      ingred.textContent = ingredient;
      drinkIngred.appendChild(ingred);
    });
  document.querySelector(".instructions").textContent =
    drinksObj[counter].drink_instructions;
  //   console.log(counter, counter * imgWidth);
  //   console.log(window.getComputedStyle(drinkPics).transform);
});

// drinkPics.addEventListener("transitionend", () => {
//   if (counter <= 0 || counter >= thumbs.length) {
//     drinkPics.style.transform = "translateX(0px)";
//     counter = 1;
//   }
// });

// drinkPics.addEventListener("transitionend", (e) => {
//   if (slide_images[counter].id === "lastClone") {
//     drinkPics.style.transition = "none";
//     counter = slide_images.length - 1;
//     drinkPics.style.transform = `translateX(-${imgWidth * counter}px)`;
//   }
// });
