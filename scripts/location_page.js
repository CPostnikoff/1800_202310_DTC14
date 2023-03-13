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
            var title = correctedTitle(window.location.href.split("=")[1]);
            var details = current_location.data().description;
            var image = current_location.data().picture;
            console.log(title)
            console.log(details)
            console.log(image)
            document.querySelector('#location_name').innerHTML = title;
            document.querySelector('#location_description').innerHTML = details;
            document.querySelector('#location_image').src = image;
        })
}

displayLocationDetails("locations")