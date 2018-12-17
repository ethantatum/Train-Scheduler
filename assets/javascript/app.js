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
        let uniFirst = moment(`${firstTime}`, `x`);
        let frequency = $(`#frequency-input`).val().trim();

        console.log(trainName);
        console.log(destination);
        console.log(firstTime);
        console.log(uniFirst);
        console.log(frequency);
        
        // Provides initial data to Firebase database
        database.ref().push({
            name: trainName,
            destination: destination,
            frequency: frequency,
            time: firstTime,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        }); // Closes database.ref.push function

    }); // Closes on-click function

    // Firebase watcher + initial loader
    database.ref().on("child_added", function(snapshot) {
        let sv = snapshot.val();

        let pTrain = $(`<p>`).text(sv.name);
        let pDest = $(`<p>`).text(sv.destination);
        let pFreq = $(`<p>`).text(sv.frequency);

        // Need to add sv.frequency to sv.time - moment.js?
        let currentTime = moment().format(`x`);
        console.log(currentTime);
        let startUni = moment(`${sv.time}`, `x`);
        console.log(startUni);
        let difference = new moment().diff(sv.time, `m`);
        //console.log(difference);
        //let nextTrain = moment(`${sv.time}`).format(`HH:mm`).add(sv.frequency, `m`);
        //.format(`HH:mm`);
                                                
        //console.log(nextTrain);
        //let pTime = $(`<p>`).text(nextTrain);

        // Need to subtract nextTrain time from current time to get minutes away
        //let minutesAway = new moment().format(`HH:mm`) - (nextTrain);
        //console.log(minutesAway);
        //let pAway = $(`<p>`).text(minutesAway);


        $(`#train-name`).append(pTrain);
        $(`#destination`).append(pDest);
        $(`#frequency`).append(pFreq);
        //$(`#next-arrival`).append(pTime);
        //$(`#minutes-away`).append(pAway);
        // Create Error Handling
        }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);

    }); // Closes on-child-added function 



























}); // End of document.ready