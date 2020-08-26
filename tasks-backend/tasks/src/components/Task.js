import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../../commonStyles';

import FormattedDate from '../../functions/FormatterDate'

import moment from 'moment';
import 'moment/locale/pt-br';

export default props => {

    const isDone = props.doneAt != null ? { textDecorationLine: 'line-through' } :false

    return(
        <View style={styles.container}>
            <TouchableWithoutFeedback  
                onPress={() => props.toggleTask(props.id)}>
                <View style={styles.checkContainer}>
                    { getCheckView(props.doneAt) }
                </View>
            </TouchableWithoutFeedback>
            <View>
                <Text style={[styles.desc, isDone]}>{ props.desc }</Text>
                <FormattedDate style={styles.date} date />
            </View>
        </View>
    )
}

function getCheckView(donaAt) {

    if(donaAt != null){
        return(
            <View style={styles.done}>
                <Icon name="check" size={20} color="#FFF" />
            </View>
        )
    }else{
        return(
            <View style={styles.pending}>
                
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4D7031',
        alignContent: 'center', 
        justifyContent: 'center',
        padding: 2
    },
    desc: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15,
        fontWeight: 'bold'
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText, 
        fontSize: 12       
    }
})