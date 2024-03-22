import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SpotifyLogin from './spotify-login';
import {AuthSession} from 'expo'
import Navigation from './StackNavigator'
// console.log(AuthSession.getRedirectUrl())

export default function App() {
  return (
    <>
      <Navigation/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



