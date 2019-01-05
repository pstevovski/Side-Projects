// To style an element just add classes
// Example: 
// - <button class="btn btn-primary btn-lg"></button>
// will create a large button of type primary (blue color)

// Tip: use the docs all the time, dont try to remember everything

// Bootstrap grid usually consists of 12 column-grids, so every element can be divided to use
// a number of columns within that range.
// Exmaple will take up 6 columns of the 12 column grid on screen:
/* <div class="row">
        <div class="col-6"></div>
    </div> 
*/
// Add more column related classes for different breakpoints. Example:
/*
<div class="row">
    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
</div>

* At large and medium screens (900px >=) the divs will take 4 units (columns) of the 12 column grid, separating the space in 3
* At small (tablet) screens (900px <= 768px) the divs will take 6 units (columns) of the 12 column grid, separating the space in 2
* At extra small (mobile) screens (<= 768px) the divs will take 12 units (columns) of the 12 column grid,
meaning there will be ONE item per ROW
* You dont have to specify, for example col-lg-4 if you have the same value for the medium break point.
In that case you just specify col-md-4 and it persists on large and extra large screens as well.
*/