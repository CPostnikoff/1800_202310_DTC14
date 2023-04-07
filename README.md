# Project Title

## 1. Project Description
State your app in a nutshell, or one-sentence pitch. Give some elaboration on what the core features are.  
This browser based web application to ... 

## 2. Names of Contributors
List team members and/or short bio's here... 
* Cameron - I'm looking forward to building something in a team
* Hello. Adam is changing this line! Make way!!
* My name is Marco and I used to be an illustrator!!
	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* jQuery (JavaScript Framework)
*  OpenWeatherMap (weather API)
* MapBox (map and directions API)

## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
* Start by logging in
* When prompted to access your location, do not select "remember my location" select "allow"


## 5. Known Bugs and Limitations
Here are some known bugs:
* 5 day weatherforecast will not work if the month/year changes in the next 5 days
* Map will not load properly if the user has allowed the browser to remember their location preference
* On mobile phones each location images stretches vertically. This does not happen throuhg a browser's mobile view

## 6. Features for Future
What we'd like to build in the future:
* Change 5 day forecast on the weather page to be clickable and display more information for that selected date
* Implement a search bar
* Allow user reviews for a location
* Make "Logout" and other user-options functional
* Make the weather on a location_page pull real weather data
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore                          # Git ignore file
├── index.html                          # landing HTML file, this is what users see when you come to url
├── login.html                          # Page where the user would login/create their account
├── main.html                           # Page users are brought to upon sucessful login
├── .firebaserc                         # 
├── firebase.json                       #
├── firestore.indexes.json              #
├── firestore.rules                     #
├── 404.html                            # Firebase's 404 page from hosting
├── each_location.html                  # The primary page for the "locations" functionality of our app
└── README.md                           # This file you're reading right now

It has the following subfolders and files:
├── .git                                # Folder for git repo
├── .firebase                           #
    hosting..cache                      #
├── .vscode                             #
    settings.json                       #
├── images                              # Folder for images
    /sunrise_log_.png                   # App logo
├── scripts                             # Folder for scripts
    authentication.js                   # JavaScript file for user login/authentication
    each_location.js                    # JavaScript File for populating the full list of locations using firebase data
    favourites.js                       # JavaScript File for adding/removing favourites to/from the database
    firebaseAPI_TEAMDTC14.js            # firebaseAPI_template with firebase keys included (Listed in .gitignore and not github)
    firebaseAPI_template.js             # template for firebaseAPI JavaScript without the actual firebase keys
    location_directions_page.js         # JavaScript File; for getting a users location and drawing a map to their desired destination
    location_page.js                    # JavaScript File; that will populate a page for a specific location from database information
    medical_info.js                     # JavaScript File for populating a specific ailment page with relevant symptoms and treatments
    medical_list.js                     # JavaScript FIle for populating the "Health" tab with a list of ailments and links to their pages
    open_weather_map.js                 # JavaScript File; reads from OpenWeatherMap API and injects data into
    skeleton.js                         # JavaScript File for loading header/navbar
    user_preferences.js                 # JavaScript File for the "profile" section functionality
├── styles                              # Folder for styles
    /blah.css                           #
├──templates
    favourites_templates.html           # HTML template of one of the favourite pages would've looked like
    location_directions_template.html   # HTML template for the directions/map page
    location_options_template.html      # 
    location_page_template.html         # HTML template for a specific, selected location
    login_card_template.html            # HTML template of an earlier version of the login card
    map_box_template.html               # HTML template for testing MapBox
    medical_list_template.html          # HTML template where all medical ailments will be populated
    navbar_template.html                # HTML template for bottom navbar
    open_weater_map_template.html       # HTML template for testing openweathermaps
    search_bar_template.html            # HTML template of what the search bar would've looked like
    top_header_template.html            # HTML template of the top header bar
    user_preferences_template.html      # HTML template for "profile"
    weather_page_template.html          # HTML template of the weather page




```


