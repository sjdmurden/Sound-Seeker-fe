import * as React from "react";
import { ActivityIndicator } from "react-native-paper";
import { StyleSheet } from "react-native-web";
import {Text} from "react-native"

const Loading = () => {
  return (
    <>
      <ActivityIndicator
        animating={true}
        size={"large"}
        style={styles.loading}
      />
      <Text>Finding you the best festivals, Please wait...</Text>
    </>
  );
};

const styles = StyleSheet.create({
  loading: {
    padding: 10,
    margin: 20,
    marginTop: 100,
  },
});

export default Loading;
