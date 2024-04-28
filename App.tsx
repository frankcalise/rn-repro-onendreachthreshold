/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const data = Array.from({length: 100}, (_, index) => ({
  id: index.toString(),
  title: `Item ${index}`,
  backgroundColor: index % 2 === 0 ? 'lightgrey' : 'darkgreen',
}));

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [endReached, setEndReached] = React.useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const renderItem = React.useCallback((item, index) => {
    return (
      <View style={[$cell, {backgroundColor: item.item.backgroundColor}]}>
        <Text>{item.item.title}</Text>
      </View>
    );
  }, []);

  const onEndReached = React.useCallback(() => {
    console.log('onEndReached');
    setEndReached(true);
  }, []);

  const onViewableItemsChanged = React.useCallback(
    ({changed}) => {
      if (endReached) {
        // console.log('viewableItems', viewableItems);
        console.log('changed', changed);
      }
    },
    [endReached],
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        onEndReached={onEndReached}
        // Docs mention 0.5 being middle of the list, will output around item 89/100
        onEndReachedThreshold={0.5}
        // Value of 5 seems way closer to middle, will output ~52
        // onEndReachedThreshold={5}
        onViewableItemsChanged={onViewableItemsChanged}
        ItemSeparatorComponent={() => <View style={$separator} />}
      />
    </SafeAreaView>
  );
}

export default App;

const $cell: ViewStyle = {
  height: 78,
  alignItems: 'center',
  alignContent: 'center',
};

const $separator: ViewStyle = {
  height: 1,
  backgroundColor: 'black',
};
