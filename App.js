/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button, Image, StatusBar,AsyncStorage,ImageBackground, TouchableOpacity, BackHandler, BackAndroid} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { Router, Route} from 'react-router';
import { Redirect } from 'react-router-dom';




class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state ={ loginStatus: false };
  }
  render() {
    if (this.state.loginStatus === 'true') {
      return <Mainactivity/>
    }
    else if (this.state.loginStatus === 'false') {
      return <LogIn screenProps={{ isLoggedIn: () => this.setState({ loginStatus: 'true' }) }}/>
    }
 
    return <SplashScreen/>
  }
}
type Props = {};
class Mainactivity extends React.Component {
       state = {
      username: '',
      password: '',
      persistedName:'',
     persistedPassword:'',
           loginStatus:false
   }
   componentWillMount() {
    this.check();
  }
  check(){
    AsyncStorage.getItem('Ppassword').then((Ppassword) => {
        this.setState({persistedPassword:Ppassword})
       if(this.state.persistedPassword=='svce'){
           this.props.navigation.navigate('Next');
       }
    })
  }
   persistData=()=>{
 AsyncStorage.setItem('Pname', this.state.username).done();
  AsyncStorage.setItem('Ppassword', this.state.password).done();
}

    myfunc=()=>{
        if(this.state.username=='')
        {
          alert("enter Username");
          return;
        }
        this.persistData();
        if(this.state.password=='svce'){
            this.setState({loginStatus:true})
            this.props.navigation.navigate('Next');
              this.setState({isLoggedIn:true});

        }         
        else{
            alert("Incorrect password");
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

  RedirectToMain=()=>{
  AsyncStorage.clear();
  this.setState({persistedPassword:''})
         this.setState({username:''})
         this.setState({password:''})
          this.props.navigation.navigate('Initial');
         return;
    }
  
  componentDidMount() {
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButton); 
}

componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
}

handleBackButton() {
  return true;
}
  render() {
    return (
      <View style={styles.container}>
        <Text style={{color:'#ffffff',fontSize:24}}>HOMEPAGE</Text>
      
    <TouchableOpacity
         onPress={() => this.RedirectToMain()}
  
         style={styles.button}
         >
         <Text style={styles.buttontext}>Logout</Text>
         </TouchableOpacity>
        
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
