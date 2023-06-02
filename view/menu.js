
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  SafeAreaView,
  ScrollView,Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';


class Menu extends Component{
  constructor(props) {
    //create state
    super(props);
    this.state = {
        
    };
}
render(){
  let app=this.props.app;
  let state=app.state;
  let dispatch=app.dispatch;
  let navStyles=state.navStyles;
  let styles=state.styles;
  return(
    
    <View style={{ height:'100%', backgroundColor: styles.colors.White1, borderRadius: 2, border: "solid "+1+" "+styles.colors.Black1,
    width:300, zIndex:700, top:0, left:state.positionSideBar, position:'absolute', 
    paddingTop:90, display:'flex',  }}>
      <View style={{marginTop:10, marginBottom:20, marginLeft:30}}>
      <Image style={{width:100, height:100, marginBottom:10,  borderRadius: 50,}} className="picture" id="pic" source={{uri:state.user?.getJson()?.picURL}}  />
      <Text style={{fontFamily: "Regular", color:"black",fontSize:20}}>{state.user?.getJson()?.firstName} {state.user?.getJson()?.lastName}</Text>
      </View>

      <View style={{marginLeft:40}}>
      <View 
      style={{...navStyles.menuItem, 
      backgroundColor: state.switchCase==="dash"? styles.colors.Grey1:styles.colors.White1}}>
        <TouchableOpacity  onPress={()=>{dispatch({fog:false, positionSideBar:-300, switchCase:"monsters", myswitch:"feed", backButton:true, oldState:state})}}  style={{  }}>
          <Text style={{fontFamily: "Regular",color:state.switchCase==="monsters"? "#A80303":"black", fontSize:20,}}>Monsters</Text></TouchableOpacity></View>
      <View 
      style={{display:'flex', justifyContent:'center',width:235, height:50, borderRadius:8, paddingLeft:20,  backgroundColor:state.switchCase==="goals"?'#F4F5F7':'white'}}>
        <TouchableOpacity  onPress={()=>{dispatch({fog:false, positionSideBar:-300, switchCase:"heroes",myswitch:"feed", backButton:true, oldState:state})}}  style={{  }}>
          <Text style={{fontFamily: "Regular",color:state.switchCase==="heroes"? "#A80303":"black", fontSize:20,}}>Heroes</Text></TouchableOpacity></View>
      <View 
      style={{display:'flex', justifyContent:'center',width:235, height:50, borderRadius:8, paddingLeft:20,  backgroundColor:state.switchCase==="practice"?'#F4F5F7':'white'}}>
        <TouchableOpacity  onPress={()=>{dispatch({fog:false, positionSideBar:-300, switchCase:"worlds",myswitch:"feed", backButton:true, oldState:state})}}  style={{ }}>
          <Text style={{fontFamily: "Regular",color:state.switchCase==="worlds"? "#A80303":"black", fontSize:20,}}>Worlds</Text></TouchableOpacity></View>
      <View 
      style={{display:'flex', justifyContent:'center',width:235, height:50, borderRadius:8, paddingLeft:20,  backgroundColor:state.switchCase==="chat"?'#F4F5F7':'white'}}>
        <TouchableOpacity  onPress={()=>{dispatch({fog:false, positionSideBar:-300, switchCase:"maps",myswitch:"feed", backButton:true, oldState:state})}}  style={{   }}>
          <Text style={{fontFamily: "Regular",color:state.switchCase==="maps"? "#A80303":"black",  fontSize:20,}}>Maps</Text></TouchableOpacity></View>
      <View 
      style={{wdisplay:'flex', justifyContent:'center',width:235, height:50, borderRadius:8, paddingLeft:20,  backgroundColor:state.switchCase==="tools"?'#F4F5F7':'white'}}>
        <TouchableOpacity  onPress={()=>{dispatch({fog:false, positionSideBar:-300, switchCase:"statblocks",myswitch:"feed", backButton:true, oldState:state})}}  style={{   }}>
          <Text style={{fontFamily: "Regular",color:state.switchCase==="statblocks"? "#A80303":"black",  fontSize:20,}}>Statblocks</Text></TouchableOpacity></View>
          <View 
      style={{wdisplay:'flex', justifyContent:'center',width:235, height:50, borderRadius:8, paddingLeft:20,  backgroundColor:state.switchCase==="tools"?'#F4F5F7':'white'}}>
        <TouchableOpacity  onPress={async ()=>{
          let list =[];
          let switchCase=["monsters", "heroes", "worlds", "maps", "statblocks"];
          for(let type of switchCase){
            let newList  = state.componentList.getList(type);
            let user = state.user
            newList = newList.filter(obj => {
              return !Object.keys(user.getJson().blocked).includes(obj.getJson().owner)
            })
  
            newList = newList.filter(obj => {
              return !Object.keys(user.getJson().hidden).includes(obj.getJson()._id)
            })
            await state.componentList.setSelectedList(type, newList);
            
            
            let addList = state.componentList.getList(type);
            list =[...list, ...addList]
            
          }
          await state.componentList.setSelectedList("all", list)
          dispatch({fog:false, positionSideBar:-300, switchCase:"all",myswitch:"feed", backButton:true, oldState:state})
          }}  style={{   }}>
          <Text style={{fontFamily: "Regular",color:state.switchCase==="statblocks"? "#A80303":"black",  fontSize:20,}}>All</Text></TouchableOpacity></View>
      </View>
      <TouchableOpacity style={{position:"absolute", bottom:30, left: 30}} onPress={async ()=>{
         try {
          await AsyncStorage.setItem("@userKey",
          undefined
          );
        } catch (error) {
          console.log(error)
          // Error saving data\
        }
        this.props.app.dispatch({user: undefined, });
        state?.componentList.clearList();
        try {
          await AsyncStorage.setItem("@userKey",
          "{}"
          );
        } catch (error) {
          // Error saving data\
        }
      }}>
      <Text style={{fontFamily: "Regular",color:"black", fontSize:20,}}>Logout</Text>
      </TouchableOpacity>
      </View>
  )
}
}
export default Menu;
