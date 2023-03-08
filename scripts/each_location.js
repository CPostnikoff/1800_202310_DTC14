function displayLocationsDynamically(collection) {
    let locationCardTemplate = document.getElementById("locationCardTemplate")

    db.collection(collection).get()
        .then(allLocations => {
            allLocations.forEach(doc => {
                console.log(doc.data())
                var title = doc.id;
                var details = doc.data().description;
                var image = doc.data().picture;

                let newcard = locationCardTemplate.content.cloneNode(true);

                newcard.querySelector('.location_name').innerHTML = title;
                newcard.querySelector('.location_description').innerHTML = details;
                newcard.querySelector('.location_image').src = image;

                document.getElementById(collection + "-go-here").appendChild(newcard)
            })
        })
}

displayLocationsDynamically("locations")
