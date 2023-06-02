
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
import PicMap from './picMap.js';
import add from '../assets/AddPlus.webp'
import auth from '../services/auth';


export default class Myspawn extends Component {
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
    return arr
  }
  async componentDidMount(){
    let list = this.props.app.state.componentList
    let user = this.props.app.state.user;
    let pics = [...list.getList("monsters", user.getJson()._id), ...list.getList("heroes", user.getJson()._id), ...list.getList("statblocks", user.getJson()._id), 
  ...list.getList("worlds", user.getJson()._id), ...list.getList('maps', user.getJson()._id)];
  this.setState({pics:pics})
  let followers = await auth.getAllFollowers(list, user.getJson()._id);
  this.setState({followers:followers})
  }
  async componentDidUpdate(){
    if(this.props.app.state.spawnDeleted){
      await this.props.app.dispatch({spawnDeleted:false});
      let list = this.props.app.state.componentList
      let user = this.props.app.state.user;
      let pics = [...list.getList("monsters", user.getJson()._id), ...list.getList("heroes", user.getJson()._id), ...list.getList("statblocks", user.getJson()._id), 
    ...list.getList("worlds", user.getJson()._id), ...list.getList('maps', user.getJson()._id)];
    this.setState({pics:pics})
    let followers = await auth.getAllFollowers(list, user.getJson()._id);
    this.setState({followers:followers})
    }
  }
render(){
  let app = this.props.app
  let pics = app.state.componentList?.getComponents();
  let switchcase = app.state.switchcase;
  let dispatch = app.dispatch;
  let state = app.state;
  let styles =state.styles;
return (
  <View style={{width:styles.width, height:styles.height, position:"relative", marginTop:200}}>
  <SafeAreaView style={{width:styles.width, height:"65%", background:"white", display:"flex", justifyContent:"center", alignItems:"center", marginTop:50}}>
    <ScrollView>
      <View style={{width:styles.width, display:"flex", flexDirection:"row"}}>
        <View style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", marginLeft:20}}>      
      <Image style={{
                  width: 90,
                  height: 90,
                  
                  // objectFit: "scale-down", 
                  borderRadius:45,
                  }}
                   source={{uri:state.user.getJson().picURL}}  />
                   <TouchableOpacity onPress={()=>{
                    dispatch({object:state.user, operation:"cleanPrepare", operate:"update", popupSwitch:"editUser"})
                   }}>
                   <Text style={{fontFamily: "Regular",color:"black"}}>{state.user.getJson().firstName} {state.user.getJson().lastName}</Text>
                   </TouchableOpacity>
</View>
                   <View style={{display:"flex", justifyContent:'center', alignItems:"center", marginLeft:20}}><Text style={{fontFamily: "Regular",color:"black"}}>{this.state.pics?.length}</Text><Text style={{fontFamily: "Regular",color:"black"}}>Spawns</Text></View>
                   <View  style={{display:"flex", justifyContent:'center', alignItems:"center", marginLeft:20}}>
                   <TouchableOpacity  style={{display:"flex", justifyContent:"center", alignItems:"center", }}  onPress={dispatch.bind(this,{myswitch:"follow", backButton:true, oldState:state })}>

                   <Text style={{fontFamily: "Regular",color:"black"}}>{state.componentList?.getList("follow", state.user.getJson()._id,  "owner" ).length}</Text><Text style={{fontFamily: "Regular",color:"black"}}>Following</Text>
                   </TouchableOpacity>
                   </View>
                   <View  style={{display:"flex", justifyContent:'center', alignItems:"center", marginLeft:20}}>
                   <TouchableOpacity  style={{display:"flex", justifyContent:"center", alignItems:"center", }}  onPress={dispatch.bind(this,{myswitch:"follower", backButton:true, oldState:state })}>

                   <Text  style={{fontFamily: "Regular",color:"black"}}>{state.componentList.getList("follow", state.user.getJson()._id,  "owner").filter(obj=>{return !obj.getJson().following}).length}</Text><Text style={{fontFamily: "Regular",color:"black"}}>Followers</Text>
                   </TouchableOpacity>
                   </View>
      </View>
      <View style={{marginTop:10, marginLeft:20, width:300}}>
      <View style={{display:'flex', flexDirection:'row', marginBottom:5}}><Text  style={{fontFamily: "Regular",color:"black", fontWeight:"bold"}}>About:</Text><Text style={{fontFamily: "Regular",color:"black"}}> {state.user.getJson().about} </Text></View>
      <View style={{display:'flex', flexDirection:'row', marginBottom:5}}><Text style={{fontFamily: "Regular",color:"black", fontWeight:"bold"}}>Website: </Text><Text style={{fontFamily: "Regular",color:"black"}}>{state.user.getJson().website}</Text></View>
      <View style={{display:'flex', flexDirection:'row', marginBottom:5}}><Text style={{fontFamily: "Regular",color:"black", fontWeight:"bold"}}>Social: </Text><Text style={{fontFamily: "Regular",color:"black"}}>{state.user.getJson().socialHandle}</Text></View>
      <Text style={{fontFamily: "Regular",color:"black",marginTop:20, fontSize:20, marginBottom:20}}>My Spawns:</Text>
      </View>
      <PicMap app={app} pics = {this.state.pics} />
      <View style={{marginTop:500}}></View>

        </ScrollView>
  </SafeAreaView>
  <View style={{position:"absolute", zIndex:5000,bottom:245, right:50,  display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
  <TouchableOpacity  onPress={async ()=>{
        await this.props.app.state.componentList.getOperationsFactory().cleanJsonPrepare({addpic:{owner:this.props.app.state.user.getJson()._id}});
        let r =await this.props.app.state.componentList.getOperationsFactory().getUpdater("add");
        await app.dispatch({currentComponent:undefined});
        this.props.app.dispatch({myswitch: "createspawns", currentComponent:r[0]})}}
        style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
  <Image source={add} style={{marginBottom:10, width:60, height:60}}/>
  <Text style={{fontFamily: "Regular",color:"black",}}>+ New Spawn</Text>
  </TouchableOpacity>
  </View>

  </View>

);
}

};