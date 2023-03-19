function displayMedicalInfo() {
    db.collection("medical_info").get().then(ailment => {
        ailment.forEach(doc => {
            ailmentInfo = doc.data()
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
        })
    })
}
displayMedicalInfo()