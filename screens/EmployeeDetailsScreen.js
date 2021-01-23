import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Pressable, Keyboard, Alert } from 'react-native';
// import * as firebase from 'firebase';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import * as Facebook from 'expo-facebook';

import Colors from '../constant/Colors';

const EmployeeDetailsScreen = props => {

    const [employeeName, setEmployeeName] = useState('');
    const [employeeAge, setEmployeeAge] = useState('');
    const [employeeSalary, setEmployeeSalary] = useState('');
    const [employeeId, setEmployeeId] = useState('');

    useEffect(() => {
        // if employee exist-edit mode, set his details
        if (props.route.params.employee) {
            const currentEmployee = props.route.params.employee;

            setEmployeeName(currentEmployee.employee_name);
            setEmployeeAge(currentEmployee.employee_age);
            setEmployeeSalary(currentEmployee.employee_salary);
            setEmployeeId(currentEmployee.id)
        }
        else{ // if employee not exist-create mode, generate new id
            var id = generateID();
            setEmployeeId(id);
        }
    }, []);

    const generateID = () => {
        return `${new Date().getTime()}`;
    }

    const onConfirmHandler = async () => {
        if (!employeeName || !employeeAge || !employeeSalary) {
            return Alert.alert(
                "Alert",
                "Please fill in all the fields",
                [
                    { text: "OK" }
                ],
                { cancelable: true }
            )
        }
        
        const currentEmployee = {
            employee_name: employeeName,
            employee_age: employeeAge,
            employee_salary: employeeSalary,
            id: employeeId,
        };

        await props.route.params.onConfirm(currentEmployee);
        props.navigation.goBack();
    }

    return (
        <Pressable style={styles.root} onPress={() => { Keyboard.dismiss() }}>
            <View style={styles.addEmployeeModel}>
                <Text style={styles.title}>{props.route.params.title}</Text>
                <TextInput placeholder='Full name' value={employeeName} onChangeText={text => setEmployeeName(text)} style={styles.inputText} autoCapitalize='none' ></TextInput>
                <TextInput placeholder="Age" value={employeeAge} onChangeText={text => setEmployeeAge(text)} keyboardType="numeric" style={styles.inputText} autoCapitalize='none'></TextInput>
                <TextInput placeholder="Salary" value={employeeSalary} onChangeText={text => setEmployeeSalary(text)} keyboardType="numeric" style={styles.inputText} autoCapitalize='none'></TextInput>
                <Button title='Confirm' onPress={onConfirmHandler} name='loginBtn'></Button>
            </View>
        </Pressable>

    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        // backgroundColor: '#dee2e6',

    },
    addEmployeeModel: {
        width: '80%',
        height: '60%',
        backgroundColor: 'white',
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
        fontSize: 20,
        padding: 4,
    },
    inputText: {
        width: '80%',
        height: 40,
        backgroundColor: Colors.white,
        borderRadius: 20,
        margin: 12,
        textAlign: 'center'
    },
});

export default EmployeeDetailsScreen;