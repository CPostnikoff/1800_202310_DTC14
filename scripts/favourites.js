all_locations = []

function verifyUserLogin() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            getFavourites(user)
        } else {
            console.log("No user is signed in");
        }
    });
}
verifyUserLogin()

function getFavourites(user) {
    db.collection("users").doc(user.uid).get()
        .then(userData => {

			// Get the Array of favourites
            var favourites = userData.data().favourites;
            console.log(favourites);
						
			// Get pointer the new card template
            let locationCardTemplate = document.getElementById("locationCardTemplate")

            favourites.forEach(favourite => {
                console.log(favourite)
                db.collection("locations").doc(favourite).get()
                .then(doc => {
                    // console.log(doc.data())
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
    
                    document.getElementById('favourite-group').appendChild(newcard)
                })
            });  
        })
}

function filterDisplayedLocations(tag_to_filter) {
    for (i = 0; i < all_locations.length; i++) {
        if (all_locations[i][1].includes(tag_to_filter)) {
            document.getElementById(all_locations[i][0]).style.display = "Block"
        } else {
            document.getElementById(all_locations[i][0]).style.display = "none"
        }
    }
}

const button_selection = () => {
    document.querySelectorAll("button").forEach(button => {
        let id = button.getAttribute("id").toString()
        button.addEventListener("click", function () {
            console.log(id)
            filterDisplayedLocations(id)
        })
    })
}
button_selection()

function correctedTitle(title) {
    to_cap = title.split("_");
    for (i = 0; i < to_cap.length; i++) {
        to_cap[i] = to_cap[i].charAt(0).toUpperCase() + to_cap[i].slice(1);
    }
    final_title = to_cap.join(" ");
    return final_title
}