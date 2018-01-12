$(document).ready(function () {
	$("#submitButton").on("click", function() {
		event.preventDefault();

		var keyword = $("#searchInput").val().trim();
		var ticketmasterKey = "RR18UORj62Wr84ro7p7UoiXyX9oRffwD";
		var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword="+ keyword +"&countryCode=US&apikey=";

		$("#searchInput").val("");

		$.ajax({
		  type:"GET",
		  url: queryURL + ticketmasterKey,
		  async:true,
		  dataType: "json",
		  success: function(json) {
		            $("#userData").empty();  

		            var events = json._embedded.events;
		            console.log("events ", events);

		            for (var i = 0; i < events.length; i++) {
		             	
						var eventName = events[i].name;
						console.log("eventName: ", eventName);

						var eventTicketURL = events[i].url;
						console.log("eventTicketURL: ", eventTicketURL);

			// xxxxxxxxxxxx Add a link to the venue name to take to venue website xxxxxxxxxxxxxxxxx

						var eventVenue = events[i]._embedded.venues[0].name;
						console.log("++++++eventVenue: ", eventVenue);

						var eventCity = events[i]._embedded.venues[0].city.name;
						console.log("===== eventCity: ", eventCity);

						var eventState = events[i]._embedded.venues[0].state.name;
						console.log("XXXXX eventState: ", eventState);

						var location = eventCity + ", " + eventState;
						console.log("Location: " + location);

						var eventDate = events[i].dates.start.localDate;

						var formatDate = moment(eventDate).format("ddd L")
						console.log("Formated eventDate: ", formatDate);

						var eventTime = events[i].dates.start.localTime;

						var convertedEventTime = moment(eventTime, "HH:mm A").format("h:mm A");
						console.log("Converted eventTime: ", convertedEventTime);

		//======================= Dynamic Elements ==========================
			             var newRow = $("<tr>");
			  			 var divEvent = $("<td>" + eventName + "</td>");
			  			 var divLocation = $("<td><span>" + eventVenue + "<br>" + location + "</span></td>");
			  			 var divDate = $("<td>" + formatDate + "<br>" + convertedEventTime + "</td> ");
			  			 var divTickets = $("<td>");
			  			 var button = $("<a target='_blank'>");

			  			 button.text("Tickets");
			  			 button.addClass("btn")
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
		    },
		  	error: function(xhr, status, err) {
		              // This time, we do not end up here!
		    }
	 	});

	});
});