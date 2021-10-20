import React, { useState, createRef } from "react";
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
    StatusBar
} from 'react-native';
import productApi from "../api/productApi";
import AsyncStorage from '@react-native-community/async-storage';
import constant from "../constant/constant";
import Loader from "./Components/Loader";
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errortext, setErrortext] = useState('');
    const [loading, setLoading] = useState(false);
    const passwordInputRef = createRef();

    const handleSubmitPress = async () => {
        setErrortext('');
        if (!email) {
            alert('Please fill email');
            return;
        }
        if (!password) {
            alert('Please fill password');
            return;
        }
        setLoading(true);
        try {
            const data = await productApi.login(
                {
                    email: email, password: password
                })
            if (data.statusCode === constant.STATUS_CODE_SUCCESS) {
                AsyncStorage.setItem('user_id', email);
            } else (
                alert('error')
            )
            console.log('22222', data);
            console.log('110000', data.statusCode);
        } catch (error) {
            console.error("error11", error.response.request._response.status);
            alert(error.response.request._response.message)
        }


    }
    return (
        <View style={styles.container}>
            <Loader loading={ loading } />
            <StatusBar
                backgroundColor="#b3e6ff"
                barStyle="dark-content"
                hidden={false}
                translucent={true}
            />
            <Image
                source={require('../assets/valor.png')}
                style={styles.image}
            />
            <View style={styles.inputView}>
                <Input
                    style={styles.TextInput}
                    placeholder="Email."
                    placeholderTextColor="#003f5c"
                    keyboardType="email-address"
                    onChangeText={(email) => setEmail(email)}
                    onSubmitEditing={() =>
                        passwordInputRef.current &&
                        passwordInputRef.current.focus()
                    }
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password."
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                    ref={passwordInputRef}
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                />
            </View>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={handleSubmitPress}
            >
                <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>
                {errortext}
              </Text>
            ) : null}
            <TouchableOpacity
                style={styles.loginBtn}
                activeOpacity={0.5}
                onPress={handleSubmitPress}
            >
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('RegisterScreen')}>
              New Here ? Register
            </Text>

        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
        margin: 10
    },
    image: {
        width: '80%',
        height: 100,
        resizeMode: 'contain',
        margin: 30
    },
    inputView: {
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    forgot_button: {
        height: 30,
        marginBottom: 30,
    },
    loginBtn:
    {
        width: 150,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
    },
    loginText: {
        height: 30,
        marginTop: 10
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
})
