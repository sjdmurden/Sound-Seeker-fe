import * as React from "react";
import { Text } from "react-native-paper";
import Loading from "./Loading";
import { ScrollView } from "react-native";
import FestivalCard from "./FestivalCard";
import { getArtistInfo } from "../api";
import { useEffect } from "react";

const FestivalList = ({
  festivalResult,
  setFestivalResult,
  error,
  isLoading,
  setIsLoading,
}) => {
  useEffect(() => {
    if (Object.keys(festivalResult).length > 0) {
      festivalResult.forEach((festival) => {
        artistsId = festival.artists.map((artist) => {
          const spotifyUrl = artist.spotifyartisturl;
          if (spotifyUrl) {
            const splitUrl = spotifyUrl.split(":");
            return splitUrl[splitUrl.length - 1];
          }
          getArtistInfo(artistsId, loggedInUser).then((response) => {
            setFestivalResult((currentResult) => {
              const resultCopy = JSON.parse(JSON.stringify(currentResult));
              resultCopy[festivalIndex].isLoaded = true;
              return resultCopy;
            });
            return response;
          });
        });
      });
    }
  }, [isLoading]);

  useEffect(() => {
    if (Object.keys(festivalResult).length > 0) {
      if (festivalResult.every((festival) => festival.isLoaded)) {
        setIsLoading(false);
      }
    }
  }, [festivalResult]);

  return (
    <>
      {Object.keys(festivalResult).length > 0 ? (
        festivalResult.every((festival) => festival.isLoaded) ? (
          <ScrollView>
            {festivalResult.map((festival, index) => {
              return (
                <FestivalCard
                  key={festival.id}
                  festival={festival}
                  festivalIndex={index}
                  setFestivalResult={setFestivalResult}
                />
              );
            })}
          </ScrollView>
        ) : (
          <Loading />
        )
      ) : (
        <Text>{error}</Text>
      )}
    </>
  );
};

export default FestivalList;
