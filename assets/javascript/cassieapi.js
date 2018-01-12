$("#submitButton").on("click", function(event) {
	event.preventDefault();

	$(".carousel-inner").empty();

	var input = $("#searchInput").val().trim();
	console.log(input);

	var apiURL = "https://api.500px.com/v1/photos/search?term=" + input + "&consumer_key=W7RBOrJkDlrlxglMjxP9hvbjth1uqeNrUX84jzBX&exclude_nude=1&only=concert&image_size=3";

	$.ajax({
		url: apiURL,
		method: "GET"
	}).done(function(response) {
		var results = response.photos;
		console.log(response.photos);

		for (var i = 0; i < 10; i++) {
			$(".carousel-inner").append("<div class='carousel-item polaroid'><img class='d-block animated bounceInRight' src='" + results[i].image_url + "'</div>");
			if (i == 0) {
				$(".carousel-item").addClass("active");
			}
		}
	});
});