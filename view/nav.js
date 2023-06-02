import keep from "../assets/keep.png";
import spawn from "../assets/spawnPic.png";
import profile from "../assets/HeroSpawn.png";
import React, {Component} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';
import styleService from "../services/styleService";



export default class Nav extends Component {
  constructor(props){
    super(props);
    this.state={
      center:{
        display:"flex", justifyContent:"center", alignItems:"center"
      }

    };
  }
render(){
  let app = this.props.app;
    let state=app.state;
    let styles=state.styles;
      let formStyles= state.formStyles;
  return (
    <View style={{position: "absolute", width:styles.width, borderTopWidth:2, borderTopColor:styles.colors.Grey2,  height:110, 
    backgroundColor:styles.colors.Color2, bottom: 0, display: 'flex', paddingLeft:"10%", paddingRight:"10%",
    flexDirection:'row', justifyContent: "space-between"}}>
      
       <TouchableOpacity onPress={this.props.app.dispatch.bind(this, {myswitch: "myspawns", backButton:true, oldState:state})}
       style={{flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
       <Image source={profile} resizeMode="contain" style={{...styles.icon}}/>
       <Text style={{fontFamily:styles.fonts.fontBold, fontSize:18, color:styles.colors.Grey1}}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.props.app.dispatch.bind(this, {myswitch: "feed", backButton:true, oldState:state})}
        style={{flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
        <Image source={spawn} resizeMode="contain" style={{...styles.icon, width:51}}></Image>
        <View style={{display:"flex", flexDirection:"row"}}>
          
          <Text style={{fontFamily:styles.fonts.fontBold, fontSize:18, color:styles.colors.Grey1}}>Spawns</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.props.app.dispatch.bind(this, {myswitch: "keep", backButton:true, oldState:state})}
        style={{flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
        
          <Image source={keep} resizeMode="contain" style={{...styles.icon}}/>
          <Text style={{fontFamily:styles.fonts.fontBold, fontSize:18, color:styles.colors.Grey1}}>Keep</Text>
        </TouchableOpacity>
    </View>

);
}

};

