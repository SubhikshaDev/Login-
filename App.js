/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button, Image, StatusBar, TouchableOpacity, BackHandler, BackAndroid} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { Router, Route} from 'react-router';
import { Redirect } from 'react-router-dom';



type Props = {};
class Mainactivity extends React.Component {
       state = {
      username: '',
      password: '',
           loginStatus:false
   }

    myfunc=()=>{
        if(this.state.username=='')
        {
          alert("enter Username")
        }
        else if(this.state.password=='svce'){
            this.setState({loginStatus:true})
            this.props.navigation.navigate('Next');

        }         
        else{
            alert("Incorrect password");
        }
      }
      componentDidMount() {
  if({loginStatus:true})
  {
     return <Redirect to="/Homepage" />
  }
}


  render() {
    return ( 
      <View style={styles.container}>
      <StatusBar 
      backgroundColor="#1c313a" 
      barStyle="light-content"/>
  <Text style={{color:'#ffffff',fontSize:24}}>HATCH</Text>
    
         <TextInput style={styles.inputBox}
         placeholder="Username"
         placeholderTextColor = "#ffffff"
          onChangeText={
            (text) => this.setState({username: text})
          }
          underlineColorAndroid='rgba(0,0,0,0)'
         />
         <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
         placeholder="Password"
         placeholderTextColor = "#ffffff"
         onChangeText={
           (text) => this.setState({password: text})
          }
         secureTextEntry={true}
 
         />
         <TouchableOpacity
         onPress={() => this.myfunc()}
  
         style={styles.button}
         >
         <Text style={styles.buttontext}>Login</Text>
         </TouchableOpacity>
      
      </View>
    );
  }
}

     

class Homepage extends React.Component {
  
  componentDidMount() {
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  if({loginStatus:true})
  {
     return <Redirect to="/Next" />
  }
}

componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
}

handleBackButton() {
  return true;
}
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Homepage</Text>
        <Button
        title='exit'
        onPress={this.exit_func}
        />
      </View>
    );
  }
}
const navigator = createStackNavigator(
  {
    Initial: Mainactivity,
    Next: Homepage,
  },
  {
    initialRouteName: 'Initial',
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(navigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#455a64',
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
  },
  inputBox:{
    width:300,
    backgroundColor:'rgba(255,255,255,0.3)' ,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color:'#ffffff',
    marginVertical: 12
  },
  button:{
    width:300,
    backgroundColor:'#1c313a',
    borderRadius:25,
    marginVertical:10,
    padding:10
  },
  buttontext:{
    fontSize: 16,
    color:'#ffffff',
    textAlign:'center'
  }

});
