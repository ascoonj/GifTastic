$(document).ready(function () {

    //initial array of emotions or reactions

    var emotions = ["ecstatic", "bored", "sad", "frustrated", "happy", "tired", "awkward", "heart-broken", "cheerful", "petty", "over it", "whatever", "confused", "zen", "loved"];


    function displayButtons() {
        $(".emotionBtns-view").empty();

        //Loop over the array of emotions and reactions
        for (var i = 0; i < emotions.length; i++) {
            //create a new button for each emotion
            var a = $("<button>");
            //to each button, add a class, a data attribute, and text on the button
            a.addClass("emoBtn").attr("data-name", emotions[i]).text(emotions[i]);
            $(".emotionBtns-view").append(a);
        }
    }
    //call the function to display buttons for emotions in the initial array
    displayButtons();


    // When the submit button is clicked
    $(".addEmotion").on("click", function (event) {
        //first prevent the button from trying to submit data
        event.preventDefault();

        // Ccapture the user input from the textbox in emotion variable
        var emotion = $("#emotionInput").val().trim();

        //if the user's emotion is not already in the array
        if (emotions.indexOf(emotion) === -1) {

            // Add the user's emotion input to the array.
            emotions.push(emotion);
        }

        //Re-display the buttons based on the expanded array
        displayButtons();

        //Clear the textbox so the user can enter another emotion if so desired
        $("#emotionInput").val("");
    });

    // Create an on-click function to capture the user-click of an emotion button
    // Used the delegated on-click to bind the click to future created buttons within the div as well
    // When an emotion button within the div containing all emotion buttons is clicked
    $(".emotionBtns-view").on("click", ".emoBtn", function () {
        // Capture the data-name property value from the clicked button
        var feeling = $(this).attr("data-name");

        // Construct a queryURL using the Giphy search endpoint and the parameters listed below
        var queryURL = "https://api.giphy.com/v1/gifs/search";

        // Performing an AJAX request with the queryURL
        $.ajax({
                url: queryURL,
                method: "GET",
                data: {
                    q: feeling, // use the button's attribute data-name as the search term
                    api_key: "PhhAnL8WDRYotjl2qiiUGkk1s3tBsthR", // my generated api-key
                    limit: 10 // request 10 gifs
                }
            })
            // After the promise is fulfilled
            .done(function (response) {
                // Store the data from the AJAX request in the results variable
                var results = response.data;
                console.log(response.data);

                // Clear the div where the current button's gifs should appear
                $(".gifGrid").empty();

                // Loop through each result item
                for (var i = 0, len = results.length; i < len; i++) {
                    // Create and store a div element, and give it a class
                    var eachGifDiv = $("<div class = 'gifDiv'>");

                    // Create and store an image element
                    var emotionImg = $("<img>");

                    // Assign multiple attributes to each image div to allow for toggling btw still and animated versions of gifs

                    // Add a src attribute which holds the version of the image that will initially be displayed
                    emotionImg.attr("src", results[i].images.fixed_height_still.url);
                    // Add an attribute "data-still" to hold the still version of the gif for later acccess
                    emotionImg.attr("data-still", results[i].images.fixed_height_still.url);
                    // Add an attribute "data-animate" to hold the animated version of the gif for later access
                    emotionImg.attr("data-animate", results[i].images.fixed_height.url);
                    // Add an attribute to hold the current state of the gif - either animated or still
                    emotionImg.attr("data-state", "still");

                    // Create a paragraph tag with the result item's rating
                    var pRating = $("<p>").text("Rating: " + results[i].rating);

                    // Append the paragraph and image tag to the new div for each emotion Gif
                    eachGifDiv.append(emotionImg).append(pRating);


                    // Prependng eachGifDiv to gifGrid whicg hard-coded into html for displaying the generated gifs
                    $(".gifGrid").prepend(eachGifDiv);
                }
            });
    });
    // Create an on-click function to capture the user-click of a generated gif image
    // When a gif is clicked...
    $(".gifGrid").on("click", "img", function () {

        // Get the current value of the data attribute 'data-state'
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, change its src attribute to what its 'data-animate' attribute value is
        // and set the image's data-state to animate

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            // Else set src to the 'data-still' attribute value
            // and set the image's data-state to still
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });



});