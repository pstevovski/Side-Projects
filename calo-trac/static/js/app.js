// Storage controler
const StorageCtrl = (function() {
    // Public methods
    return {
        storeItem: function(item) {
            let items;
            
            if(!localStorage.getItem("meals")) {
                items = [];
                items.push(item);
                localStorage.setItem("meals", JSON.stringify(items))
            } else {
                items = JSON.parse(localStorage.getItem("meals"));

                // Push the new item
                items.push(item);

                // Reset local storage
                localStorage.setItem("meals", JSON.stringify(items));
            }
        },
        // Get the items from the local storage
        getFromStorage: function() {
            let items;
            if(!localStorage.getItem("meals")) {
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem("meals"))
            }

            return items;
        },
        // Update items in local storage
        updateItemStorage: function(updatedItem) {
            let items = JSON.parse(localStorage.getItem('meals'));

            items.forEach( (item, index) => {
                if(updatedItem.id === item.id) {
                    items.splice(index, 1, updatedItem); // Delete the item from the array, and then replace it with the new item
                }
            });
            localStorage.setItem("meals", JSON.stringify(items));
        },

        // Delete item from storage
        deleteItemFromStorage: function(id) {
            let items = JSON.parse(localStorage.getItem("meals"));

            items.forEach((item, index) => {
                if(id === item.id) {
                    items.splice(index, 1);
                }
            })
            localStorage.setItem("meals", JSON.stringify(items));
        },
        // Clear local storage from the meals
        clearStorage: function() {
            localStorage.removeItem("meals");
        }
    }
})();
// Item controler
const ItemCtrl = (function() {
    // Item constructor
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }
    
    // Data
    const data = {
        items: StorageCtrl.getFromStorage(),
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

        // Get item by id
        getItemById: function(id) {
            let found = null;

            data.items.forEach(item => {
                if(item.id === id) {
                    found = item;
                }
            })

            return found;
        },

        // Update item
        updateItem:function(name, calories) {
            // Calories to a number
            calories = parseInt(calories);

            let found = null;
            data.items.forEach(item => {
                if(item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            })
            return found;
        },

        // Delete item
        deleteItem:function(id) {
            const ids = data.items.map(item => {
                return item.id;
            })

            // Get index
            const index = ids.indexOf(id);

            // Remove from array
            data.items.splice(index, 1);
        },

        // Clear (delete) all items
        clearAllItems: function() {
            data.items = [];
        },

        // Set current item
        setCurrentItem: function(item) {
            data.currentItem = item;
        },

        // Get current item
        getCurrentItem: function() {
            return data.currentItem;
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
        listItems: "#meals-list li",
        addItem: "#addMeal",
        mealName: "#meal",
        mealCalories: "#calories",
        notification: "#notification",
        totalCalories: "#totalCalories",
        updateBtn: "#updateMeal",
        deleteBtn: "#deleteMeal",
        clearBtn: "#clearAll", 
        backBtn: "#back",
    }

    return {
        populateItemsList: function(items) {
            let output = '';

            items.forEach(item => {
                // Destructuring object
                const { id, name, calories } = item;
                output += `
                <li id="item-${id} class="meal-item">
                    <p>${name}: <em><strong> ${calories} Calories</strong></em></p>
                    <div class="controls">
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
            <p>${item.name}: <em><strong> ${item.calories} Calories</strong></em></p>
            <div class="controls">
                <i class="material-icons editMeal">edit</i>
            </div>`;

            // Insert item in UL
            document.querySelector(UISelectors.itemList).appendChild(li);
        },

        // Update list item
        updateListItem: function(item) {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // Convert node list to array
            listItems = [...listItems];
            
            listItems.forEach(listItem => {
                const itemId = listItem.getAttribute('id');

                if(itemId === `item-${item.id}`) {
                    document.querySelector(`#${itemId}`).innerHTML = `
                    <p>${item.name}: <em><strong> ${item.calories} Calories</strong></em></p>
                    <div class="controls">
                        <i class="material-icons editMeal">edit</i>
                    </div>`;
                }
            })
        },

        // Delete list item
        deleteListItem: function(id) {
            // debugger;
            const itemId = `#item-${id}`;

            const item = document.querySelector(itemId);
            console.log(item);
            item.remove();
        },

        // Remove all items
        removeItems: function() {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // Turn node list into array
            listItems = [...listItems];

            listItems.forEach(item => {
                item.remove();
            })
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

        // Add item to the form
        addItemToForm:function() {
            document.querySelector(UISelectors.mealName).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.mealCalories).value = ItemCtrl.getCurrentItem().calories;
        },

        // Clear edit state
        clearEditState: function() {
            UICtrl.clearFields();
            document.querySelector(UISelectors.updateBtn).style.display = "none";
            document.querySelector(UISelectors.deleteBtn).style.display = "none";
            document.querySelector(UISelectors.backBtn).style.display = "none";
            document.querySelector(UISelectors.addItem).style.display = "flex";

        },

        showEditState: function() {
            document.querySelector(UISelectors.updateBtn).style.display = "flex";
            document.querySelector(UISelectors.deleteBtn).style.display = "flex";
            document.querySelector(UISelectors.backBtn).style.display = "flex";
            document.querySelector(UISelectors.addItem).style.display = "none";

        },

        getSelectors: function() {
            return UISelectors;
        }
    }

})();


// App controler
const App = (function(ItemCtrl, StorageCtrl, UICtrl) {
    // Load event listeners
    const loadEventListeners = function () {
        // Get ui selectors
        const UISelectors = UICtrl.getSelectors();
        
        // Add item (meal) event listener
        document.querySelector(UISelectors.addItem).addEventListener("click", itemAddSubmit);

        // Edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener("click", itemEditClick);

        // Update item event
        document.querySelector(UISelectors.updateBtn).addEventListener("click", itemUpdateSubmit);

        // Delete item event
        document.querySelector(UISelectors.deleteBtn).addEventListener("click", deleteItemSubmit);

        // Clear all
        document.querySelector(UISelectors.clearBtn).addEventListener("click", clearAllItems);

        // Back button event
        document.querySelector(UISelectors.backBtn).addEventListener("click", UICtrl.clearEditState);
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

            // Display clear all button
            document.querySelector(UISelectors.clearBtn).style.display = "flex";

            // Add item to local storage
            StorageCtrl.storeItem(newItem);

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

    // Edit item submit
    const itemEditClick = function(e) {
        if(e.target.classList.contains("editMeal")) {
            // Get list item id
            const listId = e.target.parentNode.parentNode.id;

            // Break into the array
            const listIdArr = listId.split("-");

            // Get the actual id
            const id = parseInt(listIdArr[1]);

            // Get item
            const itemToEdit = ItemCtrl.getItemById(id);

            // Set current item
            ItemCtrl.setCurrentItem(itemToEdit);

            // Add item to form
            UICtrl.addItemToForm();

            UICtrl.showEditState();
            console.log(itemToEdit);
        }

        e.preventDefault();
    }

    // Update item
    const itemUpdateSubmit = function(e) {
        // Get item input
        const input = UICtrl.getItemInput();

        // Update item
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
        
        // Update the UI
        UICtrl.updateListItem(updatedItem);

        
        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        UICtrl.showTotalCalories(totalCalories);
        
        
        // Clear fiels
        UICtrl.clearEditState();
        
        // Update local storage
        StorageCtrl.updateItemStorage(updatedItem);
        
        e.preventDefault();
    }

    // Delete item
    const deleteItemSubmit = function (e) {
        // Get current item
        const currentItem = ItemCtrl.getCurrentItem();

        // Delete from data structure
        ItemCtrl.deleteItem(currentItem.id);

        // Delete item from the UI
        UICtrl.deleteListItem(currentItem.id);

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        UICtrl.showTotalCalories(totalCalories);

        UICtrl.clearEditState();

        // Delete from local storage
        StorageCtrl.deleteItemFromStorage(currentItem.id);

        // If there are no items, hide the clear all button
        const itemsArr = ItemCtrl.getItems();
        if(itemsArr.length === 0) {
            document.querySelector("#clearAll").style.display = "none";
        }

        e.preventDefault();
    }

    // Clear all items
    const clearAllItems = function(e) {
        // Delete all items from data structure
        ItemCtrl.clearAllItems();

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        UICtrl.showTotalCalories(totalCalories);

        UICtrl.clearEditState();

        // Update the UI
        UICtrl.removeItems();

        // Hide the clear all button
        document.querySelector("#clearAll").style.display = "none";

        // Clear the local storage from meals
        StorageCtrl.clearStorage();

        e.preventDefault();
    }
    
    return {
        // Initialize the application
        init: function() {
            // Clear state
            UICtrl.clearEditState();

            // Fetch items from data structure
            const items = ItemCtrl.getItems();
            const itemsFromStorage = JSON.parse(localStorage.getItem("meals"));

            if(!itemsFromStorage) {
                if(items.length > 0) {
                    UICtrl.populateItemsList(items);
                    document.querySelector("#clearAll").style.display = "flex";
                } else {
                    document.querySelector("#clearAll").style.display = "none";
                }
            } else {
                console.log(itemsFromStorage);
                if(itemsFromStorage.length > 0) {
                    UICtrl.populateItemsList(itemsFromStorage);
                    document.querySelector("#clearAll").style.display = "flex";
                } else {
                    document.querySelector("#clearAll").style.display = "none";
                }
            }
            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            UICtrl.showTotalCalories(totalCalories);

            // Load event listeners
            loadEventListeners();
        },
    }

})(ItemCtrl, StorageCtrl, UICtrl);

App.init();