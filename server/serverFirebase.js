
// // var admin = require("firebase-admin");
// import * as firebase from 'firebase';

// if (!firebase.apps.length) {
//     console.log("firebase.initializeApp");
//   firebase.initializeApp(config.firebaseConfig);
// }

// // var serviceAccount = require("./../serviceAccountKey.json");

// // admin.initializeApp({
// //     credential: admin.credential.cert(serviceAccount),
// //     databaseURL: "https://employeemanagment-26f75-default-rtdb.firebaseio.com"
// // });

// // const db = admin.firestore();

// // const product = {
// //     productName: "Bag",
// //     productPrice: "1000"
// // }
// // a();
// // const a = () => {
// //     console.log("a");

// //     db.collection("productOnSale").doc("product").set(product)
// //         .then(() => {
// //             console.log("ADDED");
// //         })
// // }
// SignupUser("z@z.com", "z@z.com");
// const SignupUser = async (email, password) => {
//     await firebase.auth().createUserWithEmailAndPassword(email, password)
//         .then((user) => {
//             console.log("SignupUser", user);
//             setCurrentUserId(user.uid);
//         })
//         .catch((error) => {
//             var errorCode = error.code;
//             var errorMessage = error.message;
//             throw error;
//         });
// }

// // import * as express from 'express'
// // import * as bodyParser from 'body-parser'


// // admin.initializeApp(functions.config().firebase);
// // const app = express()
// // const main = express()
// // main.use('/Myapi', app)
// // main.use(bodyParser.json())
// // main.use(bodyParser.urlencoded({ extended: false }))

// // const db = admin.firestore()
// // export const webApi = functions.https.onRequest(main)

// // app.post('/saveProduct', async (req, res) => {
// //     const product = {
// //         productName: "Bag",
// //         productPrice: "1000"
// //     }
// //     await db.collection("productOnSale").add(product);
// // });


// // #############################
// /*
// export const SignupUser = async (email, password) => {
//     await firebase.auth().createUserWithEmailAndPassword(email, password)
//         .then((user) => {
//             console.log("SignupUser", user);
//             setCurrentUserId(user.uid);
//         })
//         .catch((error) => {
//             var errorCode = error.code;
//             var errorMessage = error.message;
//             throw error;
//         });
// }
// export const SigninUser = async (email, password) => {
//     await firebase.auth().signInWithEmailAndPassword(email, password)
//         .then((res) => {
//             console.log("Signin succuss");
//             let userUid = res.user.uid;
//             setCurrentUserId(userUid);
//         })
//         .catch((error) => {
//             var errorCode = error.code;
//             var errorMessage = error.message;
//             // setError(errorMessage);
//             throw error;
//         });
// }
// export const facebookLoginHandler = async () => {
//     const { type, token } = await
//         Facebook.logInWithReadPermissionsAsync(
//             {
//                 permission: "public_profile"
//             }
//         );
//     if (type == 'succuss') {
//         const credential = new firebase.auth.FacebookAuthProvider().credential(token);
//         await firebase.auth().signInWithCredential(credential).catch((error) => {
//             console.log("error", error);
//         })
//     }
// }
// export const signoutUser = async () => {
//     firebase.auth().signOut().then(() => {
//         console.log("signout succuss");
//         // Sign-out successful.
//     }).catch((error) => {
//         // An error happened.
//         console.log("signout fail");
//     });
// }
// */
