import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {Main} from './src/main/Main';
import {MemoSvgHeader} from './src/assets/headerSVG';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollBar}>
        <View style={styles.logoWrap}>
          <MemoSvgHeader />
          <Text style={styles.title}>Заметки</Text>
        </View>
        <Main />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  logoWrap: {
    position: 'relative',
    top: 0,
    width: '100%',
    left: 0,
    marginBottom: 29,
  },
  title: {
    position: 'absolute',
    top: 80,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 28,
    lineHeight: 33,
    color: '#FFFFFF',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Raleway',
  },
  scrollBar: {backgroundColor: '#FFFFFF'},
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Raleway',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Raleway',
  },
  highlight: {
    fontWeight: '700',
    fontFamily: 'Raleway',
  },
});

export default App;
