import React from 'react';
import { StyleSheet, Text, View, ScrollView, Platform, StatusBar, StatusBarAnimation } from 'react-native';
import CardView from '../../components/card/CardView';
import CardViewVideo from '../../components/card/CardViewVideo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { client } from '../../services/tumblr';
export default class Dashboard extends React.Component {
    static navigationOptions = {
        header: null,
        tabBarIcon: ({ focused }) => (
            focused
                ? <MaterialCommunityIcons style={styles.tabIconStyle} name="home" size={24} color='white' />
                : <MaterialCommunityIcons style={styles.tabIconStyle} name="home" size={24} color='grey' />
        )
    }
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        this.getPosts = this.getPosts.bind(this);
    }
    componentDidMount() {
        this.getPosts(20, 0);
    }

    render() {

        return (
            <ScrollView
                style={styles.container}
                onScroll={this.handleScroll.bind(this)}
                scrollEventThrottle={64}
            >
                <View style={Platform.OS == 'ios' ? styles.paddingTopIOS : styles.paddingTop24} />
                {this.state.data.map((item, index) => {
                    switch (item.type) {
                        case 'photo' :
                            return <CardView key={'card' + index} data={item} />
                            break;
                        case 'video' :
                            return <CardViewVideo key={'cardVideo' + index} data={item} />
                            break;                            
                        default:
                            return null
                    }
                })}

            </ScrollView>
        );
    }

    async getPosts(limit, offset) {
        await client.taggedPosts('trending', async function (err, data) {
            if (err) {

            } else {
                await this.setState({
                    data: data
                })
            }
            return data;
        }.bind(this));

    }
    handleScroll(event) {
        if (event.nativeEvent.contentOffset.y <= 0) {
            StatusBar.setHidden(false, 'fade')
        } else {
            StatusBar.setHidden(true, 'fade')
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(46,68,87)',
        flex: 1
    },
    paddingTop24: {
        paddingTop: 24
    },
    paddingTopIOS: {
        paddingTop: 32
    },
    tabIconStyle: {
        alignSelf: 'center',
        marginTop: 8
    }

});
