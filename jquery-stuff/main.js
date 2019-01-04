// // Change the body background color
// $("body").css("background-color", "#222");

// // Change the title and list items color
// $("h1").css("color", "#f5f5f5");
// $("ul li").css("color", "#fff");

// // Add mroe styling to a ceratin element at once
// // const style = {
// //     fontSize: "22px",
// //     fontFamily: "Montserrat Medium",
// //     color: "orangered",
// //     padding: "10px"
// // }

// // $("#number--two").css(style);

// // OR insert the object inline
// $("#number--two").css({
//     fontSize: "22px",
//     fontFamily: "Montserrat Medium",
//     color: "orangered",
//     padding: "10px"
// })


/* EXERCISE 1:
1. Include jQuery;
2. Select all divs and give them a purple background
3. Select the divs with class name "highlight" and make them 200px wide
4. Select the div with id "third" and give it an orange border
5. Select the first div only and change its font color to pink
*/

$("div").css({
    margin: "10px",
    padding: "5px",
    backgroundColor: "purple",
    color: "#f5f5f5"
});

$(".highlight").css("width", "200px");

$("#third").css("border", "2px solid orange");

$("div:first-of-type").css("color", "gold");
