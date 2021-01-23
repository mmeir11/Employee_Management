import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../constant/Colors';

const EmployeeCell = props => {

    const currentEmployee = props.Employee;

    return (
        <TouchableOpacity style={styles.root} onPress={props.onPressEmployee} onLongPress={props.onLongPressEmployee}>
            <View style={styles.textContainer}>
                <Text style={styles.text}> {currentEmployee.employee_name}</Text>
            </View>
            {/* <View style={styles.textContainer}>
                <Text style={styles.text}>Age: {currentEmployee.employee_age}</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Salary: {currentEmployee.employee_salary}</Text>
            </View> */}

        </TouchableOpacity>)
}

const styles = StyleSheet.create({
    root: {
        borderWidth: 1,
        padding: 2,
        textAlign: 'center',
        alignSelf: 'center',
        width: '100%',
        height: 50,
        borderColor: '#ced4da',
        borderRadius: 8,
        backgroundColor: Colors.primary
    },
    textContainer: {
        flex: 1,
        alignSelf:'center',
        justifyContent:'center'
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#343a40',
    }
});

export default EmployeeCell;