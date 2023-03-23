//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
            // No user is signed in.
            console.log($('#topNavbar').load('./templates/top_header_template.html'));
            console.log($('#bottomNavbar').load('./templates/navbar_template.html'));
    });
}
loadSkeleton(); //invoke the function