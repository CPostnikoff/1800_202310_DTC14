function displayMedicalInfo(ailmentID) {
    db.collection("medical_info").doc(ailmentID).get().then(ailment => {
        if (ailment.exists) {
            ailmentInfo = ailment.data()
            ailmentName = ailmentInfo.name
            ailmentSymptoms = ailmentInfo.symptoms 
            ailmentTreatment = ailmentInfo.treatment

            document.getElementById("ailment-name").innerHTML = ailmentName
            document.getElementById("symptoms").innerHTML = ailmentSymptoms

            let parent = document.getElementById("steps-div")
            let steps = []

            ailmentTreatment.forEach((step, index) => {
                let stepDiv = document.createElement('div')
                    stepDiv.innerHTML =
                        `<div class="step-box">
                            <div class="row" style="margin-left: 5%; margin-right: 5%;">
                                <div class="col-2 my-auto" style="text-align: end; padding-right: 35px;">
                                    <b>${index + 1}.</b>
                                </div>
                                <div class="col-10" id="step-${index}">
                                    ${step}
                                </div>
                            </div>
                        </div>
                        <hr>`;

                steps.push(stepDiv)    
            });
            steps.forEach(step => parent.appendChild(step))
        }
        else {
            console.log("This document does not exist.")
        }
    })
}

function getURL() {
    var url = window.location.href;
    var docID = url.split("=")[1]
    console.log(docID)
    displayMedicalInfo(docID)
}
getURL()