import React, { useState, createRef } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Button
} from 'react-native';

import Loader from './Components/Loader';
import productApi from '../api/productApi';
import constant from '../constant/constant';

const RegisterScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [userName, setUserName] = useState('');
    const [errortext, setErrortext] = useState('');
    const [loading, setLoading] = useState(false);
    const [
        isRegistraionSuccess,
        setIsRegistraionSuccess
    ] = useState(false);

    const emailInputRef = createRef();
    const nameInputRef = createRef();
    const phoneInputRef = createRef();
    const passwordInputRef = createRef();

    const handleSubmitPress = async () => {
        setErrortext('');
        if (!userName) {
            alert('Please fill Name');
            return;
        }
        if (!email) {
            alert('Please fill Email');
            return;
        }
        if (!phone) {
            alert('Please fill Age');
            return;
        }
        if (!password) {
            alert('Please fill Password');
            return;
        }
        setLoading(true);
        try {
            const createUser = await productApi.create({
                email: email,
                password: password,
                fullname: userName,
                phone: phone
            })
            console.log('111sss', createUser);
            if (createUser.statusCode === constant.STATUS_CODE_SUCCESS) {
                // setIsRegistraionSuccess(true);
                navigation.navigate('LoginScreen');
            } else {
                setErrortext('fail');
            }
        } catch (error) {
            console.log('11111', error);
        }

    }
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}
                >
                    <Image
                        source={require('../assets/valor.png')}
                        style={styles.image}
                    />
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Username."
                            placeholderTextColor="#003f5c"
                            secureTextEntry={false}
                            onChangeText={(userName) => setUserName(userName)}
                            ref={emailInputRef}
                            onSubmitEditing={() =>
                                emailInputRef.current && emailInputRef.current.focus()}
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
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
                            placeholder="Phone."
                            placeholderTextColor="#003f5c"
                            keyboardType="phone-pad"
                            onChangeText={(phone) => setPhone(phone)}
                            onSubmitEditing={() =>
                                phoneInputRef.current &&
                                phoneInputRef.current.focus()
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
                            onSubmitEditing={() =>
                                passwordInputRef.current &&
                                passwordInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
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
                        <Text style={styles.loginText}>REGISTER</Text>
                    </TouchableOpacity>
                    
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

export default RegisterScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
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
        width: 250,
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
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
      },
})