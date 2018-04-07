import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { MaterialIcons } from '@expo/vector-icons';
import ProfileTab from '../../components/ProfileTab/ProfileTab';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const PostsRoute = () => <ProfileTab title='posts'/>;
const LikesRoute = () => <ProfileTab title='likes'/>;

export default class Profile extends React.Component {
    static navigationOptions = {
        header: null,
        tabBarIcon: ({ focused }) => (
            focused
                ? <MaterialIcons style={styles.tabIconStyle} name="person" size={24} color='white' />
                : <MaterialIcons style={styles.tabIconStyle} name="person" size={24} color='grey' />
        )
    }
  state = {
    index: 0,
    routes: [
      { key: 'posts', title: 'Posts' },
      { key: 'likes', title: 'Likes' },
    ],
  };

 componentWillMount() {
  StatusBar.setHidden(false, 'fade')   
 }

  render() {
    return (
      <TabViewAnimated
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
        initialLayout={initialLayout}
      />
    );
  }
  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar style={styles.tabHeaderIOS} {...props} />;

  _renderScene = SceneMap({
    posts: PostsRoute,
    likes: LikesRoute,
  });
}

const styles = StyleSheet.create({
  tabHeaderIOS: {
    paddingTop: 32,
    backgroundColor: 'rgb(46,68,87)',
  },
  tabIconStyle: {
    alignSelf: 'center',
    marginTop: 8
}
});