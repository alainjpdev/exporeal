import * as React from 'react';

import { Dimensions, StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import MapboxGL from "@rnmapbox/maps";
import { FontAwesome5,EvilIcons } from '@expo/vector-icons';
import { Ionicons,Feather } from '@expo/vector-icons';
import _ from 'lodash'
MapboxGL.setAccessToken('pk.eyJ1IjoiYXJrMjc4NCIsImEiOiJjbGI1bDVveDUwN25wM25teWwzaXJ4bjNvIn0.qcuuxn_gR4qbsM5FdMcfuQ');
import { propertiesMock } from '../../json-file/constants';
import { useNavigation } from '@react-navigation/native';
import Airtable, { Table,Base } from 'airtable';
import { SliderBox } from "react-native-image-slider-box";
import { BottomSheet } from 'react-native-btr';


function HomeScreen() {
  var base = new Airtable({ apiKey: 'key5MaogjBry0tlvf' }).base('app67vic1sZQ72H6p');
  const [ListItems, setListItems] = React.useState([])
  const [visible, setVisible] = React.useState(false);

       const video = React.useRef(null);
       const [status, setStatus] = React.useState({});
       const [coordinates,setcoordinates] = React.useState([]);
       const [selectedMarker, setSelectedMarker] = React.useState(null);
       const [markSelectDetails, setmarkSelectDetails] = React.useState({});
       const [mapInsideClick, setmapInsideClick] = React.useState(false)
       let navigate = useNavigation()
       React.useEffect(() => {
        base('tables').select().all().then((record)=>{
     
      let a =[]
      _.map(record,(v,i)=>{
        if(_.get(v,'_rawJson.fields.coordinates') && _.get(v,'_rawJson.fields.coordinates2')){
          a.push({...v ,id:_.get(v,'_rawJson.id'),coordinates:[_.get(v,'_rawJson.fields.coordinates'),_.get(v,'_rawJson.fields.coordinates2')]
          ,images:_.get(v,'_rawJson.fields.images1'),name:_.get(v,'_rawJson.fields.Name'),address:_.get(v,'_rawJson.fields.address'),price:_.get(v,'_rawJson.fields.price'),
        
        })
        }
        
       })
       setcoordinates(a)
        }).catch((error)=>{
         
        })
      }, [])
       const handleMarkerPress = async(event,details) => {
         const { id } = event.properties
      await  setSelectedMarker(id)
   setmarkSelectDetails({...details})
setmapInsideClick(true)
        
      };

      const loadList = (v)=>{
        
        return  <View style={[styles.showdowProps,{backgroundColor:'#FFFFFF',height:200,width:250}]}>
      
 
  
       
          <Image
           style={styles.videoPlayer}
            source={{uri:_.get(v,'images')}}
          />
        
         

          <TouchableOpacity onPress={()=>navigate.navigate('ListView',{id:_.get(v,'id')})} style={{marginTop:10,marginBottom:10,marginLeft:10}}>
          
              <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:15,marginRight:19}}>{_.get(v,'name')}
                </Text>   
                <Text style={{color:'#118200',fontWeight:'600'}}>${_.get(v,'price')}
                </Text> 
              </View>
                
                <Text>{_.get(v,'address')}
                </Text>    
               
          </TouchableOpacity>
     </View>
          
   }
   const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };
       return (
        <View style={styles.page}>
           <View style={styles.container}>
            {_.size(coordinates)>0 && <MapboxGL.MapView tintColor={'red'}  onPress={()=>{console.log('askjdbasbdhbasdbas')}}  zoomEnabled={true}
        scrollEnabled={true}
        rotateEnabled={true} style={styles.map}>
            {_.get(_.head(coordinates), 'coordinates') && <MapboxGL.Camera
          zoomLevel={14}
          
          centerCoordinate={coordinates[0].coordinates}
        />}
               {_.map(coordinates,(v,i)=>{
                return  <MapboxGL.PointAnnotation    onSelected={(e)=>{
                  console.log('asddadasda','asdasdas',e);
                    handleMarkerPress(e,v)
                    toggleBottomNavigationView()
                  
                  }}  id={v.id.toString()} style={{ backgroundColor: 'red' }} key={v.id.toString()} coordinate={_.get(v,'coordinates')} >


                </MapboxGL.PointAnnotation> 
                  
               })}
               
          
        
             </MapboxGL.MapView>}
           </View>
           <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          alignSelf: 'center',
          width: 80,
          height: 60,
          // height: 60,
          // borderRadius: 30,
          backgroundColor: '#dcebff',
          justifyContent: 'center',
          alignItems: 'center',
          ...styles.showdowProps
        }}
        onPress={() => {
          navigate.navigate('Buy')
        }}
      >
        <View style={{
 ...styles.showdowProps,
position: 'absolute',
// bottom: 10,
alignSelf: 'center',
// width: 60,
// height: 60,
borderRadius: 5,
backgroundColor: '#dcebff',
justifyContent: 'center',
alignItems: 'center',
flexDirection:'row',
// padding:20,
width: 80,
          height: 60,
        }}>
        <Ionicons name="list-sharp" size={20} color="#0a0bff" style={{marginRight:4}} />
        <Text style={{color:'#0a0bff',fontWeight:'500'}}>
        List</Text>
        </View>
      </TouchableOpacity>
      <BottomSheet
          visible={visible}
          //setting the visibility state of the bottom shee
          onBackButtonPress={toggleBottomNavigationView}
          //Toggling the visibility state on the click of the back botton
          onBackdropPress={toggleBottomNavigationView}
          //Toggling the visibility state on the clicking out side of the sheet
        >
          {/*Bottom Sheet inner View*/}
          <View style={styles.bottomNavigationView}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                // justifyContent: 'space-between',
                width:Dimensions.get('screen').width-100
              }}>
             
              <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={[styles.showdowProps,{backgroundColor:'#FFFFFF',height:200,width:Dimensions.get('screen').width-100}]}>
      
 
  
       
      <Image
      // resizeMode='cover'
       style={styles.videoPlayer}
        source={{uri:_.get(markSelectDetails,'images')}}
      />
    
     

      <View  style={{marginTop:10,marginBottom:10,marginLeft:10}}>
      
          <View style={{flexDirection:'row'}}>
          <Text style={{fontSize:15,marginRight:19}}>{_.get(markSelectDetails,'name')}
            </Text>   
            <Text style={{color:'#118200',fontWeight:'600'}}>${_.get(markSelectDetails,'price')}
            </Text> 
          </View>
            
            <Text>{_.get(markSelectDetails,'address')}
            </Text>  
            {_.get(markSelectDetails,'_rawJson.fields.beds') &&   <Text> <Text style={{fontWeight:'600'}}>{_.round(parseInt(_.get(markSelectDetails,'_rawJson.fields.beds')))}</Text> bd  | <Text style={{fontWeight:'600'}}>{_.round(parseInt(_.get(markSelectDetails,'_rawJson.fields.bath')))}</Text> ba |
                    </Text>}  
            <View style={{alignItems:'center',justifyContent:'center',marginLeft:80}}>
            <TouchableOpacity style={{backgroundColor: '#dcebff',
          width: 130,
          height: 30,
          justifyContent: 'center',
alignItems: 'center',
flexDirection:'row',
// ...styles.showdowProps,
          }} onPress={()=>navigate.navigate('ListView',{id:_.get(markSelectDetails,'id')})}>
 <Text style={{color:'#0a0bff',fontWeight:'500',marginRight:6}}>View Details</Text>
 <Feather name="arrow-right-circle" size={16} color="#0a0bff" />
 </TouchableOpacity>
            </View>
      </View>
      
 </View>

              </View>
              
            </View>
          </View>
        </BottomSheet>
         </View>
       );
     }


     export default HomeScreen
     
     const styles = StyleSheet.create({
      page: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
      },
      container: {
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
        backgroundColor: "tomato"
      },
      map: {
        flex: 1
      },
      videoPlayer: {
        width:Dimensions.get('screen').width,
       height:200

        
      },
      showdowProps:{
        shadowColor: "#000",
 shadowOffset: {
   width: 0,
   height: 8,
 },
 shadowOpacity: 0.44,
 shadowRadius: 10.32,
 
 elevation: 16,

        },
        calloutContainer: {
          padding: 10,
          backgroundColor: 'white',
          borderRadius: 5,
        },
        calloutText: {
          fontSize: 16,
        },
        bottomNavigationView: {
          backgroundColor: '#fff',
          // width: '100%',
          height: 330,
          // justifyContent: 'center',
          // alignItems: 'center',
        },
    });