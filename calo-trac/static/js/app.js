// Storage controler

// Item controler
const ItemCtrl = (function() {
    // Item constructor
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }
    
    // data
    const data = {
        items: [],
        currentItem: null,
        totalCalories: 0
    }

    return {
        getItems: function() {
            return data.items;
        },

        addItem: function(name, calories) {
            let id;
            if(data.items.length > 0) {
                id = data.items[data.items.length - 1].id + 1;
            } else {
                id = 0;
            }

            // Convert calories input to number
            calories = parseInt(calories);

            // Create a new item
            newItem = new Item(id, name, calories);

            // Push the new item to the data
            data.items.push(newItem);

            return newItem;
        },

        getTotalCalories: function() {
            let total = 0;

            // Loop trough each item
            data.items.forEach(item => {
                total += item.calories;
            })

            // Set total calories in the data
            data.totalCalories = total;

            // Return the total calories
            return data.totalCalories;
        },

        logData: function() {
            return data;
        }
    }
})();


// UI controler
const UICtrl = (function() {
    const UISelectors = {
        itemList: "#meals-list",
        addItem: "#addMeal",
        mealName: "#meal",
        mealCalories: "#calories",
        notification: "#notification",
        totalCalories: "#totalCalories",
    }

    return {
        populateItemsList: function(items) {
            let output = '';

            // Destructuring object
            
            items.forEach(item => {
                const { id, name, calories } = item;
                output += `
                <li id="item-${id} class="meal-item">
                    <p>${name}<em><strong> ${calories} Calories</strong></em></p>
                    <div class="controls">
                        <i class="material-icons deleteMeal">delete</i>
                        <i class="material-icons editMeal">edit</i>
                    </div>
                </li>`;
            })

            document.querySelector(UISelectors.itemList).innerHTML = output;
        },

        getItemInput: function() {
            return {
                name: document.querySelector(UISelectors.mealName).value,
                calories: document.querySelector(UISelectors.mealCalories).value
            }
        },

        addListItem: function(item) {
            // Create the li
            const li = document.createElement("li");

            // Add the class to the LI
            li.className = "meal-item";

            // Add li ID
            li.id = `item-${item.id}`;

            // Add HTML to the li
            li.innerHTML = `
            <p>${item.name}<em><strong> ${item.calories} Calories</strong></em></p>
            <div class="controls">
                <i class="material-icons deleteMeal">delete</i>
                <i class="material-icons editMeal">edit</i>
            </div>`;

            // Insert item in UL
            document.querySelector(UISelectors.itemList).appendChild(li);
        },

        // Show total calories
        showTotalCalories:function(totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },

        // Clear input fields
        clearFields: function() {
            document.querySelector(UISelectors.mealName).value = "";
            document.querySelector(UISelectors.mealCalories).value = "";
        },

        getSelectors: function() {
            return UISelectors;
        }
    }

})();


// App controler
const App = (function(ItemCtrl, UICtrl) {
    // Load event listeners
    const loadEventListeners = function () {
        // Get ui selectors
        const UISelectors = UICtrl.getSelectors();
        
        // Add item (meal) event listener
        document.querySelector(UISelectors.addItem).addEventListener("click", itemAddSubmit);
    }

    // Item add submit
    const itemAddSubmit = function(e) {
        // Get Selector
        const UISelectors = UICtrl.getSelectors();

        // Get item input from UI Control
        const input = UICtrl.getItemInput();

        const regex = /^\d+$/;
        // Check for value and regex match
        if(input.name && regex.test(input.calories)) {
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            UICtrl.addListItem(newItem);

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            UICtrl.showTotalCalories(totalCalories);

            // Clear fiels
            UICtrl.clearFields();
        } else {
            document.querySelector(UISelectors.notification).textContent = "Check the input fields.";

            // Clear the notification
            setTimeout(() => {
                document.querySelector(UISelectors.notification).textContent = '';
            }, 2500);
        }
        e.preventDefault();
    }

    return {
        init: function() {
            // Fetch items from data structure
            const items = ItemCtrl.getItems();

            UICtrl.populateItemsList(items);

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            UICtrl.showTotalCalories(totalCalories);

            // Load event listeners
            loadEventListeners();
        }
    }

})(ItemCtrl, UICtrl);

App.init();