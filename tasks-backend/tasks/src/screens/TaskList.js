import React, { Component } from 'react';
import { View, Text , ImageBackground, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import commonStyles from '../../commonStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

import todayImage from '../../wwwroot/assets/imgs/today.jpg';
import Task from '../components/Task';
import FormatterDate from '../../functions/FormatterDate';
import { getPlatform } from '../../functions/GettingPlatform';
import { Platform } from 'react-native';

export default class TaskList extends Component {

    state = {
        showDonedTasks: true,
        visibleTasks: [],
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

    componentDidMount = () => {
        this.filterTasks()
    }

    toggleFilter = () => {
        this.setState({ showDonedTasks: !this.state.showDonedTasks }, this.filterTasks)
    }

    toggleTask = id => {
        const tasks = [...this.state.tasks]
        tasks.forEach( task => { 
            if(id === task.id) 
                task.doneAt = task.doneAt ? null : new Date() 
        })

        this.setState({ tasks }, this.filterTasks)
    }

    filterTasks = () => {
        let visibleTasks = null;

        if(this.state.showDonedTasks){
            visibleTasks = [...this.state.tasks];
        }
        else{
            const pending = task => task.doneAt === null;
            visibleTasks = this.state.tasks.filter(pending);
        }

        this.setState({ visibleTasks })
    }

    render(){
        return(

            <View style={styles.container}>
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDonedTasks ? 'eye' : 'eye-slash'} 
                                  size={20} 
                                  color={commonStyles.colors.secondary} 
                                  style={styles.icon}/>
                        </TouchableOpacity>    
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <FormatterDate style={styles.subTitle} date={new Date()} />
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList 
                        data={this.state.visibleTasks} 
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
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: Platform.Os === 'ios' ? 30 : 10,
        justifyContent: 'flex-end'
    }
})