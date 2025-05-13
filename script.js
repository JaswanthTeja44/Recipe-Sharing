    const recipes = [
      {
        title: "Chocolate Cake",
        category: "Dessert",
        ingredients: ["flour", "sugar", "cocoa"],
        rating: 4.8,
        process: "Mix dry ingredients, add wet ones, bake at 350°F for 30 minutes."
      },
      {
        title: "Vegan Curry",
        category: "Vegan",
        ingredients: ["chickpeas", "tomato", "spinach"],
        rating: 4.5,
        process: "Saute onion and garlic, add spices and tomatoes, stir in chickpeas and spinach, simmer."
      },
      {
        title: "Grilled Chicken",
        category: "Main",
        ingredients: ["chicken", "spices"],
        rating: 4.2,
        process: "Marinate chicken in spices for 2 hours, grill on medium heat for 20 minutes."
      }
    ];

    const recipeContainer = document.getElementById('recipes');

    function displayRecipes(list) {
      recipeContainer.innerHTML = '';
      list.forEach((recipe, index) => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
          <h3>${recipe.title}</h3>
          <p><strong>Category:</strong> ${recipe.category}</p>
          <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
          <p class="rating"><strong>Rating:</strong> ${recipe.rating} &#9733;</p>
          <button class="more-btn" onclick="toggleProcess(${index})">More</button>
          <p class="process" id="process-${index}">${recipe.process}</p>
        `;
        recipeContainer.appendChild(card);
      });
    }

    function toggleProcess(index) {
      const processPara = document.getElementById(`process-${index}`);
      processPara.style.display = processPara.style.display === 'block' ? 'none' : 'block';
    }

    function filterRecipesFromHeader() {
      filterRecipes();
    }

    function filterRecipes() {
      const search = document.getElementById('searchInput').value.toLowerCase();
      const category = document.getElementById('headerCategoryFilter').value;
      const ingredient = document.getElementById('ingredientFilter').value.toLowerCase();
      const filtered = recipes.filter(recipe => {
        const matchesSearch = recipe.title.toLowerCase().includes(search);
        const matchesCategory = category ? recipe.category === category : true;
        const matchesIngredient = ingredient ? recipe.ingredients.some(i => i.toLowerCase().includes(ingredient)) : true;
        return matchesSearch && matchesCategory && matchesIngredient;
      });
      displayRecipes(filtered);
    }

    function submitRecipe() {
      const title = document.getElementById('newTitle').value;
      const category = document.getElementById('newCategory').value;
      const ingredients = document.getElementById('newIngredients').value.split(',').map(i => i.trim());
      const rating = parseFloat(document.getElementById('newRating').value);
      const process = document.getElementById('newProcess').value;

      if (!title || !category || !ingredients.length || isNaN(rating) || !process) {
        alert('Please fill in all fields correctly.');
        return;
      }

      const newRecipe = { title, category, ingredients, rating, process };
      recipes.push(newRecipe);
      displayRecipes(recipes);
      alert('Recipe submitted successfully!');
      document.getElementById('newTitle').value = '';
      document.getElementById('newCategory').value = 'Dessert';
      document.getElementById('newIngredients').value = '';
      document.getElementById('newRating').value = '';
      document.getElementById('newProcess').value = '';
    }

    document.getElementById('searchInput').addEventListener('input', filterRecipes);
    document.getElementById('ingredientFilter').addEventListener('input', filterRecipes);

    displayRecipes(recipes);