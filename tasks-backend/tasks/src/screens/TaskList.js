import React, { Component } from 'react';
import { View, Text , ImageBackground, StyleSheet, FlatList} from 'react-native';
import commonStyles from '../../commonStyles';

import todayImage from '../../wwwroot/assets/imgs/today.jpg';

import Task from '../components/Task';
import FormatterDate from '../../functions/FormatterDate';

export default class TaskList extends Component {

    state = {
        tasks: [
            {
                id: Math.random(),
                desc: 'Comprar Livro',
                estimateAt: new Date(),
                doneAt: new Date()
            },
            {
                id: Math.random(),
                desc: 'Ir na feira',
                estimateAt: new Date(),
                doneAt: null
            },
            {
                id: Math.random(),
                desc: 'Ir na feira',
                estimateAt: new Date(),
                doneAt: null
            },
            
        ]
    }

    toggleTask = id => {
        const tasks = [...this.state.tasks]

        tasks.forEach(task => {
            if(id === task.id){
                task.doneAt = task.doneAt ? null : new Date()
            }
        })

        this.setState({ tasks })
    }

    render(){
        return(

            <View style={styles.container}>
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <FormatterDate style={styles.subTitle} date={new Date()} />
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList 
                        data={this.state.tasks} 
                        keyExtractor={item => `${item.id}`}
                        renderItem={({item}) => <Task {...item} toggleTask={this.toggleTask} /> }
                    />
                </View>

            </View>
            
    )}
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3,   
    },
    taskList:{
        flex: 7,
        
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title:{
        fontFamily: commonStyles.fontFamily,
        color:  commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20,
    },
    subTitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 20,
        fontWeight: 'bold'
    }
})