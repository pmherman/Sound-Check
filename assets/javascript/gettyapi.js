$("#submitButton").on("click", function(event) {
	event.preventDefault();

	$("#picturesDiv").empty();
	var input = $("#searchInput").val().trim();
	console.log(input);

	var gettyURL = "https://api.gettyimages.com/v3/search/images?phrase=" + input;


	var apiKey ="gz8x7rj4w5fnugv4ta6n2rzv";
	var appendApiKeyHeader = function( xhr ) {
	  xhr.setRequestHeader('Api-Key', apiKey)
	};


	$.ajax({
		url: gettyURL,
		beforeSend: appendApiKeyHeader,
		method: "GET"
	}).done(function(response) {
		var results = response.images;

		for (var i = 0; i < 6; i++) {
			$(".carousel-inner").append("<div class='carousel-item'><img class='d-block w-100' src='" + results[i].display_sizes["0"].uri + "'></div>");
			$(".carousel-item").addClass("active");
		}
	});
});