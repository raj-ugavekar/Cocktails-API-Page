let filteredDrinks = []; 

//To clear the searched value
function clear(){
  console.log("clicked")
  document.getElementById("searchInput").innerHTML='';
}

//To display the search value - Takes searched value and passes  to search function
function display(){
    let value=document.getElementById("searchInput").value
    search(value); 
}

//To search the items based on searched value
function search(value) {
  cocktailAPI.then(data => {
      filteredDrinks = data.drinks.filter(drinks => drinks.strDrink.toLowerCase().includes(value));
      let cocktail = '';
      filteredDrinks.forEach(drinks => {
          cocktail +=`
          <div class="cocktail">
          <img src="${drinks.strDrinkThumb}" alt="">
          <h3 class="drinkName" >${drinks.strDrink}</h3>
          </div>
          ` ;
      });
      appendData.innerHTML = cocktail;
  }); // Clear the searched values when button is pressed
  document.getElementById("clearBtn").addEventListener('click',()=>{
    let no=document.getElementById("searchInput").value='';
    search(no);
  });
}



const container = document.querySelector('.cocktails-container');
const previewContainer = document.querySelector('.cocktails-preview');
const closeBtn = document.querySelector('.cocktails-preview');

//To open the preview
function openPreview() {
    previewContainer.classList.add('active');
}

//To close the preview
function closePreview() {
    previewContainer.classList.remove('active');
}

//gives index and calls preview function
container.addEventListener('click', function (e) {
    if ((e.target.tagName == 'IMG') || (e.target.classList.contains('drinkName')) || (e.target.classList.contains('cocktail'))) {
        const cardIndex = Array.from(this.children).indexOf(e.target.closest('.cocktail'));
        openPreview();
        preview(cardIndex,filteredDrinks);
    }
});


//Gives  details ofthe clicked cocktail
function preview(cardIndex,filteredDrinks) {
  let drinks = filteredDrinks[cardIndex];
  let previewData = [];
  const preview = `
  <div class="preview-content">
  <i class="fas fa-times" onclick="closePreview()" > </i>
  <div class="details">
  <div class="left-details">
  <img src="${drinks.strDrinkThumb}" alt="">
  </div>
  <div class="right-details">
  <h3>Drink : ${drinks.strDrink} </h3>
  <h3>Category : ${drinks.strCategory} </h3>
  <h3>Alcoholic : ${drinks.strAlcoholic} </h3>
  <h3>Glass : ${drinks.strGlass}</h3>
  </div>
  </div>
  <h3 class="border" >Instructions:</h3>
  <p>English - ${drinks.strInstructions}</p>
  <p>Spanish - ${drinks.strInstructionsES}</p>
  <p>German - ${drinks.strInstructionsDE}</p>
  <p>Italian - ${drinks.strInstructionsIT}</p>
  <div class="lists">
  <div class="left-list">
     <h3 class="border">Ingredients:</h3>
     <ul>
         <li>${drinks.strIngredient1}</li>
         <li>${drinks.strIngredient2}</li>
         <li>${drinks.strIngredient3}</li>
         <li>${drinks.strIngredient4}</li>
         <li>${drinks.strIngredient5}</li>
         <li>${drinks.strIngredient6}</li>
     </ul>
 </div>
 <div class="right-list">
     <h3 class="border">Measurements:</h3>
     <ul>
     <li>${drinks.strMeasure1}</li>
     <li>${drinks.strMeasure2}</li>
     <li>${drinks.strMeasure3}</li>
     <li>${drinks.strMeasure4}</li>
     <li>${drinks.strMeasure5}</li>
     <li>${drinks.strMeasure6}</li>
   </ul>
 </div>
</div>
</div>`;

  addData.innerHTML = preview;
  previewData[cardIndex] = preview;
}


let cocktailAPI = fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
 .then(res=> {
    if (!res.ok){
        console.log('Problem')
        return;
    }
    console.log(res.status);
    console.log(res.ok);
    return res.json();
  })
  cocktailAPI.then(data => {
    let value = '';
    filteredDrinks = data.drinks.filter(drinks => drinks.strDrink.includes(value));
    let cocktail = '';
    filteredDrinks.forEach((drinks) => {
        cocktail += `
        <div class="cocktail">
        <img src="${drinks.strDrinkThumb}" alt="">
        <h3 class="drinkName" >${drinks.strDrink}</h3>
        </div>
        `;
    });
    appendData.innerHTML = cocktail;

})
.catch(error=>{
    console.log(error);
});
