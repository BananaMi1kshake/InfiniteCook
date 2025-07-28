// Wait for the DOM to be fully loaded before running the game script
document.addEventListener('DOMContentLoaded', () => {

    // --- GAME STATE ---
    // A single object to hold all the important data for our game
    const gameState = {
        inventory: [
            'Egg', 'Flour', 'Milk', 'Glimmering Fish Scale',
            'Cave Mushroom', 'Salt', 'Sugar', 'Dragon Pepper'
        ],
        discoveredRecipes: [] // We'll use this in Week 2
    };

    // This object will hold the ingredients the player has selected
    let craftingSelection = [];

    // --- DOM ELEMENT REFERENCES ---
    const inventoryList = document.getElementById('inventory-list');
    const craftingSlots = document.getElementById('crafting-slots');
    const resultDisplay = document.getElementById('result-display');
    const clearButton = document.getElementById('btn-clear');
    
    // An object to easily access technique buttons
    const techniqueButtons = {
        fry: document.getElementById('btn-fry'),
        whisk: document.getElementById('btn-whisk'),
        bake: document.getElementById('btn-bake'),
    };

    // --- CORE LOGIC ---

    /**
     * The heart of the kitchen. Takes ingredients and a technique,
     * returns the resulting dish or a failure message.
     * @param {string[]} ingredients - An array of ingredient names.
     * @param {string} technique - The technique used (e.g., 'Fry').
     * @returns {object} An object with the dish name and description.
     */
    function cook(ingredients, technique) {
        // Create a unique, sorted key to identify recipes regardless of order
        const recipeKey = ingredients.sort().join(',') + `+${technique}`;

        // Hardcoded Recipe Book
        const recipes = {
            'Egg+Fry': { 
                name: 'Fried Egg', 
                description: 'A single egg, fried sunny-side up. Simple and satisfying.' 
            },
            'Egg,Egg,Milk+Fry': { 
                name: 'Omelette', 
                description: 'Two eggs whisked with milk and fried to fluffy perfection.' 
            },
            'Dragon Pepper,Glimmering Fish Scale+Fry': { 
                name: 'Spicy Seared Scale', 
                description: 'A surprisingly zesty dish. The pepper\'s heat brings out the fish\'s magical essence.' 
            },
            'Cave Mushroom,Salt+Fry': {
                name: 'Salty Sautéed Shroom',
                description: 'A quick and earthy snack, often enjoyed by miners.'
            },
            'Flour,Milk,Sugar+Bake': {
                name: 'Simple Sweetcake',
                description: 'A dense, sweet bread. A basic pastry for a weary traveler.'
            }
        };

        // Check if the recipe exists in our book
        if (recipes[recipeKey]) {
            return recipes[recipeKey];
        } else {
            return { 
                name: 'Muddled Mess', 
                description: 'These ingredients and technique didn\'t quite work. The result is... unappetizing.' 
            };
        }
    }

    // --- RENDERING FUNCTIONS ---
    // These functions update the HTML based on the current game state.

    /**
     * Renders the player's inventory list.
     */
    function renderInventory() {
        inventoryList.innerHTML = ''; // Clear the current list
        gameState.inventory.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            li.dataset.item = item; // Store the item name in a data attribute
            
            // Add a 'selected' class if the item is in the crafting selection
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
            craftingSlots.innerHTML = '<p class="placeholder">Click ingredients from your inventory to add them here.</p>';
        } else {
            craftingSelection.forEach(item => {
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
    
    /**
     * Handles clicks on the inventory list.
     * @param {Event} e - The click event.
     */
    function handleInventoryClick(e) {
        if (e.target.tagName === 'LI') {
            const itemName = e.target.dataset.item;
            
            // This simple logic allows adding multiple of the same ingredient
            craftingSelection.push(itemName);
            
            // Re-render the UI
            e.target.classList.add('selected'); // Visually mark all clicked items
            renderCraftingSlots();
        }
    }
    
    /**
     * Handles clearing the current selection.
     */
    function handleClearSelection() {
        craftingSelection = [];
        // Remove all 'selected' classes from inventory items
        document.querySelectorAll('#inventory-list li').forEach(li => li.classList.remove('selected'));
        renderCraftingSlots();
        resultDisplay.innerHTML = '<p class="placeholder">Your creation will appear here...</p>';
    }

    /**
     * Creates a handler for a technique button.
     * @param {string} techniqueName - The name of the technique (e.g., 'Fry').
     * @returns {function} An event handler function.
     */
    function createTechniqueHandler(techniqueName) {
        return function() {
            if (craftingSelection.length === 0) {
                alert('You must select ingredients before cooking!');
                return;
            }
            const result = cook(craftingSelection, techniqueName);
            renderResult(result);
        };
    }

    // --- INITIALIZATION ---
    
    // Attach event listeners
    inventoryList.addEventListener('click', handleInventoryClick);
    clearButton.addEventListener('click', handleClearSelection);
    
    techniqueButtons.fry.addEventListener('click', createTechniqueHandler('Fry'));
    techniqueButtons.whisk.addEventListener('click', createTechniqueHandler('Whisk'));
    techniqueButtons.bake.addEventListener('click', createTechniqueHandler('Bake'));
    
    // Initial render of the game UI
    renderInventory();
    renderCraftingSlots();
});
