import { Text } from "react-native-paper";
import Loading from "./Loading";
import { ScrollView } from "react-native";
import FestivalCard from "./FestivalCard";
import { getArtistsInfo } from "../api";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../Contexts/user";
import { compatibilityCalculator } from "../utils/compatibilityCalculator";

const FestivalList = ({ festivalResult, setFestivalResult, isLoading, setIsLoading, error, location }) => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  useEffect(() => {
    if (isLoading)
    {
      compatibilityCalculator(festivalResult, loggedInUser)
        .then((newFestivalResult) => {
          newFestivalResult.sort((previous, current) => {
            let previousCompatibilityValue = previous.compatibility;
            let currentCompatibilityValue = current.compatibility;
            if (
              currentCompatibilityValue === "Unable to calculate compatibility"
            ) {
              currentCompatibilityValue = -2;
            } else if (currentCompatibilityValue === "Lineup TBA") {
              currentCompatibilityValue = -1;
            } else {
              currentCompatibilityValue = Number(
                currentCompatibilityValue.match(/\d+/)[0]
              );
            }
            if (
              previousCompatibilityValue === "Unable to calculate compatibility"
            ) {
              previousCompatibilityValue = -2;
            } else if (previousCompatibilityValue === "Lineup TBA") {
              previousCompatibilityValue = -1;
            } else {
              previousCompatibilityValue = Number(
                previousCompatibilityValue.match(/\d+/)[0]
              );
            }
            return currentCompatibilityValue - previousCompatibilityValue;
          });
          setFestivalResult(() => {
            setIsLoading(false);
            return newFestivalResult
          });
        });
    }
  }, [isLoading]);

  return (
    isLoading ?
      <Loading />
      :
      <ScrollView style={{ height: "50%" }}>
        {festivalResult.map((festival) => {
          return (
            <FestivalCard
              key={festival.id}
              festival={festival}
              location={location}
            />
          );
        })}
      </ScrollView>
  );
};

export default FestivalList;