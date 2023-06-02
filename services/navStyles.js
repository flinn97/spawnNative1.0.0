
import styleService from './styleService';

// ANYTHING menu, nav

class NavStyles {
    getnavstyles() {
let styles = styleService.getstyles();

let navStyles={

        menuItem:{
            FontFamily: styles.fonts.fontBold,
            display:'flex', justifyContent:'center',
            width:235, height:50, 
            borderRadius:8, paddingLeft:20, 
            

        },
        }
        return navStyles;
    }
}

export default new NavStyles();