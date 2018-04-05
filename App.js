import React from 'react';
import { Font } from 'expo';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Login from './src/Login';
import Dashboard from './src/screen/dashboard/Dashboard';
import NavigatorService from './src/services/navigator';
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
      'Roboto-Bold': require('./assets/Font/Roboto/Roboto-Bold.ttf'),
    });
  }
  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <RootStack ref={navigatorRef => {
          NavigatorService.setContainer(navigatorRef);
        }} />
      </ThemeProvider>
    );
  }
}

const RootStack = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerMode: 'screen'
    }
  },
  TabNavigator: {
    screen: TabNavigator({
      Dashboard: {
        screen: Dashboard,
        navigationOptions: {
          headerMode: 'screen'
        }
      },
      Dashboard1: {
        screen: Dashboard,
        navigationOptions: {
          headerMode: 'screen'
        }
      },
    },
      {
        tabBarPosition: 'bottom',
        tabBarOptions: {
          showIcon: true,
          showLabel: false,
          style: {
            backgroundColor: 'rgb(46,68,87)',
            // borderTopColor: 'rgb(46,68,87)',
            // borderTopWidth: 1,
            height: Dimensions.get('window').height * 0.08
          },
          indicatorStyle: {
            backgroundColor: 'transparent',
            width: 0,
            height: 0,
            padding: 0,
            margin: 0
          },
        }
      }
    )
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
