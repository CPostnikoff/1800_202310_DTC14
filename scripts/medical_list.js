// populates the "Medical" page of CoolAid with the ailments stored in the database
function displayAilmentsDynamically(collection) {
    let ailmentCardTemplate = document.getElementById("ailmentCardTemplate")

    db.collection(collection).get()
        .then(ailments => {
            ailments.forEach(doc => {
                var Name = doc.data().name;

                let newcard = ailmentCardTemplate.content.cloneNode(true);

                newcard.querySelector('#ailment-container').innerHTML = Name;
                newcard.querySelector('a').href = "/templates/medical_info_template.html?docID=" + doc.id;

                document.getElementById("ailment-list").appendChild(newcard)
            })
        })
}
displayAilmentsDynamically("medical_info")