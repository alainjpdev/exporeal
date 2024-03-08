import React, { useEffect, useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import _ from 'lodash'
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Airtable, { Table,Base } from 'airtable';

function BuyScreen() {
  var base = new Airtable({ apiKey: 'key5MaogjBry0tlvf' }).base('app67vic1sZQ72H6p');

  let navigate = useNavigation()
  
       const video = React.useRef(null);
       const [status, setStatus] = React.useState({});
       const [typeSet, settypeSet] = React.useState('1')
const [ListItems, setListItems] = React.useState([])
const [setPlay, setsetPlay] = useState(false)
useEffect(() => {
  const playVideo = async () => {
    setsetPlay(true)
      
     
      setTimeout(() => {
        setsetPlay(false)
      }, 8000); // St
    
  };

  playVideo();
}, []);
useEffect(() => {
  base('tables').select().all().then((record)=>{
console.log('sdsdsdsdssxsxdsdd',record);
setListItems(record)
  }).catch((error)=>{
    console.log('sadnxdxcabshdbahsbdhas',error);
  })
}, [])






       const renderFiles =(v,i)=>{
        if(_.get(v,'video')){
          return <Video
          
         source={{uri:_.get(v,'video')}}
        //  source={require('../../assets/videos/1.mp4')}
          style={styles.videoPlayer}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          shouldPlay={i==0? setPlay:false}
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        
        />
        }else if(`${_.get(v,'video')}`.includes('http')){
          return <Video
          
          shouldPlay={i==0? setPlay:false}
         source={{uri:_.get(v,'video')}}
          style={styles.videoPlayer}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        
        />
        }else{
         return <Image source={{uri:_.get(v,'images[0]')}}
        style={styles.videoPlayer}
       
      />
        }

        
       }
       const loadList = ()=>{
            return  _.map(ListItems,(v,i)=>{
             
return <TouchableOpacity onPress={()=>navigate.navigate('ListView',{id:_.get(v,'_rawJson.id')})} key={i} style={[styles.showdowProps,{marginBottom:20,backgroundColor:'#FFFFFF'}]}>
              <View>
                   {/* <Image source={{uri:_.get(v,'images[0]')}}
        style={styles.videoPlayer}
       
      /> */}
       {renderFiles(_.get(v,'_rawJson.fields'),i)}
       
              </View>

              <View style={{marginTop:10,marginBottom:10,padding:10}}>
                  <View style={{flexDirection:'column'}}>
                  <Text style={{fontSize:15,marginRight:19}}>{_.get(v,'_rawJson.fields.Name','test')}
                    </Text>   
                    {_.get(v,'_rawJson.fields.price') &&<Text style={{color:'#118200',fontWeight:'600'}}>${_.get(v,'_rawJson.fields.price')}
                    </Text> }
                  </View>
                 {_.get(v,'_rawJson.fields.beds') &&   <Text> <Text style={{fontWeight:'600'}}>{_.get(v,'_rawJson.fields.beds')}</Text> bd  | <Text style={{fontWeight:'600'}}>{_.get(v,'_rawJson.fields.bath')}</Text> ba |
                    </Text>}
                   {_.get(v,'_rawJson.fields.address') && <Text>{_.get(v,'_rawJson.fields.address')}
                    </Text>    }
                   {_.get(v,'_rawJson.fields.developer') && <Text>{_.get(v,'_rawJson.fields.developer')}
                    </Text>    }
              </View>
         </TouchableOpacity>
              })
       }
       return (
              <View style={styles.container}>
         <View style={{flexDirection:'row',justifyContent:'flex-start',marginTop:10,alignItems:'center',marginBottom:15}}>
             <TouchableOpacity onPress={()=>settypeSet('1')} style={ [  {backgroundColor:typeSet=='1'?'#1266f1':"#FFFFFF",marginRight:20},typeSet=='2'?styles.showdowProps:{}]}>
              <Text style={{color:typeSet=='1'?'#FFFFFF':'#000000',padding:10,fontWeight:'600'}}>
                FOR SALE
              </Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={()=>settypeSet('2')} style={ [  {backgroundColor:typeSet=='2'?'#1266f1':"#FFFFFF"},typeSet=='1'?styles.showdowProps:{}]}>
              <Text style={{color:typeSet=='2'?'#FFFFFF':'#000000',padding:10,fontWeight:'600'}}>
              FOR RENT
              </Text>
             </TouchableOpacity>
             
         </View>
         <ScrollView style={{backgroundColor:'#ececec'}}>
         {loadList()}
         </ScrollView>
         <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          alignSelf: 'center',
          width: 80,
          height: 60,
          // borderRadius: 30,
          backgroundColor: '#dcebff',
          justifyContent: 'center',
          alignItems: 'center',
          ...styles.showdowProps
        }}
        onPress={() => {
          navigate.navigate('Map')
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
// height:60,
width: 80,
          height: 60,
        }}>
        <FontAwesome5 name="map-marked" size={20} color="#0a0bff" style={{marginRight:4}} />
        <Text style={{color:'#0a0bff',fontWeight:'500'}}>
        Map</Text>
        </View>
      </TouchableOpacity>
         
         </View>
       );
     }


     export default BuyScreen
     
     const styles = StyleSheet.create({
       container: {
         flex: 1,
         backgroundColor: '#ececec',
        //  justifyContent: 'center',
        //  alignItems: 'center',
        padding:10
       },
       videoPlayer: {
         width: '100%',
         aspectRatio: 16 / 9,
       },
       playPauseButton: {
         marginTop: 10,
         padding: 10,
         backgroundColor: '#333',
         borderRadius: 5,
       },
       playPauseButtonText: {
         color: '#FFF',
         fontSize: 18,
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
       showdowPropsTwo:{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        
        elevation: 16,
       }
     });