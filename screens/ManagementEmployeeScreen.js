import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Modal, Pressable, TextInput, Keyboard, Alert } from 'react-native';
import EmployeeCell from '../component/EmployeeCell';
// import EmployeeDetailsScreen from './EmployeeDetailsScreen';
const db = require('../Data/db');
import Colors from '../constant/Colors';
import { serverUrl } from '.././constant/urls';

const ManagementEmployeeScreen = props => {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees();
        // setEmployees(db.employees);
    }, []);

    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: "Employees",
            headerRight: () => (<Button title='Add' onPress={() => {
                props.navigation.navigate('EmployeeDetailsScreen', {
                    title: 'Add employee',
                    onConfirm: addEmployee
                });
            }} />),
        })

    }, []);

    const fetchEmployees = async () => {
        console.log("fetchEmployees");

        const resData = await fetch(`${serverUrl}/employees`,{
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
        });
        const employeesData = await resData.json();

        const arrAllEmployees = [];
        for (let employeeKey in employeesData) {
            arrAllEmployees.push(employeesData[employeeKey])
        }
        setEmployees(arrAllEmployees);
    }

    const renderEmployees = ({ item }) => {
        return (
            <EmployeeCell
                Employee={item}
                onPressEmployee={() => onPressEmployeeCell(item)}
                onLongPressEmployee={() => onLongPressEmployeeCell(item)}
            />
        )
    }

    const onPressEmployeeCell = (item) => (
        props.navigation.navigate('EmployeeDetailsScreen', {
            title: 'Edit employee',
            employee: item,
            onConfirm: editEmployee
        })
    )

    const onLongPressEmployeeCell = (item) => (
        Alert.alert(
            "Alert",
            "Are you sure you want to delete this employee?",
            [
                {
                    text: "Yes",
                    onPress: () => deleteEmployee(item),
                    style: "confirm"
                },
                {
                    text: "No",
                    style: "cancel"
                },
            ]
        )
    )

    const addEmployee = async (newEmployee) => {
        try {
            console.log("addEmployee", newEmployee);
            Keyboard.dismiss();

            // if not fill all the fields, alert
            if (!newEmployee.employee_name || !newEmployee.employee_age || !newEmployee.employee_salary) {
                return Alert.alert(
                    "שגיאה",
                    "נא מלא את כל פרטי העובד",
                    [
                        { text: "אישור" }
                    ],
                    { cancelable: true }
                )
            }

            const resData = await fetch(`${serverUrl}/employees/create`, {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                // body: newEmployee
                body: JSON.stringify(newEmployee) // body data type must match "Content-Type" header
            });

            if (resData.status == 200) {
                fetchEmployees();
                Alert.alert(
                    "Alert",
                    "Employee created successfully",
                    [
                        {
                            text: "OK",
                            style: "cancel"
                        },
                    ]);
            }
            else {
                throw new Error;
            }
        }
        catch (e) {
            Alert.alert("Alert", "Error, employee not created");
        }
    }

    const editEmployee = async (Employee) => {
        try {
            console.log("editEmployee", Employee);
            console.log("Employee.id", Employee.id);
            Keyboard.dismiss();

            // if not fill all the fields, alert
            if (!Employee.employee_name || !Employee.employee_age || !Employee.employee_salary) {
                return Alert.alert(
                    "שגיאה",
                    "נא מלא את כל פרטי העובד",
                    [
                        { text: "אישור" }
                    ],
                    { cancelable: true }
                )
            }

            const response = await fetch(`${serverUrl}/employees/update/${Employee.id}`, {
                method: 'PUT',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Employee)
            });
            if (response.status == 200) {
                fetchEmployees();
                Alert.alert(
                    "Alert",
                    "Employee updated successfully",
                    [
                        {
                            text: "OK",
                            style: "cancel"
                        },
                    ]);
            }
            else {
                throw new Error;
            }
        }
        catch (e) {
            Alert.alert("Alert", "Error to update employee");
        }
    }

    const deleteEmployee = async (Employee) => {
        try {
            console.log("deleteEmployee", Employee, Employee.id);
            Keyboard.dismiss();

            const response = await fetch(`${serverUrl}/employees/delete/${Employee.id}`, {
                method: 'DELETE',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
            });

            if (response.status == 200) {
                fetchEmployees();
                Alert.alert(
                    "Alert",
                    "Employee deleted successfully",
                    [
                        {
                            text: "OK",
                            style: "cancel"
                        },
                    ]);
            }
            else {
                throw new Error;
            }
        }
        catch (err) {
            Alert.alert("Alert", "Error deleting employee");
        }
    }


    return (
        <View style={styles.root}>
            <FlatList
                data={employees}
                renderItem={renderEmployees}
                keyboardShouldPersistTaps='always'
            >

                {/* <Text>ManagementEmployeeScreen</Text> */}
            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 2,
        // margin: 3,
        backgroundColor: Colors.primary
    },
    inputText: {
        width: '80%',
        height: 40,
        backgroundColor: 'lightgrey',
        // backgroundColor: Colors.primary,
        borderRadius: 20,
        margin: 12,
        textAlign: 'center'
    },
});

export default ManagementEmployeeScreen;