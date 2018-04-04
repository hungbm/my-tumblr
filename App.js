import React from 'react';
import { Font } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/Login';
import { COLOR, ThemeProvider } from 'react-native-material-ui';
const uiTheme = {
  palette: {
    primaryColor: COLOR.green500,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};
export default class App extends React.Component {
  componentDidMount() {
    Font.loadAsync({
      'Roboto': require('./assets/Font/Roboto/Roboto-Regular.ttf'),
    });
  }
  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Login />
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
