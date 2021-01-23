import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';

const Loading = props => {

    return (
        <View style={styles.root}>
            <ActivityIndicator size="large" />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center"
    },
});

export default Loading;