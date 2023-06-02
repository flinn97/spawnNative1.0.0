import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';

const CarouselDot = ({ active }) => {
  return (
    <View style={[styles.dot, active && styles.activeDot]} >
      
    </View>
  );
};

const CarouselDots = ({ data, activeIndex }) => {
  return (
    <View style={styles.container}>
      {Object.keys(data).map((key, i)=>
      <View key={i}>
      <CarouselDot  active={i === activeIndex} />
      </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf:'center',
    justifyContent:"center",
    backgroundColor:'gray',
    height:20,
    width:100,
    display:"flex",
    flexDirection:"row",
    borderRadius:7,
    marginTop: 0,
    
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'black',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'white',
  },
});

export default CarouselDots;