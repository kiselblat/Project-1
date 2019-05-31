$(document).ready(function () {

  // var searchTerm = "";
  var searchLimit = 5;

  var validSearches = [];

  // function to search the jikan api for Naruto and log the object and title of the first hit
  var performSearch = function (term, limit) {
    var queryURL = "https://api.jikan.moe/v3/search/anime?q=" + term + "&limit=" + limit;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(getResults);
  };

  // Take in JSON response from performSearch() and parse out the searchResults
  var getResults = function (reply) {
    var searchResults = reply.results;
    console.log(searchResults);
    for (var i = 0; i < searchResults.length; i++) {
      validSearches.push(searchResults[i].title);
      displayResults(searchResults[i]);
    }
    console.log(validSearches);
  };

  //column titles for the table
  var headerRow = $("<th>").append(
    $("<td>").text("Poster"),
    $("<td>").text("Title"),
    $("<td>").text("Synopsis"),
  );
  $("table").append(headerRow);

  // displayResults() to the console (needs to be to the document)
  var displayResults = function (result) {
    // console.log("------------------------");
    // console.log(result.title);
    // console.log(result.image_url);
    // console.log(result.synopsis);
    var imgURL = result.image_url;
    var image = $("<img>").attr("src", imgURL);
    console.log(image);
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").append(image),
      $("<td>").text(result.title),
      $("<td>").text(result.synopsis),
    );

    // Append the new row to the table
    $("table").prepend(newRow);
    $("table").prepend("<tr><td><br>");

  };

  $("button").unbind().click(function (event) {
    event.preventDefault();
    newSearch = $("#search").val().trim();
    console.log(newSearch);
    performSearch(newSearch, searchLimit);
  });

  $( "#search" ).autocomplete({
    source: validSearches
  });

  // searchTerm = "Ghost in the Shell"
  // performSearch(searchTerm, searchLimit);
});