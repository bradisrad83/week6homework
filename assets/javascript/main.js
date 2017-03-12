//Psuedocode
//When the document loads create 10 buttons from an array 
//When a text is entered create a new button and append it to the buttonsdiv
//When a specific button is clicked we use an ajax call to get 10 giphs back and we load them in the gifdiv
//Make a function that when clicked we grab the still/animated image, and replace the still image with the animated image
//      when the image is clicked again, it replaces the animated with the still image
//      





$('document').ready(function() {


    var buttonHTML = "";
    var buttonArray = ["Trump", "R2D2", "Beavis and Butthead", "Dog", "Ewoks", "Morty", "Pizza", "Murica'", "Harambe", "Charlie Day"];
    var newItem;
    var GIFarray = [];
    var queryURL;



    function createTheButtons() {
        $("#buttonsDiv").empty();
        for (var i = 0; i < buttonArray.length; i++) {
            buttonHTML += "<button class='btn btn-lrg btn-success buttons' itemName=" + buttonArray[i] + ">" + buttonArray[i] + "</button>";
        }
        $('#buttonsDiv').html(buttonHTML);

    }


    createTheButtons();


    $('body').on('click', '#submitUserData', function(event) {
        event.preventDefault();
        newItem = $('#userInput').val().trim();
        var newButton = "<button class='btn btn-lrg btn-success buttons' itemName=" + newItem + ">" + newItem + "</button>";
        $('#buttonsDiv').append(newButton);
        $('#userInput').val("");


    });


    $('body').on('click', '.buttons', function(event) {
        $('.GIFdiv').empty();
        var chosenItem = $(this).attr('itemName');
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + chosenItem + "&limit=10" + "&api_key=dc6zaTOxFJmzC";
        $.ajax({ url: queryURL, method: 'GET' })
            .done(function(response) {
                for (var i = 0; i < response.data.length; i++) {
                    $('.GIFdiv').append("<div class='GIFbox'><p class='title'>Rating: " + response.data[i].rating.toUpperCase() + "</p><div class='image-container'><img class='itemImg img-responsive center-block'" + "data-still='" + response.data[i].images.downsized_still.url + "'" + "data-animate='" + response.data[i].images.downsized.url + "'" + "data-state='still'" + "src='" + response.data[i].images.downsized_still.url + "'></div></div>");
                    GIFarray.push(response.data[i].images.downsized.url);
                }
            });

    });


    $('body').on('click', '.itemImg', function() {
        var state = $(this).attr('data-state');
        var GIFnotMoving = $(this).attr('data-still');
        var GIFmoving = $(this).attr('data-animate');
        if (state === 'still') {
            $(this).attr('src', GIFmoving);
            $(this).attr('data-state', 'animate');
        } else if (state !== "still") {
            $(this).attr('src', GIFnotMoving);
            $(this).attr('data-state', 'still');
        };
    });

});
