import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Animated, Keyboard } from 'react-native';
import { Icon, Button } from 'react-native-material-ui';
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageSize: new Animated.Value(0.5),
            keyboardHeight: 0
        }
        this._keyboardDidShow = this._keyboardDidShow.bind(this);
        this._keyboardDidHide = this._keyboardDidHide.bind(this);
        this.keyboardAnimation = this.keyboardAnimation.bind(this);
        this.positionOfInput = new Animated.Value(0);
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }
    componentDidMount() {
        this.positionOfInput.setValue(0);
        Animated.timing(                  // Animate over time
            this.state.imageSize,            // The animated value to drive
            {
                toValue: 1,                   // Animate to opacity: 1 (opaque)
                duration: 1000,              // Make it take a while
            }
        ).start();                        // Starts the animation
    }
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }


    render() {
        let imageSize = this.state.imageSize;
        console.log('this.state.positionOfInput',this.positionOfInput);
        
        let positionOfInput = this.positionOfInput;
        return (
            <View style={styles.container}>
                <Animated.Image
                    style={[styles.logo, { transform: [{ scale: imageSize }, {translateY: Animated.add(0, Animated.multiply(-0.5, positionOfInput))}] }]}
                    source={require('../assets/Tumblr.png')}
                />
                <Animated.View
                    style={[styles.inputContainer,{ transform: [{ translateY: Animated.add(0, Animated.multiply(-1, positionOfInput)) }]}]}
                >
                    <TextInput
                        style={styles.textInput}
                        placeholder='Email'
                        placeholderTextColor='grey'
                        underlineColorAndroid='transparent'

                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Password'
                        placeholderTextColor='grey'
                        underlineColorAndroid='transparent'
                        secureTextEntry={true}
                    />
                    <Button raised style={{container: styles.button, text: {color: '#fff'}}} text="Login" />
                </Animated.View>
            </View>
        );
    }
    _keyboardDidShow(e) {
        // this.setState({
        //     keyboardHeight: e.endCoordinates.height
        // })
        this.iconAnimation(true)
        this.keyboardAnimation(true, e.endCoordinates.height)
        
    }

    _keyboardDidHide() {
        this.iconAnimation(false)
        this.keyboardAnimation(false)
        
    }
    keyboardAnimation(isFocus, height) {
        if (isFocus) {
            Animated.timing(
                this.positionOfInput,
                {
                    toValue: height,
                    duration: 500,
                }
            ).start();
        } else {
            Animated.timing(
                this.positionOfInput,
                {
                    toValue: 0,
                    duration: 500,
                }
            ).start();
        }
    }
    iconAnimation(isFocus) {
        if (isFocus) {
            Animated.timing(
                this.state.imageSize,
                {
                    toValue: 0.5,
                    duration: 500,
                }
            ).start();
        } else {
            Animated.timing(
                this.state.imageSize,
                {
                    toValue: 1,
                    duration: 500,
                }
            ).start();
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgb(46,68,87)',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logo: {
        marginTop: 48
    },
    inputContainer: {
        width: '80%',
        minHeight: 32,
        marginBottom: 24
        
    },
    textInput: {
        width: '100%',
        color: 'grey',
        fontFamily: 'Roboto',
        fontSize: 15,
        minHeight: 32,
        lineHeight: 32,
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 4,
        paddingTop: 4,
        borderBottomWidth: 2,
        borderBottomColor: 'rgb(0,122,204)',
    },
    button: {
        width: '50%',
        backgroundColor: 'rgb(0,122,204)',
        marginTop: 24,
        alignSelf: 'center',
    }
});
