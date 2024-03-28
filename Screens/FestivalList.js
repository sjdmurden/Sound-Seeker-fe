import { Text } from "react-native-paper";
import Loading from "./Loading";
import { ScrollView } from "react-native";
import FestivalCard from "./FestivalCard";
import { getArtistInfo } from "../api";
import { useEffect, useState } from "react";

const FestivalList = ({
  festivalResult,
  setFestivalResult,
  error
}) => {
  const [loadingFestivals, setLoadingFestivals] = useState([]);
  useEffect(() => {
    if (Object.keys(festivalResult).length > 0) {
      setLoadingFestivals(new Array(festivalResult.length).fill(true));
      festivalResult.forEach((festival, festivalIndex) => {
        if (festival.artists.length > 0) {
          artistsId = festival.artists.map((artist) => {
            const spotifyUrl = artist.spotifyartisturl;
            if (spotifyUrl) {
              const splitUrl = spotifyUrl.split(":");
              return splitUrl[splitUrl.length - 1];
            }
            getArtistInfo(artistsId, loggedInUser).then((response) => {
              setLoadingFestivals((currLoadingFestivals) => {
                const loadingFestivalsCopy = [...currLoadingFestivals];
                loadingFestivalsCopy[festivalIndex] = false;
                return loadingFestivalsCopy;
              })
              return response;
            });
          });
        } else {
          setLoadingFestivals((currLoadingFestivals) => {
            const loadingFestivalsCopy = [...currLoadingFestivals];
            loadingFestivalsCopy[festivalIndex] = false;
            return loadingFestivalsCopy;
          })
        }
      });
    }
  }, [festivalResult]);

  return (
    <>
      {Object.keys(festivalResult).length > 0 ? (
        loadingFestivals.every((loading) => loading === false) ? (
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
