
import React, {Component} from 'react';
import auth from '../services/auth';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  Text,
  Touchable,
  useColorScheme,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default class Follow extends Component {
  constructor(props){
    super(props);
    this.state={
      center:{
        display:"flex", justifyContent:"center", alignItems:"center"
      }

    };
  }
  async componentDidMount(){
    let app = this.props.app
    let state = app.state;
    let following = state.componentList?.getList("follow", state.user.getJson()._id);
    if(state.myswitch==="follower"){
      following = following.filter(obj => !obj.getJson().following);
    }
    
    let list=[];
    for(let obj of following){
      let adduser = await auth.getPicOwner(state.componentList, obj.getJson().followID);
      list.push(adduser);
    }
    this.setState({list:list})
    
  }

render(){
  let app = this.props.app
    let state = app.state;
    let styles =state.styles;
    let switchcase = app.state.switchcase;
    let dispatch= app.dispatch;
    let formStyles= state.formStyles;

  return (
    <SafeAreaView style={{width:"100%", height:"100%", background:"white", marginTop:250 }}>
    <ScrollView>
    <View style={{width:"100%", height:"80%", background:"white", display:"flex",  alignItems:"center"}}>
      <View style={{height:60}}>
      {state.myswitch==="follow"?(
      <Text style={{fontSize:20, fontFamily: "Regular", color:"black", marginBottom:state.componentList?.getList("follow", state.user.getJson()._id, state.myswitch==="follow"? "owner":"followID" ).length===0?0:20}}>Following {state.componentList?.getList("follow", state.user.getJson()._id, state.myswitch==="follow"? "owner":"followID" ).length} Spawners</Text>
      ):(
        <Text style={{fontSize:20, fontFamily: "Regular", color:"black", marginBottom:state.componentList.getList("follow", state.user.getJson()._id,  "owner").filter(obj=>{return !obj.getJson().following}).length===0?0:20}}> {state.componentList.getList("follow", state.user.getJson()._id,  "owner").filter(obj=>{return !obj.getJson().following}).length} Followers</Text>

      )}
      </View>
       {this.state.list?.map((f, index)=>
       <View key={index} style={{width:"100%", display:"flex", flexDirection:"row", marginBottom:10, alignItems:"center", justifyContent:"space-between"}}>
        <TouchableOpacity style={{display:"flex", flexDirection:"row", marginLeft:10, justifyContent:"center", alignItems:"center"}}
        onPress={async ()=>{
          dispatch({currentFollowing: f, myswitch: "following", backButton:true, oldState:state})
        }}><Image style={{width:50, height:50, borderRadius:25}} source={{uri:f.getJson().picURL}} /><Text style={{marginLeft:10, fontFamily: "Regular", color:"black",fontSize:16}}>{f.getJson().spawnerHandle}</Text>
        </TouchableOpacity>
        {state.myswitch==="follow"&&(
        <TouchableOpacity onPress={async() => {
          let followComp =state.componentList.getList('follow', f.getJson()._id, "followID");
          followComp = followComp.filter(obj=>{return obj.getJson().owner= state.user?.getJson()._id})

          
          if(followComp.length>=1){
            followComp = followComp[0];
            let list = this.state.list.filter(obj=>{return obj.getJson()._id!== followComp.getJson().followID});
            this.setState({list:list})
            await followComp.unFollow(state.componentList);
            dispatch({unFollow:true})

          }
          else{
            
            app.state.user?.follow(state.currentFollowing)
          }
         
         }} style={{ ...formStyles.buttonPositive,  alignSelf:"flex-end",
           marginLeft:10, width:90, border:"none", display:"flex", justifyContent:"center", alignItems:"center" }}><Text style={{ fontFamily: "Bold", color:"white",
                fontSize:16
          }}>Following</Text></TouchableOpacity>
          )}
       </View>
       )}
    
    </View>
    </ScrollView>
    </SafeAreaView>

);
}

};
