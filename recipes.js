// ===============================================
// THE GILDED SPOON - RECIPE BOOK
// ===============================================
// To add a new recipe:
// 1. Create a key string: ingredients sorted alphabetically, joined by a ',', plus the technique.
//    Example: 'Egg,Milk,Sugar+Bake'
// 2. Add the key to the RECIPE_BOOK with its name and description.

const RECIPE_BOOK = {
  // --- Existing Recipes ---
  'Egg+Fry': {
    name: 'Fried Egg',
    description: 'A single egg, fried sunny-side up. Simple and satisfying.',
  },
  'Egg,Egg,Milk+Fry': {
    name: 'Omelette',
    description: 'Two eggs whisked with milk and fried to fluffy perfection.',
  },
  'Dragon Pepper,Glimmering Fish Scale+Fry': {
    name: 'Spicy Seared Scale',
    description:
      "A surprisingly zesty dish. The pepper's heat brings out the fish's magical essence.",
  },
  'Cave Mushroom,Salt+Fry': {
    name: 'Salty Sautéed Shroom',
    description: 'A quick and earthy snack, often enjoyed by miners.',
  },
  'Flour,Milk,Sugar+Bake': {
    name: 'Simple Sweetcake',
    description: 'A dense, sweet bread. A basic pastry for a weary traveler.',
  },

  // --- Add new recipes below this line! ---
  'Flour,Salt+Bake': {
    name: 'Hardtack',
    description:
      'A simple, unleavened biscuit. Not delicious, but it lasts forever on long journeys.',
  },
  'Dragon Pepper,Salt+Whisk': {
    name: 'Fiery Brine',
    description:
      'A potent, spicy liquid that can be used to preserve other foods... or as a dare.',
  },
};
