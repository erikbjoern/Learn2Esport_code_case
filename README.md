# Code case for Learn2Esport

Deployed app: [https://l2e-codecase.netlify.app/](https://l2e-codecase.netlify.app/)

## Features
The main functionality of this small application is to be a search enginge for countries. I did however not implement it as a search normally works - that a new request is made for each search - instead I chose to fetch all countries at once when the page is opened, then store all of them and perform a local search - filter by whatever the user searches for. This is not a scalable solution, but since there are only 250 countries in the world, loading all of them is done quickly with a descent connection. This method makes the searching itself fast, which makes for an effortless user experience.

### Search functionality
* The search functionality is implemented as a frontend filter applied to the response
* The result is sorted alphabetically by country name
* Countries which name starts with the search word is prioritised over others. 
E.g. when typing "sw", Sweden will appear before Botswana.
* The filtering is case insensitive
* The input field is debounced with a short timeout for a slightly less crazy, but still responsive experience
* The input field can be cleared by clicking a small "X" icon

### Modal
* When a country card is clicked, it triggers a modal to open.
* It displays the country flag, name and continent along with three random countries from the same continent and a number of how many more there are in the continent

### Extra search functionality
* Beyond the requirements I chose to implement support for native names (E.g. when typing "sver", Sweden will appear because of its native name "Sverige")
* Search by native name is only giving results if the name starts with the search string
* When searching for an exact match of any continent name in English, all countries in that continent is listed 
* When the bottom text of the modal is clicked (saying " + 51 more "), the app will autofill the input with the continent name and display the results

### Keyboard
* The country cards has a tabindex and can be opened by pressing Enter
* When a card is opened, showing a modal, it can be closed again using Escape
* When the modal is opened, the cards in the background lose their tabindex

### Accessibility
* When the input field is focused, the window scrolls down slightly, displaying more of the search results
* The modal has a fixed position until the screen becomes too narrow to fit it. It then gets an absolute position which can cause the modal to be placed out of view. Therefore the window will automatically scroll to the top if this happens.

## Packages
* The input field uses [react-debounce-input](https://www.npmjs.com/package/react-debounce-input)
* [React-flag-icon-css](https://www.npmjs.com/package/react-flag-icon-css) for rectangular flags which also are Windows compatible
* The application queries the database using [apollo-client](https://www.npmjs.com/package/apollo-client) and 
* [graphql](https://www.npmjs.com/package/graphql)
* [TypeScript](https://www.typescriptlang.org/download) and type packages

## Styling
* This project uses CSS modules, which are supported out of the box by create-react-app
* The styling is done based on the high fidelity prototype I was given
* The application is responsive to different viewports, no specific device taken into account
* The modal is opened with an animation and is closed with animation if bottom text is clicked
* The font Roboto is fetched from [Google Fonts](https://fonts.google.com/specimen/Roboto?query=roboto)
* Background images are property of [Riot Games](https://www.riotgames.com/en)
* Icons are provided by [Font Awesome](https://fontawesome.com/)
* Logo and favicon are property of [Learn2Esport](https://learn2esport.com/)

## Database
* All country data, except full name of continents, is fetched from [countries.trevorblades.com](https://github.com/trevorblades/countries#readme)

## Further improvements
* The flags should be lazy loaded
* On mobile, it seems they are lazy loaded by default, but opening the modal does not trigger the flag to load
* The modal needs some small adjustments with regards to responsive styling

## This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
