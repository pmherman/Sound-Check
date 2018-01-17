$("#submitButton").on("click", function(e) {
	e.preventDefault();
	$("#startPage").CSS("display", "none");
	$("#navHeader").show();
	alert("You clicked the button Dumbass!");
})