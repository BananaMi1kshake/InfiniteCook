// Wait for the DOM to be fully loaded before running the game script
document.addEventListener('DOMContentLoaded', () => {
  // --- GAME STATE ---
  const gameState = {
    inventory: [
      'Egg',
      'Flour',
      'Milk',
      'Glimmering Fish Scale',
      'Cave Mushroom',
      'Salt',
      'Sugar',
      'Dragon Pepper',
    ],
    discoveredRecipes: [],
  };

  let craftingSelection = [];

  // --- DOM ELEMENT REFERENCES ---
  const inventoryList = document.getElementById('inventory-list');
  const craftingSlots = document.getElementById('crafting-slots');
  const resultDisplay = document.getElementById('result-display');
  const clearButton = document.getElementById('btn-clear');

  const techniqueButtons = {
    fry: document.getElementById('btn-fry'),
    whisk: document.getElementById('btn-whisk'),
    bake: document.getElementById('btn-bake'),
  };

  // --- CORE LOGIC ---
  /**
   * The heart of the kitchen. Takes ingredients and a technique,
   * returns the resulting dish by looking it up in the RECIPE_BOOK.
   * @param {string[]} ingredients - An array of ingredient names.
   * @param {string} technique - The technique used (e.g., 'Fry').
   * @returns {object} An object with the dish name and description.
   */
  function cook(ingredients, technique) {
    // Create a unique, sorted key to identify recipes regardless of order
    const recipeKey = ingredients.sort().join(',') + `+${technique}`;

    // Check if the recipe exists in our global recipe book (from recipes.js)
    if (RECIPE_BOOK[recipeKey]) {
      return RECIPE_BOOK[recipeKey];
    } else {
      return {
        name: 'Muddled Mess',
        description:
          "These ingredients and technique didn't quite work. The result is... unappetizing.",
      };
    }
  }

  // --- RENDERING FUNCTIONS ---
  /**
   * Renders the player's inventory list.
   */
  function renderInventory() {
    inventoryList.innerHTML = ''; // Clear the current list
    gameState.inventory.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      li.dataset.item = item; // Store the item name in a data attribute

      if (craftingSelection.includes(item)) {
        li.classList.add('selected');
      }

      inventoryList.appendChild(li);
    });
  }

  /**
   * Renders the currently selected crafting ingredients.
   */
  function renderCraftingSlots() {
    craftingSlots.innerHTML = '';
    if (craftingSelection.length === 0) {
      craftingSlots.innerHTML =
        '<p class="placeholder">Click ingredients from your inventory to add them here.</p>';
    } else {
      craftingSelection.forEach((item) => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = item;
        craftingSlots.appendChild(itemDiv);
      });
    }
  }

  /**
   * Displays the result of a cooking attempt.
   * @param {object} dish - The dish object returned by the cook() function.
   */
  function renderResult(dish) {
    resultDisplay.innerHTML = `
            <h3>${dish.name}</h3>
            <p>${dish.description}</p>
        `;
  }

  // --- EVENT HANDLERS ---
  function handleInventoryClick(e) {
    if (e.target.tagName === 'LI') {
      const itemName = e.target.dataset.item;
      craftingSelection.push(itemName);
      e.target.classList.add('selected');
      renderCraftingSlots();
    }
  }

  function handleClearSelection() {
    craftingSelection = [];
    document
      .querySelectorAll('#inventory-list li')
      .forEach((li) => li.classList.remove('selected'));
    renderCraftingSlots();
    resultDisplay.innerHTML =
      '<p class="placeholder">Your creation will appear here...</p>';
  }

  function createTechniqueHandler(techniqueName) {
    return function () {
      if (craftingSelection.length === 0) {
        alert('You must select ingredients before cooking!');
        return;
      }
      const result = cook(craftingSelection, techniqueName);
      renderResult(result);
    };
  }

  // --- INITIALIZATION ---
  inventoryList.addEventListener('click', handleInventoryClick);
  clearButton.addEventListener('click', handleClearSelection);

  techniqueButtons.fry.addEventListener(
    'click',
    createTechniqueHandler('Fry')
  );
  techniqueButtons.whisk.addEventListener(
    'click',
    createTechniqueHandler('Whisk')
  );
  techniqueButtons.bake.addEventListener(
    'click',
    createTechniqueHandler('Bake')
  );

  renderInventory();
  renderCraftingSlots();
});
