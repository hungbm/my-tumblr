import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import HTML from 'react-native-render-html';
import { client } from '../../services/tumblr';
import CardView from '../card/CardView';
import CardViewVideo from '../card/CardViewVideo';

export default class ProfileTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            type: this.props.title,
        }
        this.getData = this.getData.bind(this)
    }
    componentDidMount() {
        this.getData(20, 0);
    }
    render() {
        return (
            <View style={styles.container} >
                <ScrollView
                    style={styles.scroller}
                    onScroll={this.handleScroll.bind(this)}
                    scrollEventThrottle={64}
                >
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
            </View>
        )
    }

    async getData(limit, offset) {
        if (this.state.type === 'posts'){
            await client.userDashboard( async function (err, data) {
                if (err) {
    
                } else {
                console.log('data', data.posts)
                    
                    await this.setState({
                        data: data.posts
                    })
                }
                return data;
            }.bind(this));
        } 
        if (this.state.type === 'likes'){
            await client.userLikes( async function (err, data) {
                if (err) {
    
                } else {
                // console.log('data', data)
                    
                    await this.setState({
                        data: data.liked_posts
                    })
                }
                return data;
            }.bind(this));
        } 
        

    }
    handleScroll(event) {
        // if (event.nativeEvent.contentOffset.y <= 0) {
        //     StatusBar.setHidden(false,'fade')
        // } else {
        //     StatusBar.setHidden(true,'fade')
        // // }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(46,68,87)'
    },
    scroller: {
        flex: 1,
        backgroundColor: 'rgb(46,68,87)'
    },
});
