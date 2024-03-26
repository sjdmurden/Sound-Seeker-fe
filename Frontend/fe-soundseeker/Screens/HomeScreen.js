import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SearchScreen } from './SearchScreen'

const HomeScreen = () => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <SearchScreen/>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})