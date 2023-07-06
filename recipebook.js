const url = "https://bjhepburn.github.io/recipes/recipes.js"

d3.json(url).then(response => {
    let recipes = response;
    console.log(recipes);
    let typeList = [];
    for (let i = 0; i < recipes.length; i++){
        typeList.push(recipes[i]['type'])
        };
    typeList = [... new Set(typeList)]
    console.log(typeList)

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
            console.log(recipes[i]['name'])
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
        console.log(recipe)

        let ingredientArray = [];
        let instructionArray = [];
        for (i = 0; i < recipes.length; i++) {
            if (recipes[i].name === recipe) {
                ingredientArray = recipes[i].ingredients
                instructionArray = recipes[i].directions
            }
        }
        console.log(ingredientArray);
        let list = document.getElementById("ingredients")
        for (let i = 0; i < ingredientArray.length; i++) {
            console.log(ingredientArray[i])
            let li = document.createElement('li');
            li.innerHTML = ingredientArray[i];
            list.appendChild(li)
            console.log(li)
        }
        let list2 = document.getElementById("instructions")
        for (let i = 0; i < instructionArray.length; i++) {
            console.log(instructionArray[i])
            let li = document.createElement('li');
            li.innerHTML = instructionArray[i];
            list2.appendChild(li)
            console.log(li)
        }
    }


})