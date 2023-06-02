import React, { Component } from 'react';
import { 
  Alert, 
  Image, 
  Platform, 
  StyleSheet, 
  Text, 
  TouchableHighlight, 
  View 
} from 'react-native';
import PropTypes from 'prop-types';




export default class Checkbox extends Component {

  constructor(props) {
    super(props);
    this.stateSwitcher=this.stateSwitcher.bind(this);
    this.state = { 
      checked: null 
    }
  }

  componentDidMount() {
    if (this.props.checked) {
      this.setState({ checked: true });
    } else {
      this.setState({ 
        checked: false
      });
    }
  }
 
  stateSwitcher(key, label, value) {
    this.setState({ checked: !this.state.checked });

    this.props.check(this.state.checked);
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.stateSwitcher }
        underlayColor="transparent"
        style={{  }}>

        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center' }}>
            <View style={{
              padding: 2, 
              width: this.props.size, 
              height: this.props.size, 
              backgroundColor: this.props.color,
              borderRadius: 10
            }}>
              {
                (this.state.checked)
                  ?
                  (<View style={{...styles.selectedUI, borderRadius:10}}>
                    <View style={{backgroundColor:'white', width:28, height:28, borderRadius:7, display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <Image source={require('../assets/checked.png')} style ={{width:18, height:18}} />
                    </View>
                  </View>)
                  :
                  (<View style={styles.uncheckedCheckbox} />)
              }
          </View>

        </View>

      </TouchableHighlight>
    );
  }
}

 
Checkbox.propTypes = {
    keyValue: PropTypes.number.isRequired,
    size: PropTypes.number,
    color: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    checked: PropTypes.bool,
    labelColor: PropTypes.string,
    // checkedObjArr: PropTypes.object.isRequired
}

Checkbox.defaultProps = {
    size: 32,
    checked: false,
    value: 'Default',
    label: 'Default',
    color: '#cecece',
    labelColor: '000000',    
}

const styles = StyleSheet.create(
  {
    CheckboxContainer: {
      flex: 1,
      padding: 22,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: (Platform.OS === 'ios') ? 25 : 0
    },

    showSelectedButton: {
      padding: 20,
      marginTop: 25,
      alignSelf: 'stretch',
      backgroundColor: '#5D52FF'
    },

    buttonText: {
      fontSize: 20,
      color: '#ffffff',
      textAlign: 'center',
      alignSelf: 'stretch'
    },

    selectedUI: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },

    checkboxTickImg: {
      width: '85%',
      height: '85%',
      tintColor: '#ffffff',
      resizeMode: 'contain'
    },

    uncheckedCheckbox: {
      width:28,
      height:28,
      borderRadius:7,
      backgroundColor: '#ffffff'
    },

    checkboxLabel: {
      fontSize: 18,
      paddingLeft: 15
    }
  });


    //  <Checkbox size={45}
  //   keyValue={1}
  //   checked={true}
  //   color="#E81E63"
  //   labelColor="#000000"
  //   label="Birds of Prey"
  //   value="birds_of_prey" 
  //   checkedObjArr={CheckedArrObject} />

  // <Checkbox size={45}
  //   keyValue={2}
  //   checked={false}
  //   color="#3F50B5"
  //   labelColor="#000000"
  //   label="Little Women"
  //   value="little_women" 
  //   checkedObjArr={CheckedArrObject} />

  // <Checkbox size={45}
  //   keyValue={3}
  //   checked={true}
  //   color="#009688"
  //   labelColor="#000000"
  //   label="Doctor Sleep"
  //   value="doctor_sleep"
  //   checkedObjArr={CheckedArrObject} />

  // <Checkbox size={45}
  //   keyValue={4}
  //   checked={false}
  //   color="#FF9800"
  //   labelColor="#000000"
  //   label="Ford v Ferrari"
  //   value="ford_v_ferrari"