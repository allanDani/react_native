import { Dimensions, StyleSheet } from "react-native";

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
export const stylescss = StyleSheet.create({
  boxWhite: {
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  box: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container:{
    width:'100%',
    height:'100%',
  },
  width: {
    width:width
  },
  height: {
    height:height
  },
  row:{
    display:'flex',
    flexDirection:'row',
    flexWrap: 'wrap',
    gap:10,
    alignItems:'center',
  },
  center:{
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
  },
  textCenter:{textAlign:'center'},
  textLeft:{textAlign:'left'},
  textRight:{textAlign:'right'},
  transparent:{
    position:'absolute',
    zIndex:10,
    width:width,
    height:height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent:'center',
    alignItems:'center',
  },
});