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
        
        // Provides initial data to Firebase database
        database.ref().push({
            name: trainName,
            destination: destination,
            frequency: frequency,
            time: firstTime,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        }); // Closes database.ref.push function
        
        $(`#name-input`).val(``);
        $(`#destination-input`).val(``);
        $(`#time-input`).val(``)
        $(`#frequency-input`).val(``)
    }); // Closes on-click function

    // Firebase watcher + initial loader
    database.ref().on("child_added", function(snapshot) {
        let sv = snapshot.val();

        let pTrain = $(`<p>`).text(sv.name);
        let pDest = $(`<p>`).text(sv.destination);
        let pFreq = $(`<p>`).text(sv.frequency);

        // Converting stored start time using moment.js; subtracting a year to ensure time is not ahead of current time
        let timeConversion = moment(sv.time, `HH:mm`).subtract(1, `years`);
        
        // Calculating difference between current time and converted start time
        let difference = moment().diff(moment(timeConversion), `m`);
        
        // Calculating the remainder (minutes) by dividing the difference in minutes by the frequency of trains
        let remainder = difference % sv.frequency;
        
        // Calculating the minutes to the next train by subtracting the remaining minutes from the frequency
        let minutesToTrain = sv.frequency - remainder;
        let pMinutes = $(`<p>`).text(minutesToTrain);

        // Calculating time of next train arrival by adding number of minutes remaining to current time
        let nextTrain = moment().add(minutesToTrain, `minutes`);
        let pNext = $(`<p>`).text(moment(nextTrain).format(`HH:mm`));

        // Appending our values to the HTML
        $(`#train-name`).append(pTrain);
        $(`#destination`).append(pDest);
        $(`#frequency`).append(pFreq);
        $(`#next-arrival`).append(pNext);
        $(`#minutes-away`).append(pMinutes);
        // Create Error Handling
        }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);

    }); // Closes on-child-added function 



























}); // End of document.ready