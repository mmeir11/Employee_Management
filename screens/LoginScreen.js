import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Pressable, Keyboard, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import Colors from '../constant/Colors';
import { serverUrl } from '.././constant/urls';
import Loading from '../component/Loading';
import * as Google from 'expo-google-app-auth'


const LoginScreen = props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userGoogleIngo, setUserGoogleIngo] = useState('');
    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {
        Facebook.initializeAsync({ appId: '1328577777474619', appName: 'EmployeeManagment' });

    }, [])

    useEffect(() => {
        props.navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const SignupUser = async (email, password) => {
        try {

            const response = await fetch(`${serverUrl}/signup`, {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }) // body data type must match "Content-Type" header
            });

            const resData = await response.json();

            if (response.status == 200) {
                props.navigation.replace('ManagementEmployeeScreen');
            }
            else {
                throw new Error(resData.error);
            }
        }
        catch (error) {
            return Alert.alert(
                'Alert',
                error.message,
                [
                    { text: "OK" }
                ],
                { cancelable: true }
            );
        }
    }

    const signupHandler = async () => {
        try {
            setisLoading(true);
            await SignupUser(email, password)
        }
        catch (error) {
            return Alert.alert(
                'Alert',
                error.message,
                [
                    { text: "OK" }
                ],
                { cancelable: true }
            );
        }
        finally {
            setisLoading(false);
        }
    }

    const SigninUser = async (email, password) => {

        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (user) => {

                const idToken = await firebase.auth().currentUser.getIdToken(true);

                const response = await fetch(`${serverUrl}/signin`, {
                    method: 'POST',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ idToken: idToken })
                });

                if (response.status == 200) {
                    props.navigation.replace('ManagementEmployeeScreen');
                }
            })
            .catch((err) => {
                throw new Error(err.message);
            })
    }

    const signinHandler = async () => {
        try {
            setisLoading(true);
            await SigninUser(email, password);
        }
        catch (error) {
            Alert.alert(
                'Alert',
                error.message,
                [
                    { text: "OK" }
                ],
                { cancelable: true }
            );
        }
        finally {
            setisLoading(false);
        }
    }

    const facebookLoginHandler = async () => {
        console.log("facebookLoginHandler");

        const { type, token } = await
            Facebook.logInWithReadPermissionsAsync(
                {
                    permission: "public_profile"
                }
            );

        // console.log(type );
        console.log(token);

        if (type == 'success') {
            var credential = new firebase.auth().FacebookAuthProvider().credential({ accessToken: token });

            // console.log("credential.oauthAccessToken", credential.oauthAccessToken);
            // console.log(credential);

            firebase.auth().signInWithCredential(credential)
                .then(() => {
                    // console.log(s);
                    console.log("Facebook succuss");
                })
                .catch((error) => {
                    console.log("error", error);
                })

        }
    }

    const googleLogin = async () => {
        try {
            const result = await Google.logInAsync({
                // behavior: 'web',
                androidClientId: "701219857684-ksnqa2diggtq11246fhm2dktvajp3ph3.apps.googleusercontent.com",
                iosClientId: "701219857684-vdkem86kiv88rcnqk2q3tq0ssml1t5t9.apps.googleusercontent.com",
                scopes: ["profile", "email"]

            })
            if (result.type === "success") {
                const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
                
                // firebase.auth().signInAndRetrieveDataWithCredential(credential).then(function (result) {
                firebase.auth().signInWithCredential(credential).then(function (result) {
                    console.log("SUCCSESS");
                });
                props.navigation.replace('ManagementEmployeeScreen');
            } else {
                console.log("cancelled")
            }
        } catch (error) {
            Alert.alert(
                'Alert',
                error.message,
                [
                    { text: "OK" }
                ],
                { cancelable: true }
            );
        }
    }


    if (isLoading) {
        return <Loading />
    }
    return (
        <Pressable style={styles.root} onPress={() => Keyboard.dismiss()}>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Login / Sign up</Text>
                <TextInput placeholder='Email' value={email} onChangeText={text => setEmail(text)} keyboardType="email-address" style={styles.inputText} autoCapitalize='none' ></TextInput>
                <TextInput placeholder='Password' onChangeText={text => setPassword(text)} secureTextEntry={true} style={styles.inputText} autoCapitalize='none'></TextInput>

                <TouchableOpacity onPress={signinHandler} style={styles.BtnLogin} >
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={signupHandler} style={{ ...styles.BtnLogin, backgroundColor: '#e9ecef' }}>
                    <Text>Sign up</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={googleLogin} style={{ ...styles.BtnLogin, backgroundColor: '#000', }} >
                    <Text style={{ color: 'white' }}>Sign in with Google</Text>
                </TouchableOpacity>

            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary
    },
    inputContainer: {
        width: '80%',
        height: '60%',
        alignContent: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: Colors.lightGray,
        backgroundColor: Colors.lightGray

    },
    title: {
        // height: 100,
        fontSize: 20,
        padding: 4,
        marginBottom: 30,
        fontWeight: 'bold',
    },
    inputText: {
        width: '85%',
        height: 40,
        backgroundColor: Colors.white,
        borderRadius: 20,
        margin: 5,
        textAlign: 'center'
    },
    BtnLogin: {
        width: '60%',
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.lightGray,
        alignItems: 'center',
        // backgroundColor: '#e8eddf',
        backgroundColor: Colors.offright,
        margin: 3,
    },

});

export default LoginScreen;