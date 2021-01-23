
import { createServer } from "miragejs"
const db = require('../Data/db');
// var defaultDatabase = firebase.database();
import * as firebase from 'firebase';
// import config from '.././src/config';


export function makeServer() {
    if (window.server) {
        server.shutdown()
    }

    // if (!firebase.apps.length) {
    //     console.log("firebase.initializeApp");
    //     firebase.initializeApp(config.firebaseConfig);
    // }

    //miragejs
    window.server = createServer({

        routes() {
            this.get("/api/employees", async (schema, request) => {
                return db;
            });

            this.post("/api/employees/create", (schema, request) => {
                console.log("/api/employees/create");
                const newEmployee = JSON.parse(request.requestBody);

                // TODO: add to firebase DB
                const employeeExist = db.employees.find(employee => employee.id == newEmployee.id);
                if (!employeeExist) {
                    // db.employees.push(newEmployee);
                    // res.status(200).send(newEmployee);
                    console.log("new DB", db);
                    return {
                        status: "success",
                        data: newEmployee
                    };
                }
                else { // empolyee exsist
                    res.status(400).send("Employee exist");
                }
                // return schema.users.create(attrs);
            });

            this.post("/api/employees/delete", (schema, request) => {
                const newEmployee = JSON.parse(request.requestBody);
                const employeeExist = db.employees.find(employee => employee.id == newEmployee.id);
                if (!employeeExist) {
                    db.employees.push(newEmployee);
                    res.status(200).send(newEmployee);
                }
                else { // empolyee exsist
                    res.status(400).send("Employee exist");
                }
                // return schema.users.create(attrs);
            });

            this.post("/api/employees/update", (schema, request) => {
                const newEmployee = JSON.parse(request.requestBody);
                const employeeExist = db.employees.find(employee => employee.id == newEmployee.id);
                if (!employeeExist) {
                    db.employees.push(newEmployee);
                    res.status(200).send(newEmployee);
                }
                else { // empolyee exsist
                    res.status(400).send("Employee exist");
                }
                // return schema.users.create(attrs);
            });


            // firebase
            this.get("/api/signup", async (schema, request) => {
                try {
                    console.log("/api/signup");

                    // const userDetails = JSON.parse(request.requestBody);
                    // const email = userDetails.email;
                    // const password = userDetails.password;
                    const email = "fff@f.com";
                    const password = "fff@f.com";
                    console.log(email);
                    
                    const resData = await firebase.auth().createUserWithEmailAndPassword(email, password);
                    console.log(resData);
                    return resData;
                    // .then((user) => {
                    //     console.log("SignupUser", user);
                    //     // setCurrentUserId(user.uid);
                    //     return user;
                    // })
                    // .catch((error) => {
                    //     var errorCode = error.code;
                    //     var errorMessage = error.message;
                    //     throw error;
                    // });
                }
                catch (err) {
                    throw err;
                }

            });

        },
    })
    return window.server;
}