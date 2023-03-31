//Function that calls everything needed for the main page  
function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid); //global
            insertAccountInfoFromFirestore();
        }
    });
}
doAll();

// Insert name function using the global variable "currentUser"
function insertAccountInfoFromFirestore() {
    currentUser.get().then(userDoc => {
        //get the user name
        var user_Name = userDoc.data().name;
        $("#name-goes-here").text(user_Name);

        //get user email
        var user_Email = userDoc.data().email;
        $("#email-goes-here").text(user_Email);

        //get timestamp for account created and display it
        var user_Creation = userDoc.data().date_created;
        var seconds = Math.floor(user_Creation / 1000);
        var nanoseconds = (user_Creation % 1000) * 1000000;
        var timestamp = new firebase.firestore.Timestamp(seconds, nanoseconds);
        const date_format = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-US', date_format).format(timestamp.toDate()); // format the date using Intl.DateTimeFormat

        $("#creation-date-goes-here").text(formattedDate)

    })
}