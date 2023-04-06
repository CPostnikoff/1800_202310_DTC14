// stores a list of all currently dispalyed locations
var all_locations = []
// stores a list of all of the current users favourites
var all_favourite_locations = []


// confirms that a user is logged in
function verifyUserLogin() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection("users").doc(user.uid).get()
                .then(userData => {
                    var favourites = userData.data().favourites;
                    all_favourite_locations = favourites
                })
        } else {
            console.log("No user is signed in");
        }
    });
}
verifyUserLogin()

// adds an evenet lister to each button on the page
const button_selection = () => {
    document.querySelectorAll("button").forEach(button => {
        let id = button.getAttribute("id").toString()
        button.addEventListener("click", function () {
            console.log(id)
            filterDisplayedLocations(id)
        })
    })
}

// converts a name with underscores to a title with spaces and capital letters
function correctedTitle(title) {
    to_cap = title.split("_");
    for (i = 0; i < to_cap.length; i++) {
        to_cap[i] = to_cap[i].charAt(0).toUpperCase() + to_cap[i].slice(1);
    }
    final_title = to_cap.join(" ");
    return final_title
}

// displays all locations that are stored within the locations collection in firebase
function displayLocationsDynamically(collection) {
    let locationCardTemplate = document.getElementById("locationCardTemplate")

    db.collection(collection).get()
        .then(allLocations => {
            allLocations.forEach(doc => {
                var title = correctedTitle(doc.id);
                var details = doc.data().description;
                var image = doc.data().picture;
                var tags = doc.data().tags;

                all_locations.push([doc.id, tags])

                let newcard = locationCardTemplate.content.cloneNode(true);

                newcard.querySelector('.location_name').innerHTML = title;
                newcard.querySelector('.location_description').innerHTML = details;
                newcard.querySelector('.location_image').src = image;
                newcard.querySelector('a').href = "./templates/location_page_template.html?docID=" + doc.id;
                newcard.querySelector('.container').id = doc.id;

                document.getElementById(collection + "-go-here").appendChild(newcard)
            })
        })
    console.log(all_locations)
}

// hides/shows elements depending on what filter button is clicked
function filterDisplayedLocations(tag_to_filter) {
    if (tag_to_filter == "Favourites") {
        for (i = 0; i < all_locations.length; i++) {
            if (all_favourite_locations.includes(all_locations[i][0])) {
                document.getElementById(all_locations[i][0]).style.display = "Block"
            } else {
                document.getElementById(all_locations[i][0]).style.display = "none"
            }
        }
    }
        else if (tag_to_filter == "AllLocations") {
            for (i = 0; i < all_locations.length; i++) {
                document.getElementById(all_locations[i][0]).style.display = "Block"
            }
        } else {
            for (i = 0; i < all_locations.length; i++) {
                if (all_locations[i][1].includes(tag_to_filter)) {
                    document.getElementById(all_locations[i][0]).style.display = "Block"
                }
                else {
                    document.getElementById(all_locations[i][0]).style.display = "none"
                }
            }
        }
    }



displayLocationsDynamically("locations")
button_selection()
