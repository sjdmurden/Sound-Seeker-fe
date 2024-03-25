import * as React from 'react';
import { Searchbar, TextInput } from 'react-native-paper';
import { useState } from 'react';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import { useSearchBox } from 'react-instantsearch-hooks';

const SearchScreen = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [festivalResult, setFestivalResult] = useState('')
  console.log('our search: ',searchQuery);

  const { query, refine } = useSearchBox(props);
  const [searchValue, setSearchValue] = useState(query);
  const inputRef = useRef(null);

 const updateQuery = (newQuery) => {
    setSearchValue(newQuery);
    refine(newQuery);
  }

  if (query !== searchValue && !inputRef.current?.isFocused()) {
    setSearchValue(query);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        ref={inputRef}
        value={searchValue}
        onChangeText={updateQuery}
        clearButtonMode="while-editing"
        placeholder='Search'
      />
    </View>
  );
}

  function handleSearch(event){
   event.preventDefault()
     function searchAllFestivals(festival_name) {
      return axios.get(`https://www.skiddle.com/api/v1/events?api_key=638e2af9d6545b37c5bf2afbed3261cc&eventcode=FEST&keyword=${festival_name}&description=1`)
      .then((response) => {
         console.log(response.data.results[0], '<-- search result')
         if(response.data.results.length > 0){
            setFestivalResult(response.data.results)
         } else {
            setFestivalResult('No festival found')
         }
         setSearchQuery('')
      })
     }

  }

  
   export default SearchScreen;
   
   // <SafeAreaView>
   //    <Searchbar
   //      placeholder="Search"
   //      onChangeText={setSearchQuery}
   //      value={searchQuery}
   //      onSubmitEditing = {() => searchAllFestivals(searchQuery)}
   //    />
   //    {festivalResult.map((festival) => {
   //       return (
   //          <SafeAreaView>
   //             <Text key={festival.id}>{festival.eventname}</Text>
   //          </SafeAreaView>
   //       )
   //    })}

   // </SafeAreaView>