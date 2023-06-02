
import React, {Component} from 'react';
import ViewMedia from './viewMedia';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import InputComponent from './inputComponent';
import double from '../assets/moreimg_gs3.webp'

import PicMap from './picMap';

export default class Keep extends Component {
  constructor(props){
    super(props);
    this.getPic=this.getPic.bind(this);
    this.state={
      center:{
        display:"flex", justifyContent:"center", alignItems:"center"
      }

    };
  }
  getPic(c){
    let app = this.props.app;
    let state=app?.state;
  let styles=state.styles;
  let formStyles= state.formStyles;
    
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
      arr=[pic.getJson().picURL]
    }
    return arr
  }
  componentDidMount(){
    let list = this.props.app.state.componentList
    let user = this.props.app.state.user;
    let pics = [...list.getList("keepmonsters", user.getJson()._id), ...list.getList("keepheroes", user.getJson()._id), ...list.getList("keepstatblocks", user.getJson()._id), 
  ...list.getList("keepworlds", user.getJson()._id), ...list.getList('keepmaps', user.getJson()._id)];
  this.setState({pics:pics})
  }
  async componentDidUpdate(){
    if(this.props.app.state.keepDeleted){
      await this.props.app.dispatch({keepDeleted:false});
      let list = this.props.app.state.componentList
    let user = this.props.app.state.user;
    let pics = [...list.getList("keepmonsters", user.getJson()._id), ...list.getList("keepheroes", user.getJson()._id), ...list.getList("keepstatblocks", user.getJson()._id), 
  ...list.getList("keepworlds", user.getJson()._id), ...list.getList('keepmaps', user.getJson()._id)];
  this.setState({pics:pics})
    }
  }

render(){
  let app = this.props.app
    let pics = app.state.componentList?.getComponents();
    let switchcase = app.state.switchcase;
    let dispatch = app.dispatch;
    let state = app.state;
    let styles =state.styles;
    let formStyles= state.formStyles;
  return (

    <SafeAreaView style={{width:700, height:"70%", background:styles.colors.White1, 
    display:"flex", justifyContent:"center", alignItems:"center", marginTop:7}}>
      <ScrollView style={{width:styles.width}}>
      <View style={{marginTop:20, marginBottom:20, alignSelf:"center", display:'flex', flexDirection:"row"}}><Text style={{fontFamily: "Regular", color:"black", fontSize:30}}>My Keep</Text><Text style={{fontFamily: "Regular", color:"black",fontSize:10,marginLeft:5, }}>{this.state.pics?.length}</Text></View>
      <PicMap app={app} pics = {this.state.pics} keep={true} />
      </ScrollView>
    </SafeAreaView>

);
}

};
