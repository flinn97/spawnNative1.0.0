
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
  Image,
  Touchable
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import double from '../assets/moreimg_gs3.webp'



export default class PicMap extends Component {
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
    let state = app.state;
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
    return [arr[0]]
  }
  
render(){
  let app = this.props.app
  let pics = app.state.componentList?.getComponents();
  let switchcase = app.state.switchcase;
  let dispatch = app.dispatch;
  let state = app.state;
  let styles =state.styles;
return (
  <View style={{...styles.width, display:"flex", flexWrap:"wrap", flexDirection:"row", justifyContent:"center", }}>
      {this.props.pics?.map((pic, index)=><View key={index} style={{width:122, height:122, display:"flex", alignItems:"center", justifyContent:"center"}}>
        
        <TouchableOpacity onPress={()=>{
          app.dispatch({currentPic:pic, popupSwitch:"viewMedia", viewMediaKeep:this.props.keep});
        }}>
          {Object.keys(pic.getJson().picURLs).length>1&&(<Image source = {double} style={{position:"absolute", zIndex:1000,top:30, right:20, width:20, height:20}}  />)}
                 <ViewMedia scale={3} media={this.getPic(pic)} />

          </TouchableOpacity>
        </View>)}
        </View>
);
}


};