
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBBdSmLSWFMDTyQjqcU5POgmZb9GEGqlG4",
    authDomain: "project1-4c4f0.firebaseapp.com",
    databaseURL: "https://project1-4c4f0.firebaseio.com",
    projectId: "project1-4c4f0",
    storageBucket: "",
    messagingSenderId: "284380347549"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var name;
  var email;

  function isValidEmailAddress(emailAddress) {
	var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
	return pattern.test(emailAddress);
}

  $("#submitList").on("click", function(e) {
  	e.preventDefault();

  	name = $("#nameInput").val().trim()
  	email = $("#emailInput").val().trim();

  	if (name == "") {
  		$("#invalidName").modal('show');
  	} else if (email == "") {
  		$("#invalidEmail").modal('show');
  	} else if ( !isValidEmailAddress(email) ) {
			$("#invalidEmail").modal('show');
  	} else {
	  	$("<p>").html("Thank you " + name + " for joining our mailing list").appendTo("#successModalBody");
	  	$("#successModal").modal("show");
	  	$("#nameInput").val("");
	  	$("#emailInput").val("");
	  	$("#submitList").attr("data-dismiss", "modal");
	  	$("#submitList").attr("aria-label", "Close");

	  	
	  	database.ref().push({
	  		name: name,
	  		email: email,
	  		dateAdded: firebase.database.ServerValue.TIMESTAMP
	  	});
  	}
  });
