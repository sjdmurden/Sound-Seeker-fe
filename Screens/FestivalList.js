import { Text } from "react-native-paper";
import Loading from "./Loading";
import { ScrollView } from "react-native";
import FestivalCard from "./FestivalCard";
import { getArtistsInfo } from "../api";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../Contexts/user";
import { compatibilityCalculator } from "../utils/compatibilityCalculator";

const FestivalList = ({
  festivalResult,
  setFestivalResult,
  error,
  location,
}) => {
  const [loadingFestivals, setLoadingFestivals] = useState([]);
  const [festivalGenres, setFestivalGenres] = useState([]);
  const [festivalCompatibility, setFestivalCompatibility] = useState([]);

  useEffect(() => {
    if (Object.keys(festivalResult).length > 0) {
      setLoadingFestivals(new Array(festivalResult.length).fill(true));
      festivalResult.forEach((festival, festivalIndex) => {
        compatibilityCalculator(festival).then((compatStr) => {
          setFestivalCompatibility((currFestivalCompatibility) => {
            const compatibilityCopy = [...currFestivalCompatibility];
            compatibilityCopy[festivalIndex] = compatStr;
          });
          setLoadingFestivals((currLoadingFestivals) => {
            const loadingFestivalsCopy = [...currLoadingFestivals];
            loadingFestivalsCopy[festivalIndex] = false;
            return loadingFestivalsCopy;
          });
        });
      });
    }
  }, [festivalResult]);

  return (
    <>
      {Object.keys(festivalResult).length > 0 ? (
        loadingFestivals.every((loading) => loading === false) ? (
          <ScrollView style={{ height: "50%" }}>
            {festivalResult
              .sort((previous, current) => {
                let previousCompatibilityValue =
                  festivalCompatibility[festivalResult.indexOf(previous)];
                let currentCompatibilityValue =
                  festivalCompatibility[festivalResult.indexOf(current)];
                if (
                  currentCompatibilityValue ===
                  "Unable to calculate compatibility"
                ) {
                  currentCompatibilityValue = -2;
                } else if (currentCompatibilityValue === "Lineup TBA") {
                  currentCompatibilityValue = -1;
                } else {
                  currentCompatibilityValue = Number(
                    currentCompatibilityValue.match(/\d+/)
                  );
                }
                if (
                  previousCompatibilityValue ===
                  "Unable to calculate compatibility"
                ) {
                  previousCompatibilityValue = -2;
                } else if (previousCompatibilityValue === "Lineup TBA") {
                  previousCompatibilityValue = -1;
                } else {
                  previousCompatibilityValue = Number(
                    previousCompatibilityValue.match(/\d+/)
                  );
                }
                return currentCompatibilityValue - previousCompatibilityValue;
              })
              .map((festival, index) => {
                return (
                  <FestivalCard
                    key={festival.id}
                    festival={festival}
                    location={location}
                    compatibility={festivalCompatibility[index]}
                  />
                );
              })}
          </ScrollView>
        ) : (
          <Loading />
        )
      ) : (
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            padding: 10,
            fontWeight: "bold",
          }}
        >
          {error}
        </Text>
      )}
    </>
  );
};

export default FestivalList;
