$(document).ready(function() {
  // Stores the original tweet data
  gifCategories = $('#gif-categories').html()

  $('[name="gif-search"]').keyup(function(e) {
    offset = 0;
    showGifs3(e);
  })

  $(document).on('click', '.gif-category', showGifs2)
});

var offset = 0;
var gifCategories;

function showGifs3(e) {
  e.preventDefault();
  var userSearch = $("[name='gif-search']").val()

  if (userSearch == "") {
    $('#gif-categories').html(gifCategories);
    return;
  }

  var unencodedURL = 'http://api.giphy.com/v1/gifs/search?q=' + userSearch + `&offset=${offset}` + '&api_key=dc6zaTOxFJmzC'
  var encodedURL = encodeURI(unencodedURL)
  var request = $.ajax({
    url: encodedURL
  })

  request.done(function(response) {
    $('#gif-categories').html("")

    for (var i = 0; i < response.pagination.count; i++) {
      var gifURL = response.data[i].images.fixed_width.url
      $('#gif-categories').append(`<div class="gif-category"><button style="background-image:url('${gifURL}')"></button></div>`)
    }
  })

  request.fail(function(response) {
    console.log("YOU DON GOOFED")
    console.log(response)
  })


}

function showGifs2(e) {
  e.preventDefault();
  console.log("I MADE IT HERE")
  var unencodedURL = 'http://api.giphy.com/v1/gifs/search?q=' + $(this).find('.overlayed-gif-text').html() + `&offset=${offset}` + '&api_key=dc6zaTOxFJmzC'
  var encodedURL = encodeURI(unencodedURL)
  var request = $.ajax({
    url: encodedURL
  })

  request.done(function(response) {
    $('#gif-categories').html("")

    for (var i = 0; i < response.pagination.count; i++) {
      var gifURL = response.data[i].images.fixed_width.url
      $('#gif-categories').append(`<button><div class="gif-category"><div class="crop"><img src="${gifURL}"></div></button>`)
    }

  })

  request.fail(function(response) {
    console.log("YOU DON GOOFED")
    console.log(response)
  })

}
