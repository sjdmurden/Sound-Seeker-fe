# Sound Seeker Frontend

## Northcoders Software Development Final Project

Welcome to **Sound Seeker**, an app to help you decide which festivals to attend this summer.

Sound Seeker was developed as our group project during the final stages of our software developer course at Northcoders. This mobile application, built using React Native, leverages the Spotify and Skiddle APIs, alongside our custom backend, to provide personalised festival recommendations.

A demonstration of the app can be found [here](https://streamable.com/obl05m).

<img src="https://github.com/sjdmurden/Sound-Seeker-fe/assets/81564712/3ac77e4f-7855-4055-9398-6c2ea938a2f7" width=200/>
<img src="https://github.com/sjdmurden/Sound-Seeker-fe/assets/81564712/66991a7e-c9d1-41f3-8c9d-97bbf478dd26" width=200/>
<img src="https://github.com/sjdmurden/Sound-Seeker-fe/assets/81564712/5fd468c6-16fe-48da-9abe-749ceb0aad89" width=200/>
<img src="https://github.com/sjdmurden/Sound-Seeker-fe/assets/81564712/dbc19da1-6284-453f-b7a6-8b18f52ab476" width=200/>
<img src="https://github.com/sjdmurden/Sound-Seeker-fe/assets/81564712/83421a73-1f94-4dbf-836b-53b49ff2288b" width=200/>
<img src="https://github.com/sjdmurden/Sound-Seeker-fe/assets/81564712/6a7a9a5f-62d1-4697-888d-4bbde3a7f855" width=200/>

## Features
- **Search by Festival:** Easily search for festivals by their name, if you already have an idea where you want to go.
- **Search by Artists:** Search for your favourite artists, making it simple to find festivals including them.
- **Search by Location Radius:** Explore festivals within a specified radius of your current location, making it convenient to attend events near you.
- **Compatibility Score:** We calculate a compatibility score based on your top artists and genres, sorting festival recommendations by compatibility to ensure you find the perfect match for your music tastes.
- **Festival Information:** View detailed information about each festival, including the lineup of artists and other essential event details.
## Set up
Below are instructions on how to run our app locally. 
Due to the nature of the Spotify API this process is relatively lengthy, however, following the steps below should help you through the process.

1. **Set Up Backend:** Ensure that the backend server is up and running. You will need to set up the backend separately by following the instructions in the [backend repository](https://github.com/M1nhnho/Sound-Seeker-be).
2. **Clone the Repository:** Clone this repository to your local machine using `git clone`.
3. **Install Dependencies:** Navigate to the project directory and install dependencies by running `npm install`.
5. **Skiddle API:** Obtain API key for [Skiddle](https://www.skiddle.com/api/) by filling out this [form](https://www.skiddle.com/api/join.php).
6. **Create Environment Variables:** Create a `.env.development` file in the root directory of the project and add the following variables:
   
   ```
     EXPO_PUBLIC_CLIENT_ID = your client id from the Spotify dashboard
   
     EXPO_PUBLIC_CLIENT_SECRET = your client secret from the Spotify dashboard
   
     EXPO_PUBLIC_REDIRECT_URI = your redirect URI from the Spotify dashboard
   
     EXPO_PUBLIC_SKIDDLE_API_KEY = ...
   
     EXPO_PUBLIC_BACKEND_API_URL = ...
   ```
7. **Run the App:** After configuring the APIs, run the app on your device or simulator using `npm run start`.
8. **Explore and Enjoy:** Once the app is running, explore the various features and functionalities to discover festivals tailored to your preferences.
## Technologies Used
- **React Native:** Sound Seeker is built using React Native.
- **Expo:** Utilized for a range of handy packages including maps, secure store and authorisation.
- **Spotify API:** Integrated to access user's top artists and genres, personalizing festival recommendations.
- **Skiddle API:** Provides comprehensive information about festivals and events, enriching the app's data.
## Contributors
- James Metcalfe [@jamesraymetcalfe](https://github.com/jamesraymetcalfe)
- David Taylor [@davidtaylor21](https://github.com/davidtaylor21)
- Sebastian Murden [@sjdmurden](https://github.com/sjdmurden)
- Tien Nguyen-Ho [@m1nhnho](https://github.com/m1nhnho)
- Kamilla Mohamed [@kamilla2424](https://github.com/kamilla2424)
- Rayhan Elbeera [@raybeera](https://github.com/raybeera)   
## Feedback
We welcome feedback to enhance Sound Seeker. If you encounter issues or have suggestions for new features, feel free to open an issue.

We hope you enjoy! :notes:
