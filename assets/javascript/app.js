function cassie() {
	$(".carousel-inner").empty();
	$("input").addClass("navInput");

	var input = $("#searchInput").val().trim();
	var apiURL = "https://api.500px.com/v1/photos/search?term=" + input + "&consumer_key=W7RBOrJkDlrlxglMjxP9hvbjth1uqeNrUX84jzBX&exclude_nude=1&only=concert&image_size=3";

	$.ajax({
		url: apiURL,
		method: "GET"
	}).done(function(response) {
		var results = response.photos;

		for (var i = 0; i < 10; i++) {
			$(".carousel-inner").append("<div class='carousel-item polaroid'><img class='d-block' src='" + results[i].image_url + "' alt= '" + results[i].name + "'>");
			if (i == 0) {
				$(".carousel-item").addClass("active");
			}
		}
	});
};

function aidan() {
	$("#bodyContent").show();

	var keyword = $("#searchInput").val().trim();
	var ticketmasterKey = "RR18UORj62Wr84ro7p7UoiXyX9oRffwD";
	var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword="+ keyword +"&includeSpellcheck=yes&sort=date,asc&countryCode=US&apikey=";

	$("#searchInput").val("");

	$.ajax({
	    type:"GET",
	    url: queryURL + ticketmasterKey,
	    async:true,
	    dataType: "json",
	    success: function(json) {
	  	
            $("#userData").empty();  

            if (json.page.totalElements == 0) {
            	$("#userData").empty();  

            	var newRow = $("<tr>");
            	var eventTD = ("<td>We're Sorry, there are currently no " + keyword + " concerts. Please enjoy the videos and images!</td>");
            	var locationTD = ("<td>Nowhere!</td>");
            	var dateTD = ("<td>NEVER!</td>");

            	$(newRow).append(eventTD, locationTD, dateTD);
		  		$("#userData").append(newRow);  
				

            } else if (json.page.totalElements > 0){
           
	            var events = json._embedded.events;

	            for (var i = 0; i < events.length; i++) {
	             	
					var eventName = events[i].name;
					var eventTicketURL = events[i].url;
					var eventVenue = events[i]._embedded.venues[0].name;
					var venueURL = events[i]._embedded.venues[0].url;				
					var eventCity = events[i]._embedded.venues[0].city.name;				
					var eventState = events[i]._embedded.venues[0].state.stateCode;
					var location = eventCity + ", " + eventState;
					var eventDate = events[i].dates.start.localDate;
					var formatDate = moment(eventDate).format("ddd L")
					var eventTime = events[i].dates.start.localTime;
					var convertedEventTime = moment(eventTime, "HH:mm A").format("h:mm A");

	//======================= Dynamic Elements ==========================
		            var newRow = $("<tr>");
		  			var divEvent = $("<td><a class='link' href='" + eventTicketURL + "' target='_blank'>" +eventName + "</a></td>");
		  			var divLocation = $("<td><a class='link' href='" + venueURL + "' target='_blank'>" + eventVenue + "</a><br>" + location + "</td>");
		  			var divDate = $("<td>" + formatDate + "<br>" + convertedEventTime + "</td> ");
		  			var divTickets = $("<td>");
		  			var button = $("<a target='_blank'>");

		  			button.text("Tickets");
		  			button.addClass("ticketButton btn");
		  			button.attr("href", eventTicketURL);
		  			 
		  			divTickets.append(button);

		  			newRow.addClass("searchReturn");
		  			divEvent.addClass("event col-sm-3");
		  			divLocation.addClass("event col-sm-3");
		  			divDate.addClass("event col-sm-3");
		  			divTickets.addClass("event col-sm-3");

		  			$(newRow).append(divEvent, divLocation, divDate, divTickets);
		  			$("#userData").append(newRow);  
				
		  		}
	  		}
	    },
	  	error: function(xhr, status, err) {
	              // This time, we do not end up here!
	    }
 	});
};

$(document).ready(function() {
	$("#bodyContent").hide();
});

$("#submitButton").on("click", function(event) {
	event.preventDefault();
	$("#bodyContent").show();
	$("#instructions").hide();
	cassie();
	aidan();
});
