import React, {Component} from 'react';
import Keep from '../assets/keep_grey.png';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

export default class Comments extends Component{
  constructor(props){
    super(props);
        this.state={
          

    }
  }
  componentDidMount(){

  }

render(){
  let app = this.props.app;
  let state= app.state;
  let componentList=state.componentList
  return (
  <View>
    {componentList.getList("comment", this.props.pic.getJson()._id, "picOwner").map((comment, index)=>
    <View key = {index} style={{display:'flex', flexDirection:"row", margin:10}}>
      <Image style={{width:50, height:50, borderRadius:25}} source={{
        uri:(comment.getJson().picURL===""||comment.getJson().picURL===undefined)? Keep: comment.getJson().picURL
        }} />
        <View style={{marginLeft:10, marginTop:10}}>
          <Text style={{color:this.props.textColor?this.props.textColor:"black", fontFamily: "Regular"}}>{comment.getJson().commentOwner} Said:</Text>
      <Text style={{color:this.props.textColor?this.props.textColor:"black", fontFamily: "Regular"}}>{comment.getJson().note}</Text>
      </View>
    </View>
    )}
  </View>
    
  );
}
  
};

