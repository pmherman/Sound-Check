$("#submitButton").on("click", function(event) {
	event.preventDefault();

	$(".carousel-inner").empty();

	$(".lead").hide();

	$("header").removeClass("full-screen text-center");
	$("header").addClass("navigation");

	$("input").addClass("navInput");

	$("h1").removeClass("display-1 text-pop-up-top");
	$("h1").addClass("display-4");

	var input = $("#searchInput").val().trim();

	var apiURL = "https://api.500px.com/v1/photos/search?term=" + input + "&consumer_key=W7RBOrJkDlrlxglMjxP9hvbjth1uqeNrUX84jzBX&exclude_nude=1&only=concert&image_size=3";

	$.ajax({
		url: apiURL,
		method: "GET"
	}).done(function(response) {
		var results = response.photos;

		for (var i = 0; i < 20; i++) {
			$(".carousel-inner").append("<div class='carousel-item polaroid'><img class='d-block img-responsive' src='" + results[i].image_url + "' alt= '" + results[i].name + "'</div><div class='carousel-caption d-block'><p>" + results[i].name + "</div></p>");
			if (i == 0) {
				$(".carousel-item").addClass("active");
			}
		}
	});
});