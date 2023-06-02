
import React from 'react';
import Swiper from 'react-native-swiper'
import Swipeable from 'react-native-gesture-handler/Swipeable';
const { width } = Dimensions.get('window')
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
  Animated
  
} from 'react-native';




const ListItem = (props) => {
  let app = props.props.app;
  let state= app.state;
  let comp = state.componentList;
  let component = comp.getComponentForSwipe("monsters");

  
  const rightSwipeActions = () => {
    let c = comp.getComponentForSwipe("monsters");
    return (
      // <View
      // style={{
      //   paddingHorizontal: 100,
      //   paddingVertical: 100,
      //   backgroundColor: 'pink',
      // }}
      // >
      // </View>
      <Image style={{width:500, height:450 }} source={{uri:c?.getJson().picURL}}/>
    );
  };
  
  const LeftSwipeActions  = () => {
    return (
      <View
      style={{
        paddingHorizontal: 100,
        paddingVertical: 100,
        backgroundColor: 'pink',
      }}
      >
      </View>
    );
  };
  return(

    
  <Swipeable
    renderLeftActions={LeftSwipeActions}
    renderRightActions={rightSwipeActions}
    // onSwipeableRightOpen={swipeFromRightOpen}
    // onSwipeableLeftOpen={swipeFromLeftOpen}
  >
    <Image style={{width:500, height:450 }} source={{uri:component.getJson().picURL}}/>
  </Swipeable>
  )
};

export default  MappedPics=(props)=>{
 

  return (

    <View style={{width:"100%", height:"100%", background:"white", display:"flex", justifyContent:"center", alignItems:"center"}}>
       <ListItem props={props} />      
       </View>

    
    

);
}

const styles = {
  wrapper: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:270,
     height:500
  },
  slide: {
    flex: 1,
    display:'flex',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'transparent'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  image: {
    width,
    flex: 1
  },
  paginationStyle: {
    display:'flex',
    justifyContent: 'center',
    alignItems:'center',
    // position: 'absolute',
    
  },
  paginationText: {
    color: 'white',
    fontSize: 20
  }
}
