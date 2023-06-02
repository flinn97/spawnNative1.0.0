import auth from './services/auth'
import Dispatch from './view/dispatch';
import React, { Component, useEffect, useState, } from 'react';
import ComponentListInterface from './npm/componentListInterface';
import styleService from './services/styleService';
import Eula from './view/eula';
import spawnForms from './services/spawnForms';
import picMap from './services/picMap';
import navStyles from './services/navStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { changeNavigationBarColor, hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import * as Font from 'expo-font';


import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import SignInUp from './view/signInUp';




 



class App extends Component {
  constructor(props) {
    super(props);
    
    this.dispatch=this.dispatch.bind(this);
    this.menuSlide=this.menuSlide.bind(this);
    this.state={
      styles: styleService.getstyles(),
      formStyles: spawnForms.getformStyles(),
      picMap: picMap.getpicmapstyles(), 
      navStyles: navStyles.getnavstyles(),
      arr:[],
      pic: undefined,
      index: 0,
      nextPic: undefined,
      user: undefined,
      operate: "",
      operation: "",
      positionSideBar: -300,
      switchCase: "monsters",
      object: undefined,
      componentListInterface: new ComponentListInterface(this.dispatch),
      componentList: undefined,
      currentComponent: undefined,
      myswitch: "feed",
      fontsLoaded:false,
      
      center:{
        display:"flex", justifyContent:"center", alignItems:"center"
      }

    };
  }

  async menuSlide(){
    
    if(this.state.positionSideBar===-300){
      this.setState({
        positionSideBar:0,
        fog:true,          
      })
      // for(let i=-300; i<=0; i+=50){
      //   const delay = ms => new Promise(res => setTimeout(res, ms));
      //           await delay(1);
        
      // }
    }
    else{
      this.setState({
        positionSideBar:-300,
        fog:false
      })
      // for(let i=0; i>=-300; i-=50){
       
      //   const delay = ms => new Promise(res => setTimeout(res, ms));
      //           await delay(1);
       
      // }
    }
  }
  async componentDidMount(){
    let load = await Font.loadAsync({
      'Regular': require('./assets/fonts/InriaSerif-Regular.ttf'),
      'Bold': require('./assets/fonts/InriaSerif-Bold.ttf'),
      'Light': require('./assets/fonts/InriaSerif-Light.ttf'),
      'Italic': require('./assets/fonts/InriaSerif-Italic.ttf'),
      'Title': require('./assets/fonts/Luminari-Regular.ttf'),
    });
    this.setState({fontsLoaded:true})
    let list;
        if(this.state.componentList===undefined && this.state.componentListInterface!==undefined){
            
            list = await this.state.componentListInterface.createComponentList();
            let opps = list.getOperationsFactory();
            await this.setState({
                componentList:list,
                opps:opps
            })
        }
        if(!this.state.gotPics){
          this.setState({gotPics:true})
       
        await auth.getPics(list);
        // let monster = list.getComponent("monsters",)
        // let monsters = list.getList('monsters')[1];
        

        // await this.setState({pic: monster, currentComponent: monster, nextPic:monsters});
        // list.getOperationsFactory().cleanPrepare({update:monster});
        let user = this.state.user
        // auth.getComments(this.state.componentList, monster.getJson()._id);
         this.setState({})
        }
        try {
      
          const value = await AsyncStorage.getItem('@userKey');
          if (value !== null && value!==undefined && value!=="{}") {
            const json = JSON.parse(value);
            await auth.getAllTheDataForTheUser(json.email, this.state.componentList, this.dispatch);
            await auth.getAllComments(this.state.componentList);
            await auth.getAllUsers(this.state.componentList)
            this.setState({start:true})
        }
      }
        catch (error) {
          console.log("error,", error)
        }
        

       
  }
  dispatch(obj){
    this.setState({...obj})
  }
  async componentDidUpdate(props, state){
    
        
  
    if(this.state.backend!==undefined ){
        await this.setState({backend: undefined, updateCircle:true});
        auth.dispatch(this.state.backendUpdate, this.state.email);  

    }

   
    if(this.state.operate!==undefined ||this.state.operation==="run"){
        let operation = this.state.operation;
        let operate= this.state.operate;
        let object = this.state.object;
        
        await this.setState({operate:undefined, operation:"cleanJsonPrepare", object:undefined, currentComponent:undefined});
        if(this.state.componentList){

        
        let operationsFactory =this.state.componentList.getOperationsFactory();
        let splice = operate!==undefined? await operationsFactory.getSplice(operate) : "";
        
        let obj = await operationsFactory.operationsFactoryListener({operate:operate, operation:operation, object:object});
        if(obj){
          let currentComponent=operate!==undefined? obj[splice][0]: undefined;
          
        await this.setState({currentComponent: currentComponent});
      }
      }
    }
}


render(){


  return (
    <View style={{width:"100%", height:"100%", backgroundColor:"white",  paddingBottom:this.state.keyboardMargin,
          display:"flex", justifyContent:"center",
           alignItems:"center"}}>
            {this.state.fontsLoaded&&(<>
          {this.state.readEULA&&(<Eula app={{state:this.state, dispatch:this.dispatch}}/>)}

          {this.state.user &&this.state.start?( 
              <Dispatch menu = {this.menuSlide} app={{state:this.state, dispatch:this.dispatch}}/>
              ):(
               
              <SignInUp  app={{state:this.state, dispatch:this.dispatch}}/>
              )}
      </>)}
          </View>

);
       
}

};

export default App;

