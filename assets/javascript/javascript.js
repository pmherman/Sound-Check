// ticketmaster API: Aidan

//Capture the input (band or artist name)
//Save it in a variable
//ajax call using ticketmaster api searching input value
//after return: display the ticket/purchasing information

//var keyword = "Less Than Jake";

var keyword = "phish";
console.log("!!!!!!!Keyword: ", keyword);


var ticketmasterKey = "RR18UORj62Wr84ro7p7UoiXyX9oRffwD";
var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword="+ keyword +"&countryCode=US&apikey=";


// $("#submitButton").on("click", function() {
	keyword = $("#searchInput").val().trim();
	console.log("KKKKKKKKKeyword: ", keyword);

	$.ajax({
	  type:"GET",
	  url: queryURL + ticketmasterKey,
	  async:true,
	  dataType: "json",
	  success: function(json) {
	            console.log(json);

	            var events = json._embedded.events;
	            console.log("events ", events);

	            for (var i = 0; i < events.length; i++) {
	             	
					var eventName = events[i].name;
					console.log("eventName: ", eventName);

					var eventTicketURL = events[i].url;
					console.log("eventTicketURL: ", eventTicketURL);

					var eventVenue = events[i]._embedded.venues[0].name;
					console.log("++++++eventVenue: ", eventVenue);

					var eventCity = events[i]._embedded.venues[0].city.name;
					console.log("===== eventCity: ", eventCity);

					var eventState = events[i]._embedded.venues[0].state.name;
					console.log("XXXXX eventState: ", eventState);

					var location = eventCity + ", " + eventState;
					console.log("Location: " + location);

					var eventDate = events[i].dates.start.localDate;
					console.log("eventDate: ", eventDate);

					var eventTime = events[i].dates.start.localTime;

			// +++++++This format is not working ++++++++
					var convertedEventTime = moment("eventTime").format("HH:MM a");
					console.log("eventTime: ", convertedEventTime);

	//======================= Dynamic Elements ==========================
			             var newRow = $("<tr>");
			  			 var divEvent = $("<td>" + eventName + "</td>");
			  			 var divLocation = $("<td>" + location + "</td>");
			  			 var divDate = $("<td><span>" + eventDate + "<br>" + eventTime + "</span></td> ");
			  			 var divTickets = $("<td>");
			  			 var button = $("<button>");

			  			 button.text("Tickets");
			  			 button.addClass("btn")
			  			 divTickets.append(button);

			  			 newRow.addClass("searchReturn");
			  			 divEvent.addClass("event col-sm-3");
			  			 divLocation.addClass("event col-sm-3");
			  			 divDate.addClass("event col-sm-3");
			  			 divTickets.addClass("event col-sm-3");

			  			 $(newRow).append(divEvent, divLocation, divDate, divTickets);
			  			 $("#userData").append(newRow);  
					
			  		}
	    },
	  	error: function(xhr, status, err) {
	              // This time, we do not end up here!
	    }
	// });

});
