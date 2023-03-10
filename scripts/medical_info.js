function displayMedicalInfo() {
    db.collection("medical_info").get().then(ailment => {
        ailment.forEach(doc => {
            ailmentInfo = doc.data()
            ailmentName = ailmentInfo.name
            ailmentSymptoms = ailmentInfo.symptoms 
            ailmentTreatment = ailmentInfo.treatment

            document.getElementById("ailment-name").innerHTML = ailmentName
            document.getElementById("symptoms").innerHTML = ailmentSymptoms
            ailmentTreatment.forEach((step, index) => {
                document.getElementById(`step-${index}`).innerHTML = step

            })
        })
    })
}
displayMedicalInfo()