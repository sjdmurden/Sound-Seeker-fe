import { Text } from "react-native-paper";
import Loading from "./Loading";
import { ScrollView } from "react-native";
import FestivalCard from "./FestivalCard";
import { getArtistsInfo } from "../api";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../Contexts/user";

const FestivalList = ({
  festivalResult,
  setFestivalResult,
  error,
  location,
}) => {
  const [loadingFestivals, setLoadingFestivals] = useState([]);
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [festivalGenres, setFestivalGenres] = useState([]);

  useEffect(() => {
    if (Object.keys(festivalResult).length > 0) {
      setLoadingFestivals(new Array(festivalResult.length).fill(true));
      festivalResult.forEach((festival, festivalIndex) => {
        if (festival.artists.length > 0) {
          const artistsId = festival.artists.map((artist) => {
            const spotifyUrl = artist.spotifyartisturl;
            if (spotifyUrl) {
              const splitUrl = spotifyUrl.split(":");
              return splitUrl[splitUrl.length - 1];
            }
          });
          getArtistsInfo(artistsId, loggedInUser).then((response) => {
            setLoadingFestivals((currLoadingFestivals) => {
              const loadingFestivalsCopy = [...currLoadingFestivals];
              loadingFestivalsCopy[festivalIndex] = false;
              return loadingFestivalsCopy;
            });
            return response;
          });
        } else {
          setLoadingFestivals((currLoadingFestivals) => {
            const loadingFestivalsCopy = [...currLoadingFestivals];
            loadingFestivalsCopy[festivalIndex] = false;
            return loadingFestivalsCopy;
          });
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
                  festivalGenres={festivalGenres[index]}
                  key={festival.id}
                  festival={festival}
                  festivalIndex={index}
                  setFestivalResult={setFestivalResult}
                  location={location}
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
