// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', true);
}

// Search for a specified string.
function search() {
  var q = $('#query').val();
  console.log(gapi.client)
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    type: 'video',
    maxResults: 5

  });

  request.execute(function(response) {
    var str = JSON.stringify(response.result);
    $('#search-container').html('<pre>' + str + '</pre>');
  });
}

  search();

$("#search-button").on("click", function (e) {
  e.preventDefault();
  console.log("ID: " + response.item.id.videoID);
})