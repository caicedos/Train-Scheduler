  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCZjgzML1bj05DSlOQyeHiiMxkv-pxpE9A",
    authDomain: "train-scheduler-8d670.firebaseapp.com",
    databaseURL: "https://train-scheduler-8d670.firebaseio.com",
    projectId: "train-scheduler-8d670",
    storageBucket: "train-scheduler-8d670.appspot.com",
    messagingSenderId: "761734767542"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit-btn").on("click", function (event) {
    event.preventDefault();

    var name = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var time = $("#time-input").val().trim();
    var frequency = $("#frequency-input").val().trim()

    var newTrain = {
      name: name,
      destination: destination,
      time: time,
      frequency: frequency
    };

    database.ref().push(newTrain);

    console.log(time);

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
  });

  database.ref().on("child_added", function (childSnapshot) {
    
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    console.log(trainTime);
    console.log(trainFrequency);

    var trainTimeConverted = moment(trainTime, "HH:mm");
    console.log(trainTimeConverted);

    var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var timeRemainder = diffTime % trainFrequency;
    console.log(timeRemainder);

    var minutesAway = trainFrequency - timeRemainder;
    var nextArrival = moment().add(minutesAway, "minutes");
    var nextTrainDisplay = moment(nextArrival).format("hh:mm");

    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(nextTrainDisplay),
      $("<td>").text(minutesAway),
    );

    $("#schedule-table > tbody").append(newRow);
  });