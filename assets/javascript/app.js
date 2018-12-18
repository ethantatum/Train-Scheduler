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

        // Need to add sv.frequency to sv.time - moment.js?
        let currentTime = moment().format(`HH:mm`);
        console.log(currentTime);
        let timeConversion = moment(sv.time, `HH:mm`).subtract(1, `years`);
        console.log(timeConversion);
        let difference = moment().diff(moment(timeConversion), `m`);
        console.log(difference);
        let remainder = difference % sv.frequency;
        console.log(remainder);
        let minutesToTrain = sv.frequency - remainder;
        console.log(minutesToTrain);
        let nextTrain = moment().add(minutesToTrain, `minutes`);
        console.log(nextTrain);

        let pNext = $(`<p>`).text(moment(nextTrain).format(`HH:mm`));
        let pMinutes = $(`<p>`).text(minutesToTrain);
                                       
      


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