const url = "https://bjhepburn.github.io/recipes/recipes.js"

d3.json(url).then(response => {
    let recipes = response;
    let typeList = [];
    for (let i = 0; i < recipes.length; i++){
        typeList.push(recipes[i]['type'])
        };
    typeList = [... new Set(typeList)]

    let typeSelect = document.getElementById('selType');
    for (let i = 0; i < typeList.length; i++) {
        let option = typeList[i];
        let element = document.createElement("option");
        element.textContent = option;
        element.value = option;
        typeSelect.appendChild(element);
    }

    d3.select('#selType').on("change", typeChange);
    function typeChange() {
        let selection = d3.select('#selType');
        type = selection.property('value');
        updateRecipes(type);
        return(type);
    }

    function updateRecipes(type) {
        let recipeArray = [];
        for (let i = 0; i < recipes.length; i++) {
            if (recipes[i]['type'] == type) {
                recipeArray.push(recipes[i]['name']);
            }
        }

        for (let i = 0; i < recipeArray.length; i++) {
            let recipeSelect = document.getElementById("selRecipe");
            let option = recipeArray[i];
            let element = document.createElement("option");
            element.textContent = option;
            element.value = option;
            recipeSelect.appendChild(element);
    }}

    d3.select("#selRecipe").on("change", updateRecipe)
    function updateRecipe() {
        let selection = d3.select("#selRecipe");
        let recipe = selection.property('value');
        updateDisplay(recipe);
    }

    function updateDisplay(recipe) {

        let ingredientArray = [];
        let instructionArray = [];
        for (i = 0; i < recipes.length; i++) {
            if (recipes[i].name === recipe) {
                ingredientArray = recipes[i].ingredients
                instructionArray = recipes[i].directions
            }
        }
        let list = document.getElementById("ingredients")
        let numbers = [0,1,2,3,4,5,6,7,8,9]
        for (let i = 0; i < ingredientArray.length; i++) {
            let li = document.createElement('li');
                console.log(ingredientArray[i],ingredientArray[i][0])
                li.innerHTML = ingredientArray[i];
                if (ingredientArray[i][0] in numbers) {
                    li.style.color='black'}
                    else{
                        li.style.color='red'
                    }
                list.appendChild(li)
            
            
            
        }
        let list2 = document.getElementById("instructions")
        for (let i = 0; i < instructionArray.length; i++) {
            let li = document.createElement('li');
            li.innerHTML = instructionArray[i];
            list2.appendChild(li)
        }
    }


})