import Nav from './nav';

import Topbar from './topbar';
import Feed from './feed';
import React, {Component} from 'react';
import Menu from './menu';
import * as Font from 'expo-font';
import Eula from './eula';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Keep from './keep';
import Myspawn from './myspawn';
import Createspawns from './createspawns';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Following from './following';
import Follow from './follow.js';
import ContextMenu from './contextMenu';
import Fog from './fog';
import MediaViewer from './mediaViewer';
import EditUser from './editUser';
import ViewMedia from './viewMedia';

Font.loadAsync({
  'Regular': require('../assets/fonts/InriaSerif-Regular.ttf'),
  'Bold': require('../assets/fonts/InriaSerif-Bold.ttf'),
  'Light': require('../assets/fonts/InriaSerif-Light.ttf'),
  'Italic': require('../assets/fonts/InriaSerif-Italic.ttf'),
  'Title': require('../assets/fonts/Luminari-Regular.ttf'),
});

export default class Dispatch extends Component {
  constructor(props){
    super(props);
    this.state={
      center:{
        display:"flex", justifyContent:"center", alignItems:"center"
      }

    };
  }
  componentDidMount(){
    
    let app = this.props.app;
    let state= app.state;
    let list = state.componentList;
    let components = list.getComponents();
    let newList = [];
    let user = state.user
    newList = components.filter(obj => {
      return !Object.keys(user.getJson().blocked).includes(obj.getJson().owner)
    })

    newList = newList.filter(obj => {
      return !Object.keys(user.getJson().hidden).includes(obj.getJson()._id)
    })
    list.setComponents(newList);
    app.dispatch({});
  }
  async componentDidUpdate(){
    if(this.props.app.state.componentsAdded){
      await this.props.app.dispatch({componentsAdded:false});
      this.componentDidMount()
    }
  }
  getPic(c){
    let app = this.props.app;
    let state=app?.state;
    
    let pic = c;
    let arr =[]
    if(pic.getJson().picURLs!==undefined){

    
    if(Object.keys(pic.getJson().picURLs)[0]){
      
      for (const key in pic?.getJson().picURLs){
        arr.push(pic?.getJson().picURLs[key]);
      }
    }
    else{
      arr=[pic.getJson().picURL]
    }
  }
    else{
      if(!pic.getJson().picURL){
        return
      }
      arr=[pic.getJson().picURL]
    }
    return arr
  }
render(){
  let app=this.props.app;
  let state=app?.state;
  let styles=state.styles;
  let dispatch=app.dispatch
  let arr = ['monsters','heroes','statblocks','worlds','maps']
  
  return (
<>
    <View style={{width:styles.width, height:styles.height, backgroundColor:styles.colors.Grey1, display:"flex", padding: 2,
    justifyContent:"center", alignItems:"center"}}>

      <Menu app={this.props.app}/>
      {state.fog&& (<Fog  app = {app} menuSlide={this.props.menu}/>)}
      {(state.currentPic!==undefined&& state.popupSwitch==="viewMedia") && (<MediaViewer  app = {app} />)}
      {(state.currentComponent?.getJson()?.type==='user'&& state.popupSwitch==="editUser") && (<EditUser  app = {app} />)}

      {(this.props.app.state.context &&this.props.app.state.contextContent )&&(
      <View style={{position:'absolute', bottom:this.props.app.state.contextBottom, backgroundColor:styles.colors.Red2, zIndex:500, width:"95%"}}>
      <ContextMenu app={this.props.app} 
      content={this.props.app.state.contextContent} 
      user={this.props.app.state.user} 
      reportUser={this.props.app.state.reportUser} 
      name={this.props.app.state.contextContent.getJson().picURL!==""? "picURL":"picURLs"}/>
    </View>
    
    )}
        <Topbar style={{}} menu={this.props.menu} app={this.props.app}/>
        {/* <View style={{...styles.width, opacity:this.props.app.state.myswitch==="feed"?1:0, zIndex:this.props.app.state.myswitch==="feed"?500:"-100",}}>
        <Feed app={this.props.app}/>
        </View>
        <View style={{...styles.width, opacity:this.props.app.state.myswitch==="follow"?1:0, zIndex:this.props.app.state.myswitch==="follow"?500:"-100",}}>
        <Follow app={this.props.app}/>
        </View>
        <View style={{...styles.width, opacity:this.props.app.state.myswitch==="following"?1:0, zIndex:this.props.app.state.myswitch==="following"?500:"-100",}}>
        <Following app={this.props.app}/>
        </View>
        <View style={{...styles.width, opacity:this.props.app.state.myswitch==="keep"?1:0, zIndex:this.props.app.state.myswitch==="keep"?500:"-100",}}>
        <Keep app={this.props.app}/>
        </View>
        <View style={{...styles.width, opacity:this.props.app.state.myswitch==="myspawns"?1:0, zIndex:this.props.app.state.myswitch==="myspawns"?500:"-100",}}>
        <Myspawn app={this.props.app}/>
        </View>
        <View style={{...styles.width, opacity:this.props.app.state.myswitch==="createspawns"?1:0, zIndex:this.props.app.state.myswitch==="createspawns"?500:"-100",}}>
        <Createspawns app={this.props.app}/>
        </View> */}
        {this.props.app.state.myswitch==="feed" && (<Feed app={this.props.app}/>)} 
        {this.props.app.state.myswitch==="follow"&&(<Follow app={this.props.app}/>)}
        {this.props.app.state.myswitch==="follower"&&(<Follow app={this.props.app}/>)}

        {(this.props.app.state.myswitch==="following"&&this.props.app.state.currentFollowing!==undefined)&&(<Following app={this.props.app}/>)}
        {this.props.app.state.myswitch==="keep" && (<Keep app={this.props.app}/>)} 
        {this.props.app.state.myswitch==="myspawns" && (<Myspawn app={this.props.app}/>)}
        {(this.props.app.state.myswitch==="createspawns" && arr.includes(this.props.app.state.currentComponent?.getJson().type))&& (<Createspawns app={this.props.app}/>)}
        
        
        <Nav style={{backgroundColor:'#00000000'}} app={this.props.app}/> 
       
    </View>     
    </>
);
}

};
