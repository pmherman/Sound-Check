$(document).ready(function () {
	$("#submitButton").on("click", function(event) {
		event.preventDefault();
		// $("h1").hide();
		// $("form").prepend("<h2>SoundCheck</h2>");
		// $(".jumbotron").addClass("no-padding");
		// $(".lead").hide();

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
				$(".carousel-inner").append("<div class='carousel-item polaroid'><img class='d-block img-responsive' src='" + results[i].image_url + "' alt= '" + results[i].name + "'</div><div class='carousel-caption d-block'><p>" + results[i].name + "</div></p>");
				if (i == 0) {
					$(".carousel-item").addClass("active");
				}
			}
		});
	});

});