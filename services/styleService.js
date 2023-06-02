import {
     Dimensions
  } from 'react-native';


// ANYTHING container or general layout UIs

class styleService {
    getstyles() {

        let stylecolor = {
            
                ///colors
                color1: "#EF3E23",
                color2: "#A80303",
                color3: "#491778",
                color4: "#491778",
                ///greyscales
                colorWhite: "#FBFFFF",
                colorBlack: "#161616",
                colorLightG: "#F2F2F2",
                colorMidG: "#D8D9DA",
                colorDarkG: "#2e2e2e",
        
    };
        let styles = {
            
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,

            colors: {
            ///colors
                Color1: stylecolor.color1,
                Color2: stylecolor.color2,
            ///greyscales
                White1:stylecolor.colorWhite,
                Black1: stylecolor.colorBlack,
                Grey1: stylecolor.colorLightG,
                Grey2: stylecolor.colorMidG,
                Grey3: stylecolor.colorDarkG,
            ///font settings
                darkFontColor: stylecolor.colorBlack,
                lightFontColor: stylecolor.colorDarkG,
                linkFontColor: stylecolor.color4,
                linkVisitedColor: stylecolor.color4,
            },

            shadows: {
            /// h-offset v-offset blur spread color
                sideShadow: "1px 10px 30px -2px "+ stylecolor.colorLightG,
                homeShadow: "0px 0px 30px white",
            },

            margins: {
                marginSm: 12,
                marginMd: 18,
                marginLg: 22,
                marginXl: 30,
            },

            fonts:{
                fontNormal: "Regular",
                fontBold: "Bold",
                fontItalic: "Italic",
                fontLight: "Light",
                fontTitle: "Title",

            },

            icon2:{
                width: 32,
                height: undefined, aspectRatio: 1,
                
                alignSelf: "center",

                // shadowColor: '#000',
                //  shadowOffset: { width: 0, height: 2 },
                // shadowOpacity: 0.9,
                // shadowRadius: 2,
                // elevation: 2, // for Android
            },

            icon:{
                aspectRatio:1, width:48, height:undefined,
            },


        }


        return styles;
    }
}

export default new styleService();