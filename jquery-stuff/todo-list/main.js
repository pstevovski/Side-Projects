// Create new items
$("#inputField").on("keyup", function(e) {
    e = e || event;
    let itemValue = $(this).val();
    // If key pressed is ENTER
    if(e.keyCode === 13) { 
        createItem(itemValue);
        $(this).val("");
    }
})

$("#addItem").on('click', () => {
    const itemValue = $("#inputField").val();
    createItem(itemValue);

    // Clear the input field
    $("#inputField").val("");
})

function createItem(itemValue) {
    $("#list--container").append(`<li class="new--item">${itemValue} <span class="delete--item">X</span></li>`);
    $(".new--item").bind('dblclick', completedItem);
    $(".delete--item").bind('click', deleteItem);
}

function completedItem() {
    $(this).css({
        color: "goldenrod",
        textDecoration: "line-through"
    })
}

function deleteItem() {
    $(this).parent().remove();
}