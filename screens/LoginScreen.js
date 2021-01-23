import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Pressable, Keyboard, Alert, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import * as Facebook from 'expo-facebook';
import Colors from '../constant/Colors';
import { serverUrl } from '.././constant/urls';

const LoginScreen = props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentUserId, setCurrentUserId] = useState('');

    useEffect(() => {
        Facebook.initializeAsync({ appId: '1328577777474619', appName: 'EmployeeManagment' });

        // firebase.auth().onAuthStateChanged((user => {
        //     // console.log("on change User", user);
        //     if (user != null) {
        //         // console.log("onAuthStateChanged");
        //         // props.navigation.navigate('ManagementEmployeeScreen');
        //     }
        // }));

    }, [])

    const SignupUser = async (email, password) => {
        try {
            console.log("SignupUser", email, password);

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
                setCurrentUserId(resData.uid)
            }
            else {
                throw new Error(resData.error);
            }
        }
        catch (error) {
            signoutUser();
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
            SignupUser(email, password)
        }
        catch (error) {
            signoutUser();
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

    const SigninUser = async (email, password) => {
        console.log("SigninUser", email, password);

        // const resSigninData = 
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (user) => {

                const idToken = await firebase.auth().currentUser.getIdToken(true);
                console.log("IdToken", idToken);

                const response = await fetch(`${serverUrl}/signin`, {
                    method: 'POST',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ idToken: idToken }) 
                    // body: { idToken: idToken }
                });


                const resData = await response.json();
                console.log("resData", resData);
                if (resData.status == 200) {
                    console.log("resData.status == 200");

                    // setCurrentUserId("resData.status == 200")
                }


            })
            .catch((err) => {
                console.log(err);
            })



    }

    const signinHandler = async () => {
        try {
            SigninUser(email, password);

        } catch (error) {
            console.log(error);
            // signoutUser();
            // return Alert.alert(
            //     'שגיאת התחברות',
            //     error.message,
            //     [
            //         { text: "אישור" }
            //     ],
            //     { cancelable: true }
            // );
        }
    }

    const facebookLoginHandler = async () => {

        const { type, token } = await
            Facebook.logInWithReadPermissionsAsync(
                {
                    permission: "public_profile"
                }
            );

        if (type == 'succuss') {
            const credential = new firebase.auth.FacebookAuthProvider().credential(token);

            await firebase.auth().signInWithCredential(credential).catch((error) => {
                console.log("error", error);
            })
            // firebase
            //     .auth()
            //     .signInWithPopup(provider)
            //     .then((result) => {
            //         var credential = result.credential;

            //         // The signed-in user info.
            //         var user = result.user;

            //         // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            //         var accessToken = credential.accessToken;

            //         // ...
            //         console.log("facebookLoginHandler succuss", user);
            //     })
            //     .catch((error) => {
            //         // Handle Errors here.
            //         var errorCode = error.code;
            //         var errorMessage = error.message;
            //         // The email of the user's account used.
            //         var email = error.email;
            //         // The firebase.auth.AuthCredential type that was used.
            //         var credential = error.credential;
            //         console.log("errorMessage", errorMessage);
            //         // ...
            //     });
        }
    }

    const signoutUser = async () => {
        firebase.auth().signOut().then(() => {
            console.log("signout succuss");
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
            console.log("signout fail");
        });
    }

    return (
        <Pressable style={styles.root} onPress={() => Keyboard.dismiss()}>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Login/Sign Up</Text>
                <TextInput placeholder='Email' value={email} onChangeText={text => setEmail(text)} keyboardType="email-address" style={styles.inputText} autoCapitalize='none' ></TextInput>
                <TextInput placeholder='Password' onChangeText={text => setPassword(text)} secureTextEntry={true} style={styles.inputText} autoCapitalize='none'></TextInput>

                <TouchableOpacity onPress={signinHandler} style={styles.BtnLogin} >
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={signupHandler} style={{ ...styles.BtnLogin, backgroundColor: '#e9ecef' }}>
                    <Text>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={facebookLoginHandler} style={{ ...styles.BtnLogin, backgroundColor: '#3b5998', }} >
                    <Text style={{ color: 'white' }}>Sign in with Facebook</Text>
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