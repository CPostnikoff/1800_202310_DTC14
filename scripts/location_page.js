// point to current user document
var currentUser

function correctedTitle(title) {
    to_cap = title.split("_")
    for (i = 0; i < to_cap.length; i++) {
        to_cap[i] = to_cap[i].charAt(0).toUpperCase() + to_cap[i].slice(1);
    }
    final_title = to_cap.join(" ");
    return final_title
}

function displayLocationDetails() {
    console.log(window.location.href)

    let current_url_split = window.location.href.split("=")
    let current_location = current_url_split[1]

    console.log(current_location)

    db.collection("locations").doc(current_location).get()
        .then(current_location => {
            console.log(current_location.data())
            var url_end = window.location.href.split("=")[1]
            var title = correctedTitle(url_end);
            var details = current_location.data().description;
            var image = current_location.data().picture;
            var locationID = current_location.id;
            console.log(url_end)
            console.log(title)
            console.log(details)
            console.log(image)
            document.querySelector('.location_name').innerHTML = title;
            document.querySelector('.location_description').innerHTML = details;
            document.querySelector('.location_image').src = image;
            document.querySelector('.page-a').href = "../templates/location_directions_template.html?docID=" + url_end;
            document.querySelector('i').id = 'save-' + locationID;
            document.querySelector('.favourite-button').onclick =  () => saveFavourite(locationID);
            checkFavourite(locationID)
        })
}

displayLocationDetails("locations")

function verifyUserLogin() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid)
            console.log('successful login')
            console.log(currentUser)
        }
        else {
            console.log("User not logged in")
            window.location.href = "../templates/login_template.html"
        }
    })
}
verifyUserLogin()

function saveFavourite(locationID) {
    console.log('saveFavourite called')
    currentUser.get().then( userData => {
        if (userData.data().favourites.includes(locationID)) {
            console.log("Favourite already exists for: " + currentUser);
            currentUser.set({
                favourites: firebase.firestore.FieldValue.arrayRemove(locationID)
            }, {
                merge: true
            })
            .then(function () {
                console.log("Favourite removed for: " + currentUser);
                var iconID = 'save-' + locationID;
                document.getElementById(iconID).style.color = "white";
            })
        }
        else {
            currentUser.set({
                favourites: firebase.firestore.FieldValue.arrayUnion(locationID)
            }, {
                merge: true
            })
            .then(function () {
                console.log("Favourite added for: " + currentUser);
                var iconID = 'save-' + locationID;
                document.getElementById(iconID).style.color = "red";
            })
        }
    })
}

function checkFavourite(locationID) {
    currentUser.get().then( userData => {
        if (userData.data().favourites.includes(locationID)) {
            var iconID = 'save-' + locationID;
            document.getElementById(iconID).style.color = "red";
        }
    })
}