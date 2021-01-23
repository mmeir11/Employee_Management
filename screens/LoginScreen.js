import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Pressable, Keyboard, Alert, TouchableOpacity, ActivityIndicator} from 'react-native';
import * as firebase from 'firebase';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import * as Facebook from 'expo-facebook';
import Colors from '../constant/Colors';
import { serverUrl } from '.././constant/urls';

const LoginScreen = props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentUserId, setCurrentUserId] = useState('');
    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {
        Facebook.initializeAsync({ appId: '1328577777474619', appName: 'EmployeeManagment' });
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
                props.navigation.replace('ManagementEmployeeScreen');
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
            setisLoading(true);
            await SignupUser(email, password)
            setisLoading(false);
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
            setisLoading(false);
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
        }
    }

    // const signoutUser = async () => {
    //     firebase.auth().signOut().then(() => {
    //         console.log("signout succuss");
    //         // Sign-out successful.
    //     }).catch((error) => {
    //         // An error happened.
    //         console.log("signout fail");
    //     });
    // }

    if (isLoading){
        return <View style={styles.isLoadingContainer}>
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
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
    isLoadingContainer:{
        flex: 1,
        justifyContent: "center"
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