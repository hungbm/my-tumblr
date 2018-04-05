import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import CardView from '../../components/card/CardView';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { client } from '../../services/tumblr';
export default class Dashboard extends React.Component {
    static navigationOptions = {
        header: null,
        tabBarIcon: ({focused}) => (
            focused
            ? <MaterialCommunityIcons name="home" size={24} color='white' />
            : <MaterialCommunityIcons name="home" size={24} color='grey' />
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
            <ScrollView style={styles.container}>
                <View style={styles.paddingTop24} />
                {this.state.data.map((item, index) => <CardView key={'card' + index} data={item} />)}

            </ScrollView>
        );
    }

    async getPosts(limit, offset) {
         await client.taggedPosts('trending', async function(err, data) {
             if (err) {

             } else {
                 await this.setState({
                     data: data
                 })
             }
             return data;
            // console.log('data', data);
          }.bind(this));
        // const result = await client.userDashboard({ limit: limit, offset: offset });

    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(46,68,87)',
        flex: 1
    },
    paddingTop24: {
        paddingTop: 24
    }

});
