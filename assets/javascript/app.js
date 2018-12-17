$(document).ready(function() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAncTPNkOneyaJOH3rGj5SxMry-NdrWGJ0",
        authDomain: "train-scheduler-b0d7e.firebaseapp.com",
        databaseURL: "https://train-scheduler-b0d7e.firebaseio.com",
        projectId: "train-scheduler-b0d7e",
        storageBucket: "train-scheduler-b0d7e.appspot.com",
        messagingSenderId: "814812132272"
      };
      firebase.initializeApp(config);

    // Create a variable to reference the database
    const database = firebase.database();

    // Capture Button Click
    $("#add-train").on("click", function(event) {
        // Don't refresh the page!
        event.preventDefault();

        // Stores data for the most recent train
        let trainName = $(`#name-input`).val().trim();
        let destination = $(`#destination-input`).val().trim();
        let firstTime = $(`#time-input`).val().trim();
        let frequency = $(`#frequency-input`).val().trim();

        console.log(trainName);
        console.log(destination);
        console.log(firstTime);
        console.log(frequency);
        
        // Provides initial data to Firebase database
        database.ref().push({
            name: trainName,
            destination: destination,
            time: firstTime,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        }); // Closes database.ref.push function

    }); // Closes on-click function



























}); // End of document.ready