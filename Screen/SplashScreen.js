import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';



const SplashScreen = ({ navigation }) => {
    const [animate, setAnimate] = useState(true);
    useEffect(() => {
        setAnimate(false);
        setTimeout(async () => {
            const item = await AsyncStorage.getItem('user_id');
            console.log('item11', item);
            if (!item) {
                navigation.replace('Auth');
            }
        }, 2000)
    }, [])

    return (
        <View>
            <Image
                source={require('../assets/valor.png')}
                style={{ width: '90%', resizeMode: 'contain', margin: 30 }}
            />
            <ActivityIndicator
                animating={animate}
                color="#FFFFFF"
                size="large"
                style={styles.activityIndicator}
            />
        </View>
    )
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#307ecc',
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
})
