import React, { Component } from 'react';
import auth from '../services/auth';


import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    TouchableOpacity,Dimensions,
    View,
    
} from 'react-native';

export default class ViewMedia extends Component {
    constructor(props){ 
        super(props);
  

        this.state={

        }
    }

render(){
    let app = this.props.app;
    let state=app?.state;
    let styles=state?.styles;
       
        let dispatch = app?.dispatch;
        let componentList = state?.componentList;
        
        let s = this.props.scale? this.props.scale: 1;
        let media = Array.isArray(this.props.media)? this.props.media: [this.props.media];

        let mediaDisplay = {


            1: <View style={{display:"flex", padding: 22, flexDirection:"row", justifyContent:"center", borderRadius: 10, alignItems:"center"}}>
              <View style={{position:"relative",  borderRadius: 10,}}>
                {this.props.editable &&<TouchableOpacity style={ ///EXIT BUTTON
                {color:"black", position:"absolute",cursor:"pointer", right:10, top:10, zIndex:1000}
                } onPress={()=>{this.props.removeMedia({content: media[0], index: 0})}}><Text style={{color:"red", fontSize:10}}>X</Text></TouchableOpacity>}
                <Image style={{
                  width: 40*s,
                  height: 40*s,
                //   objectFit: "scale-down", 
                  borderRadius: 10,
                  }}
                  className="picture" id="pic" source={{uri:media[0]}}  />
                  </View></View>,


                2: <View style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", borderRadius: 10}}>
                     <View style={{position:"relative",  borderRadius:10}}>
                    {this.props.editable &&<TouchableOpacity style={ ///EXIT BUTTON
                            {color:"black", cursor:"pointer", position:"absolute",  borderRadius: 10, right:10, top:10, zIndex:1000}
                            } onPress={()=>{this.props.removeMedia({content: media[0], index: 0})}}><Text style={{color:"red", fontSize:10}}>X</Text></TouchableOpacity>}
                    <Image style={{ 
                    width:20*s, 
                                       height: 20*s,
                    // objectFit: "scale-down", 
                    borderRadius: 10,
                    }} 
                    className="picture" id="pic" source={{uri:media[0]}}  />
                    </View>
                     <View style={{position:"relative",  borderRadius: 10,}}>
                    {this.props.editable &&<TouchableOpacity style={ ///EXIT BUTTON
                            {color:"black", cursor:"pointer",borderRadius: 10,position:"absolute", right:10, top:10, zIndex:1000}
                            } onPress={()=>{this.props.removeMedia({content: media[1], index: 1})}}><Text style={{color:"red", fontSize:10}}>X</Text></TouchableOpacity>}
                    <Image style={{ 
                        width: 20*s, 
                                       height: 20*s,
                        // objectFit: "scale-down", 
                        borderRadius: 10,
                        }} 
                        className="picture" id="pic" source={{uri:media[1]}}  />
                        </View>
                        </View>,



                        3: <View style={{display:"flex", flexDirection:"row", justifyContent:"center",borderRadius: 10, alignItems:"center"}}>
                             <View style={{position:"relative",  borderRadius: 10,}}>
                            {this.props.editable &&<TouchableOpacity style={ ///EXIT BUTTON
                            {color:"black", cursor:"pointer",position:"absolute", right:10, top:10, zIndex:1000}
                            } onPress={()=>{this.props.removeMedia({content: media[0], index: 0})}}><Text style={{color:"red", fontSize:10}}>X</Text></TouchableOpacity>}<Image style={{ 
                            width: 20*s, 
                                       height: 20*s,
                            // objectFit: "scale-down",
                            borderRadius: 10,
                            }} 
                            className="picture" id="pic" source={{uri:media[0]}} /></View>
                            
                            <View style={{display:"flex", borderRadius: 10, flexDirection:"column"}}>
                            <View style={{position:"relative",  borderRadius: 10,}}>
                            {this.props.editable &&<TouchableOpacity style={ ///EXIT BUTTON
                            {color:"black", borderRadius: 10, cursor:"pointer",position:"absolute", right:10, top:10, zIndex:1000}
                            } onPress={()=>{this.props.removeMedia({content: media[1], index: 1})}}><Text style={{color:"red", fontSize:10}}>X</Text></TouchableOpacity>}
                            <Image style={{ 
                               width: 10*s, 
                               height: 10*s,
                                // objectFit: "scale-down", 
                                borderRadius: 10,
                                }} 
                                className="picture" id="pic"source={{uri:media[1]}} />
                                </View>
                                 <View style={{position:"relative",  borderRadius: 10,}}>
                                {this.props.editable &&<TouchableOpacity style={ ///EXIT BUTTON
                            {color:"black", borderRadius: 10, cursor:"pointer",position:"absolute", right:10, top:10, zIndex:1000}
                            } onPress={()=>{this.props.removeMedia({content: media[2], index: 2})}}><Text style={{color:"red", fontSize:10}}>X</Text></TouchableOpacity>}
                                <Image style={{ 
                                width: 10*s, 
                                height: 10*s,
                                // objectFit: "scale-down",
                                borderRadius: 10,
                                }} 
                                className="picture" id="pic" source={{uri:media[2]}} />
                                </View>
                                </View>
                                </View>,




                                4: <View style={{display:"flex", borderRadius: 10, flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                                <View style={{position:"relative",  borderRadius: 10,}}>
                                    {this.props.editable &&<TouchableOpacity style={ ///EXIT BUTTON
                            {color:"black", cursor:"pointer",borderRadius: 10, position:"absolute", right:10, top:10, zIndex:1000}
                            } onPress={()=>{this.props.removeMedia({content: media[0], index: 0})}}><Text style={{color:"red", fontSize:10}}>X</Text></TouchableOpacity>}<Image style={{ 
                                    width: 20*s, 
                                                     height: 20*s,
                                    // objectFit: "scale-down",
                                     borderRadius: 10,
                                    }} 
                                    className="picture" id="pic" source={{uri:media[0]}}  /></View>
                                    <View style={{display:"flex", flexDirection:"column"}}>
                                    <View style={{position:"relative",  borderRadius: 10,}}>
                                    {this.props.editable &&<TouchableOpacity style={ ///EXIT BUTTON
                            {color:"black",cursor:"pointer", borderRadius: 10, position:"absolute", right:10, top:10, zIndex:1000}
                            } onPress={()=>{this.props.removeMedia({content: media[1], index: 1})}}><Text style={{color:"red", fontSize:10}}>X</Text></TouchableOpacity>}
                                    <Image style={{ 
                                       width: 10*s, 
                                       height: 10*s,
                                        // objectFit: "scale-down",
                                        borderRadius: 10,
                                        }} 
                                        className="picture" id="pic" source={{uri:media[1]}}  /></View>
                                         <View style={{position:"relative",  borderRadius: 10,}}>
                                        {this.props.editable &&<TouchableOpacity style={ ///EXIT BUTTON
                            {color:"black", cursor:"pointer", borderRadius: 10, position:"absolute", right:10, top:10, zIndex:1000}
                            } onPress={()=>{this.props.removeMedia({content: media[2], index: 2})}}><Text style={{color:"red", fontSize:10}}>X</Text></TouchableOpacity>}
                                        <Image style={{ 
                                       width: 10*s, 
                                       height: 10*s,
                                        // objectFit: "scale-down",
                                        borderRadius: 10,
                                        }} 
                                        className="picture" id="pic" source={{uri:media[2]}}  /></View>
                                         <View style={{position:"relative",  borderRadius: 10,}}>
                                        {this.props.editable &&<TouchableOpacity style={ ///EXIT BUTTON
                            {color:"black", cursor:"pointer",position:"absolute", right:10, top:10, zIndex:1000}
                            } onPress={()=>{this.props.removeMedia({content: media[3], index: 3})}}><Text style={{color:"red", fontSize:10}}>X</Text></TouchableOpacity>}
                                        <Image style={{ 
                                        width: 10*s, 
                                        height:10*s,
                                        // objectFit: "scale-down",
                                         borderRadius: 10,
                                        }} 
                                        className="picture" id="pic" source={{uri:media[3]}}  /></View>
                                        </View>
                                        </View>,


                                        5: <View style={{display:"flex", borderRadius: 10, flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                                            <View style={{display:"flex", borderRadius: 10, flexDirection:"row",}}>
                                            <View style={{position:"relative",  borderRadius: 10,}}>
                                            {this.props.editable &&<TouchableOpacity style={ ///EXIT BUTTON
                            {color:"black",cursor:"pointer", borderRadius: 10, position:"absolute", right:10, top:10, zIndex:1000}
                            } onPress={()=>{this.props.removeMedia({content: media[0], index: 0})}}><Text style={{color:"red", fontSize:10}}>X</Text></TouchableOpacity>}
                                                <Image style={{ 
                                            width: 20*s, 
                            height: 20*s,
                                            // objectFit: "scale-down", 
                                            borderRadius: 10,
                                           }} 
                                            className="picture" id="pic" source={{uri:media[0]}} /></View>
                                             <View style={{position:"relative",  borderRadius: 10,}}>
                                            {this.props.editable &&<TouchableOpacity style={ ///EXIT BUTTON
                            {color:"black", cursor:"pointer",borderRadius: 10, position:"absolute", right:10, top:10, zIndex:1000}
                            } onPress={()=>{this.props.removeMedia({content: media[1], index: 1})}}><Text style={{color:"red", fontSize:10}}>X</Text></TouchableOpacity>}
                                            <Image style={{ 
                                                 width: 20*s, 
                                                 height: 20*s,
                                                // objectFit: "scale-down",
                                                borderRadius: 10,
                                                }} 
                                                className="picture" id="pic" source={{uri:media[1]}}  /></View></View>
                                            <View style={{display:"flex", flexDirection:"row"}}>
                                            <View style={{position:"relative",  borderRadius: 10,}}>
                                            {this.props.editable &&<TouchableOpacity style={ ///EXIT BUTTON
                            {color:"black", cursor:"pointer",position:"absolute", right:10, top:10, zIndex:1000}
                            } onPress={()=>{this.props.removeMedia({content: media[2], index: 2})}}><Text style={{color:"red", fontSize:10}}>X</Text></TouchableOpacity>}
                                            <Image style={{ 
                                                width: 10*s, 
                                                height: 10*s,
                                                // objectFit: "scale-down", 
                                                borderRadius: 10,
                                                }} 
                                                className="picture" id="pic" source={{uri:media[2]}}  /></View>
                                                 <View style={{position:"relative",  borderRadius: 10,}}>
                                                {this.props.editable &&<TouchableOpacity style={ ///EXIT BUTTON
                            {color:"black", cursor:"pointer",position:"absolute", right:10, top:10}
                            } onPress={()=>{this.props.removeMedia({content: media[3], index: 3})}}><Text style={{color:"red", fontSize:10}}>X</Text></TouchableOpacity>}
                                                <Image style={{ 
                                                width: 10*s, 
                                                height: 10*s,
                                                // objectFit: "scale-down", 
                                                borderRadius: 10,
                                                }} 
                                                className="picture" id="pic" source={{uri:media[3]}}  /></View>
                                                 <View style={{position:"relative",  borderRadius: 10,}}>
                                                {this.props.editable &&<TouchableOpacity style={ ///EXIT BUTTON
                            {color:"black",cursor:"pointer", position:"absolute", right:10, top:10, zIndex:1000}
                            } onPress={()=>{this.props.removeMedia({content: media[4], index: 4})}}><Text style={{color:"red", fontSize:10}}>X</Text></TouchableOpacity>}
                                                <Image style={{ 
                                                width: 10*s, 
                                                height: 10*s,
                                                // objectFit: "scale-down", 
                                                borderRadius: 10,
                                                }} 
                                                className="picture" id="pic" source={{uri:media[4]}}  /></View>
                                                </View>
                                                </View>,


                                                6: <View style={{display:"flex", borderRadius: 10, flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                                                <View style={{display:"flex", flexDirection:"row",}}>
                                                <View style={{position:"relative"}}>
                                                {this.props.editable &&<TouchableOpacity style={ ///EXIT BUTTON
                            {color:"black", cursor:"pointer",position:"absolute", right:10, top:10, zIndex:1000}
                            } onPress={()=>{this.props.removeMedia({content: media[0], index: 0})}}><Text style={{color:"red", fontSize:10}}>X</Text></TouchableOpacity>}<Image style={{ 
                                                width: 20*s, 
                                height: 20*s,
                                                // objectFit: "scale-down",
                                                 borderRadius: 10,
                                                }} 
                                                className="picture" id="pic" source={{uri:media[0]}}  /></View>
                                                 <View style={{position:"relative"}}>
                                                {this.props.editable &&<TouchableOpacity style={ ///EXIT BUTTON
                            {color:"black",cursor:"pointer", position:"absolute", right:10, top:10, zIndex:1000}
                            } onPress={()=>{this.props.removeMedia({content: media[1], index: 1})}}><Text style={{color:"red", fontSize:10}}>X</Text></TouchableOpacity>}
                                                <Image style={{ 
                                                     width: 20*s, 
                                                     height: 20*s,
                                                    // objectFit: "scale-down",
                                                    borderRadius: 10,
                                                    }} 
                                                    className="picture" id="pic" source={{uri:media[1]}}  /></View></View>
                                                    
                                                <View style={{display:"flex", flexDirection:"row"}}>
                                                <View style={{position:"relative"}}>
                                                {this.props.editable &&<TouchableOpacity style={ ///EXIT BUTTON
                            {color:"black", cursor:"pointer",position:"absolute", right:10, top:10}
                            } onPress={()=>{this.props.removeMedia({content: media[2], index: 2})}}><Text style={{color:"red", fontSize:10}}>X</Text></TouchableOpacity>}
                                                <Image style={{ 
                                                    width: 10*s, 
                                                    height: 10*s,
                                                    // objectFit: "scale-down", 
                                                    borderRadius: 10,
                                                    }} 
                                                    className="picture" id="pic" source={{uri:media[2]}}  /></View>
                                                     <View style={{position:"relative"}}>
                                                    {this.props.editable &&<TouchableOpacity style={ ///EXIT BUTTON
                            {color:"black",cursor:"pointer", position:"absolute", right:10, top:10, zIndex:1000}
                            } onPress={()=>{this.props.removeMedia({content: media[3], index: 3})}}><Text style={{color:"red", fontSize:10}}>X</Text></TouchableOpacity>}
                                                    <Image style={{ 
                                                    width: 10*s, 
                                                    height: 10*s,
                                                    // objectFit: "scale-down", 
                                                    borderRadius: 10,
                                                    }} 
                                                    className="picture" id="pic" source={{uri:media[3]}}  /></View>
                                                     <View style={{position:"relative"}}>
                                                    <View style={{position:"relative", width: 10*s, 
                                                    height: 10*s,}}>
                                                        <View style={{background:"black", opacity:".5", position:"absolute", width:"100%", height:"100%", top:0, left:0}}></View>
                                                        <View style={{display:"flex", justifyContent:"center", alignItems:"center", 
                                                        position:"absolute", width:"100%", height:"100%", top:0, left:0, color:"black"}}><Text>+ {media.length-5}</Text></View>
                                                         <View style={{position:"relative"}}></View>
                                                        {this.props.editable &&<TouchableOpacity style={ ///EXIT BUTTON
                            {color:"black",cursor:"pointer", position:"absolute", right:10, top:10, zIndex:1000}
                            } onPress={()=>{this.props.removeMedia({content: media[4], index: 4})}}><Text style={{color:"red", fontSize:10}}>X</Text></TouchableOpacity>}
                                                    <Image style={{ 
                                                    width:10*s, 
                                                    height: 10*s,
                                                    // objectFit: "scale-down", 
                                                    borderRadius: 10,
                                                    }} 
                                                    className="picture" id="pic" source={{uri:media[4]}}  /></View>
                                                    </View>
                                                    </View>
                                                    </View>


        }
        return(
            <View style ={{}} onPress={(e)=>{
                this.props.onPress(e, this.props);
            }}>
                {mediaDisplay[media.length>5? 6: media.length]}
                
                 </View>
                 
             )
    }

}