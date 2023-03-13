function correctedTitle(title) {
    to_cap = title.split("_");
    for (i = 0; i < to_cap.length; i++) {
        to_cap[i] = to_cap[i].charAt(0).toUpperCase() + to_cap[i].slice(1);
    }
    final_title = to_cap.join(" ");
    return final_title
}


function displayLocationsDynamically(collection) {
    let locationCardTemplate = document.getElementById("locationCardTemplate")

    db.collection(collection).get()
        .then(allLocations => {
            allLocations.forEach(doc => {
                console.log(doc.data())
                var title = correctedTitle(doc.id);
                var details = doc.data().description;
                var image = doc.data().picture;

                let newcard = locationCardTemplate.content.cloneNode(true);

                newcard.querySelector('.location_name').innerHTML = title;
                newcard.querySelector('.location_description').innerHTML = details;
                newcard.querySelector('.location_image').src = image;
                newcard.querySelector('a').href = "./templates/location_page_template.html?docID=" + doc.id;

                document.getElementById(collection + "-go-here").appendChild(newcard)
            })
        })
}

displayLocationsDynamically("locations")
