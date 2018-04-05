import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Card } from 'react-native-material-ui';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HTML from 'react-native-render-html';
import { client } from '../../services/tumblr';

export default class CardView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data || {},
            liked: this.props.data.liked || false,
        }
        // console.log(this.props.data.)
    }
    // async componentDidMount() {
    //     const a = await fetch('https://api.tumblr.com/v2/blog/'+this.state.data.blog_name+'.tumblr.com/avatar/64').then(data => data)
    //     a.json().then((b) => console.log(b)).catch((err) => console.log(err))
    // }
    render() {
        const win = Dimensions.get('window');
        if (this.state.data.type === 'photo') {
            const ratio = win.width / this.state.data.photos[0].original_size.width;
            return (
                <Card>
                    <View style={styles.header}>
                        <Image
                            style={styles.avatar}
                            // source={require('../../../assets/Tumblr.png')}
                            source={{ uri: 'https://api.tumblr.com/v2/blog/'+this.state.data.blog_name+'.tumblr.com/avatar/64'}}
                            
                        />
                        <Text style={styles.username}>{this.state.data.blog_name}</Text>
                    </View>
                    <View style={styles.content}>
                        <Image
                            style={{
                                flex: 1,
                                resizeMode: 'contain', width: win.width, height: this.state.data.photos[0].original_size.height * ratio
                            }}
                            // source={require('../../../assets/test_img.png')}
                            source={{ uri: this.state.data.photos[0].original_size.url}}
                            resizeMode='contain'
                        />
                        <HTML html={this.state.data.summary} imagesMaxWidth={Dimensions.get('window').width} />
                        {/* <Text>
                            {this.state.data.summary}
                        </Text> */}
                        <View style={styles.hashtag}>
                            <Text>
                                {this.state.data.tags.join('#')}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity>
                            <Text style={styles.notes}>{this.state.data.note_count} notes</Text>
                        </TouchableOpacity>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.actions}>
                                <MaterialCommunityIcons name="send" size={24} color='grey' />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actions} onPress={() => this._onReblog(this.state.data.blog_name, this.state.data.id, this.state.data.reblog_key, 'this is a fucking comment')}>
                                <MaterialCommunityIcons name="tumblr-reblog" size={24} color='grey' />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actions} onPress={() => this._onLike(this.state.data.id, this.state.data.reblog_key)}>
                                <MaterialCommunityIcons name="heart" size={24} color={this.state.liked ? 'red' : 'grey'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Card>
            );
        } else return null

    }
    _onLike = (post_id, reblog_key) => {
        client.likePost(post_id, reblog_key, function (err, data) {
            // alert('fuck yea liked');
            if (err) {
                console.log(err)
            } else console.log(data)
        });
        this.setState({
            liked: !this.state.liked
        })
    }

    _onReblog = (blog_name, post_id, reblog_key, comment) => {
        const option = {
            id: post_id,
            reblog_key: reblog_key,
            comment: comment
        }
        client.reblogPost(blog_name + '.tumblr.com', option, function (err, data) {
            alert('Reblog successful');
            if (err) {
                console.log(err)
            } else console.log(data)
        });
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: 64,
        alignItems: 'center',
        paddingLeft: 8,
        paddingRight: 8
    },
    avatar: {
        height: 52,
        width: 52
    },
    username: {
        paddingLeft: 8,
        fontFamily: 'Roboto-Bold',
        fontSize: 15
    },
    content: {
        width: '100%'
    },
    hashtag: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        alignItems: 'center'
    },
    notes: {
        marginLeft: 8
    },
    actions: {
        width: 40
    }
});
