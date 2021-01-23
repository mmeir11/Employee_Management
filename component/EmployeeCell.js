import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../constant/Colors';
import { Ionicons } from '@expo/vector-icons';

const EmployeeCell = props => {

    const currentEmployee = props.Employee;

    return (
        <TouchableOpacity style={styles.root} onPress={props.onPressEmployee} onLongPress={props.onLongPressEmployee}>
            <View style={styles.textContainer}>
                <Text style={styles.text}> {currentEmployee.employee_name}</Text>
            </View>
            <TouchableOpacity style={styles.btnContainer} onPress={props.onPressDelete}>
                <Ionicons name='ios-trash' size={30} color={Colors.lightGreen} style={styles.textBtn}></Ionicons>
            </TouchableOpacity>
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
        backgroundColor: Colors.primary,
        flexDirection: 'row'
    },
    textContainer: {
        flex: 3,
        alignSelf: 'center',
        justifyContent: 'flex-end',
        paddingLeft: 10,
    },
    text: {
        fontSize: 15,
        // fontWeight: 'bold',
        color: '#343a40',
    },
    btnContainer: {
        // flex: 1,
        alignSelf: 'center',
        // justifyContent: 'center',
        // paddingHorizontal: 5,
        marginHorizontal: 12,
    },
    textBtn: {
        flex: 1,
        textAlign:'center',
        alignItems:'center',
        justifyContent: 'center',
        padding: 8,
        paddingVertical: 5,
        width: "100%",
    },

});

export default EmployeeCell;