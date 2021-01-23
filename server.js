const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var admin = require("firebase-admin");
var serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://employeemanagment-26f75-default-rtdb.firebaseio.com/"
});
var db = admin.database();
var auth = admin.auth();

const hostname = '0.0.0.0';
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authoriztion");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
})

app.listen(PORT, hostname, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});

app.get('/', (req, res) => {
    console.log(req.body)
    res.send("Hello");
});

app.get('/employees', async (req, res) => {
    console.log('/employees');
    // res.send(db);
    const resData = await db.ref('employees/').once('value');
    // const data = await resData.snapshot.val();
    res.send(resData);
});

app.post('/employees/create', async (req, res) => {
    const newEmployee = req.body;

    const resData = await db.ref(`employees/${newEmployee.id}`).once('value');
    var currentEmployee = resData.val();
    if (!currentEmployee) {
        db.ref('employees/' + newEmployee.id).set(newEmployee)
            .then(() => {
                res.status(200).send("employee added");
            })
            .catch((err) => {
                res.status(200).send(err.message);
            })
    }
    else { // empolyee exsist
        res.status(400).send("Employee exist");
    }
});

app.get('/employees/:id', async (req, res) => {
    const employeeId = req.params.id;

    const resData = await db.ref(`employees/${employeeId}`).once('value');
    var currentEmployee = resData.val();
    if (currentEmployee) {
        res.status(200).send(currentEmployee);
    }
    else {
        res.status(400).send("Employee not found");
    }
});

app.put('/employees/update/:id', async (req, res) => {
    const employeeId = req.params.id;
    const resData = await db.ref(`employees/${employeeId}`).once('value');
    var currentEmployee = resData.val();
    if (currentEmployee) {
        const updateEmployee = req.body;
        db.ref(`employees/${employeeId}`).update(updateEmployee)
            .then(() => {
                res.status(200).send("Employee updated");
            })
            .catch((err) => {
                res.status(400).send({ error: err.message });
            })
    }
    else {
        res.status(400).send("Employee not found");
    }
});

app.delete('/employees/delete/:id', async (req, res) => {
    const employeeId = req.params.id;
    const resData = await db.ref(`employees/${employeeId}`).once('value');
    var currentEmployee = resData.val();
    if (currentEmployee) {
        db.ref(`employees/${employeeId}`).remove()
            .then(() => {
                res.status(200).send("Employee removed");
            })
            .catch((err) => {
                res.status(400).send({ error: err.message });
            })
    }
    else {
        res.status(400).send("Employee not found");
    }
});


app.post('/signin', async (req, res) => {
    const { idToken } = req.body;

    auth.verifyIdToken(idToken)
        .then((decodedToken) => {
            const uid = decodedToken.uid;
            console.log("SUCCUSS", uid);
            res.status(200).send(uid);
        })
        .catch((error) => {
            res.status(400).send({ error: error.message });
        });
});

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    auth.createUser({ email, password })
        .then((user) => {
            res.status(200).send(user);
        })
        .catch((error) => {
            res.status(400).send({ error: error.message });
        });
});
