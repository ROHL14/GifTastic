//Array fo the animal´s list
var animals = 
    ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", 
     "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", 
     "pygmi goat", "chiken", "capybara", "teacup pig", "serval", "salamander", "frog"]

//Variable that call the button area in the html     
var btnArea = $('#buttons');

//for loop to create the buttons in the html
for (var i = 0; i < animals.length; i++) { 
    var buttons = $('<button class="btn btn-info btn-lg btn-md btn-sm btn-animal" type="submit" style="margin: 5px; font-size: 1.8vw ">'+ animals[i] + '</button>') 
    btnArea.append(buttons);
}

//function to add a new button
function addBtn(element) {
    var newBtn = $('<button class="btn btn-info btn-lg btn-md btn-sm btn-animal" type="submit" style="margin: 5px; font-size: 1.8vw">'+element+'</button>');
    btnArea.append(newBtn);
}

//click event to add the button
$("#submit").on("click", function() {
    addBtn($("#newAnimalBtn").val());
    $("#newAnimalBtn").val("");
});

//click event to search for the gif
btnArea.on("click", ".btn-animal", function () {
    var btnAnimal = $(this).text();
    var gifContainer = $("#gifArea");

    $.ajax({
        url: `https://api.giphy.com/v1/gifs/search?q=animal+${btnAnimal}&api_key=V2ukfjieo5ByBZawIwgKsYOiKXXaYfrK&limit=10`,
        success: function(result) {
            gifContainer.html("");
            var data = result.data;
            for (var index in data){
                var gifObject = data[index];
                var gifURLStill = gifObject.images.original_still.url;
                var gifURLActive = gifObject.images.original.url
                gifImg = $('<img>');
                gifImg.attr({ "src": gifURLStill, "still": gifURLStill, "active": gifURLActive, "id": "gif-" + index });
                gifImg.addClass("btn img-thumbnail btn col-lg-4 col-md-4 col-sm-3 col-xs-3 gif gif-style");
                gifContainer.append(gifImg);
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
});

//Event to start and stop the animation of the gif
var stillActive = false;
$("#gifArea").on("click", ".gif-style", function () {
    var img = $(this);
    console.log(img);
    var still = img.attr("still");
    var active = img.attr("active");
    if (stillActive) {
      img.attr("src", still);
      stillActive = false;
    } else {
      img.attr("src", active);
      stillActive = true;
    }
  });