# Sound Seeker Frontend

## Northcoders Software Development Final Project

Welcome to **Sound Seeker**, an app to help you decide which festivals to attend this summer.

Sound Seeker was developed as our group project during the final stages of our software developer course at Northcoders. This mobile application, built using React Native, leverages the Spotify and Skiddle APIs, alongside our custom backend, to provide personalised festival recommendations.

To view a hosted version of the app, please click [LINK]

## Features
- **Search by Festival:** Easily search for festivals by their name, if you already have an idea where you want to go.
- **Search by Artists:** Search for your favourite artists, making it simple to find festivals including them.
- **Search by Location Radius:** Explore festivals within a specified radius of your current location, making it convenient to attend events near you.
- **Compatibility Score:** We calculate a compatibility score based on your top artists and genres, sorting festival recommendations by compatibility to ensure you find the perfect match for your music tastes.
- **Festival Information:** View detailed information about each festival, including the lineup of artists and other essential event details.
## Getting Started
To start using Sound Seeker:
1. **Set Up Backend:** Ensure that the backend server is up and running. You may need to set up the backend separately by following the instructions in the backend repository. ADD LINK
2. **Clone the Repository:** Clone this repository to your local machine using `git clone`.
3. **Install Dependencies:** Navigate to the project directory and install dependencies by running `npm install`.
4. **Configure APIs:** Obtain API key for Skiddle and set up an app on Spotify's dashboard to get a client ID, client secret and to set up the redirect URI. Once obtained, create a `.env.development` file in the root directory of the project and add the following variables:
   
```
  EXPO_PUBLIC_CLIENT_ID = ...

  EXPO_PUBLIC_CLIENT_SECRET = ...

  EXPO_PUBLIC_REDIRECT_URI = ...

  EXPO_PUBLIC_SKIDDLE_API_KEY = ...
  ```
5. **Run the App:** After configuring the APIs, run the app on your device or simulator using `npm run start`.
6. **Explore and Enjoy:** Once the app is running, explore the various features and functionalities to discover festivals tailored to your preferences.
## Technologies Used
- **React Native:** Sound Seeker is built using React Native.
- **Expo:** Utilized for a range of handy packages including maps, secure store and authorisation.
- **Spotify API:** Integrated to access user's top artists and genres, personalizing festival recommendations.
- **Skiddle API:** Provides comprehensive information about festivals and events, enriching the app's data.
## Contributors
- James Metcalfe [@jamesraymetcalfe](https://github.com/jamesraymetcalfe)
- David Taylor [@davidtaylor21](https://github.com/davidtaylor21)
- Seb Murden [@sjdmurden](https://github.com/sjdmurden)
- Tien Nguyen-Ho [@m1nhnho](https://github.com/m1nhnho)
- Kamilla Mohamed [@kamilla2424](https://github.com/kamilla2424)
- Rayhan Elbeera [@raybeera](https://github.com/raybeera)   
## Feedback and Contributions
We welcome feedback to enhance Sound Seeker. If you encounter issues or have suggestions for new features, feel free to open an issue.

We hope you enjoy! :notes:
