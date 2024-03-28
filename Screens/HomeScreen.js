import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchScreen from './SearchScreen'
import { LogOut } from './LogOut'

const HomeScreen = () => {
  return (
    <View>
      <SearchScreen/>
      <LogOut/>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})