import React, { useState,useEffect } from "react";

import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { SliderBox } from "react-native-image-slider-box";
import { AntDesign,FontAwesome5,MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import _ from 'lodash';
import { WebView } from 'react-native-webview';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Airtable, { Table,Base } from 'airtable';

function DetailScreen(props) {
       var base = new Airtable({ apiKey: 'key5MaogjBry0tlvf' }).base('app67vic1sZQ72H6p');

       // console.log('asndasbjdbjasbdvajs',props);
       const [modalVisible, setModalVisible] = useState(false);

       const video = React.useRef(null);
       const [status, setStatus] = React.useState({});
const [images, setimages] = useState([])
const [listDEtails, setlistDEtails] = useState({})
const [typeSet, settypeSet] = React.useState('1')

const openModal = () => {
       setModalVisible(true);
     };
   
     const closeModal = () => {
       setModalVisible(false);
     };
     useEffect(() => {
       if(_.get(props,'route.params.id')){
              base('tables').find(_.get(props,'route.params.id')).then((record)=>{
                     console.log('sdsdsdsdssssdsddsxsxdsdasdasd',_.get(record,'_rawJson.fields'));
                     // setListItems(record)
                     if(_.get(record,'_rawJson.fields')){
                       setlistDEtails(_.get(record,'_rawJson.fields'))
                     }
                       }).catch((error)=>{
                         console.log('sadnxdxcsdsdsabshdbahsbdhas',error);
                       })
       }
      
     }, [])
       return (
             <View style={{flex:1,padding:10}}>
              <ScrollView>
               <View style={[styles.container,{marginBottom:10}]}>
          <Video
        ref={video}
       source={_.get(listDEtails,'video')?{uri:_.get(listDEtails,'video')}:require('../../assets/videos/1.mp4')}
        style={styles.videoPlayer}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
         </View>
         <SliderBox
         
  images={_.get(listDEtails,'images1',[])?[_.get(listDEtails,'images1'),_.get(listDEtails,'images2'),_.get(listDEtails,'images3')]:[]}
  sliderBoxHeight={400}
  onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
/>
<View style={{marginTop:10,marginBottom:10}}>
                  <View style={{flexDirection:'column'}}>
                  <Text style={{fontSize:18,marginRight:19}}>{_.get(listDEtails,'Name')}
                    </Text>   
                    <Text style={{color:'#118200',fontWeight:'600',fontSize:18,}}>Starting from ${_.get(listDEtails,'price')}
                    </Text> 
                  </View>
                    <Text style={{fontSize:18}}> <Text style={{fontSize:18,fontWeight:'600'}}>{_.get(listDEtails,'beds')}</Text> bd  | <Text style={{fontWeight:'600'}}>{_.get(listDEtails,'bath')}</Text> ba |
                    </Text>
                    <Text style={{fontSize:18}}>{_.get(listDEtails,'address')}
                    </Text>    
                    <Text style={{fontSize:18}}>{_.get(listDEtails,'developer')}
                    </Text>    
                    <Text style={{fontSize:18}}>{_.get(listDEtails,'delivery')}
                    </Text>  

                    <TouchableOpacity onPress={()=>setModalVisible(true)} style={{width:123,backgroundColor:'#1266f1',marginTop:10}}>
                    <Image resizeMode="center" style={{width:100,height:20,padding:10,margin:10}} source={require('../../assets/images/360logowhitebg.png')}/>
                    </TouchableOpacity>
<View style={{borderWidth:1,borderColor:'grey',marginTop:10,marginBottom:10,width:Dimensions.get('screen').width}} />
                    <View style={{flexDirection:'row',justifyContent:'flex-start',marginTop:10,alignItems:'center',marginBottom:15}}>
             <TouchableOpacity onPress={()=>settypeSet('1')} style={ [  {backgroundColor:typeSet=='1'?'#1266f1':"#FFFFFF",marginRight:20},typeSet=='2'?styles.showdowProps:{}]}>
              <Text style={{color:typeSet=='1'?'#FFFFFF':'#000000',padding:10,fontWeight:'600'}}>
              Request a tour
              </Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={()=>settypeSet('2')} style={ [  {backgroundColor:typeSet=='2'?'#1266f1':"#FFFFFF"},typeSet=='1'?styles.showdowProps:{}]}>
              <Text style={{color:typeSet=='2'?'#FFFFFF':'#000000',padding:10,fontWeight:'600'}}>
              Contact agent
              </Text>
             </TouchableOpacity>
             
         </View>
         <View>
              <Text style={{fontSize:18}}>Overview</Text>
              <View style={{marginTop:10}}>
                     <View style={{alignItems:'center',flexDirection:'row',marginBottom:15}}>
                     <AntDesign name="layout" size={20} color="black" />
                            <Text style={{fontSize:17,marginLeft:10}}>
                            Single family residence
                            </Text>
                     </View>
                     <View style={{alignItems:'center',flexDirection:'row',marginBottom:15}}>
                     <AntDesign name="calendar" size={20} color="black" />
                            <Text style={{fontSize:17,marginLeft:10}}>
                            Built in 2023
                            </Text>
                     </View>
                     <View style={{alignItems:'center',flexDirection:'row',marginBottom:15}}>
                     <FontAwesome5 name="temperature-high" size={20} color="black" />
                            <Text style={{fontSize:17,marginLeft:10}}>
                            Fireplace(s), heat pump, multiple systems
                            </Text>
                     </View>
                     <View style={{alignItems:'center',flexDirection:'row',marginBottom:15}}>
                     <FontAwesome5 name="airbnb" size={20} color="black" />
                            <Text style={{fontSize:17,marginLeft:10}}>
                            Central air
                            </Text>
                     </View>
                     <View style={{alignItems:'center',flexDirection:'row',marginBottom:15}}>
                     <MaterialCommunityIcons name="air-filter" size={20} color="black" />
                            <Text style={{fontSize:17,marginLeft:10}}>
                            Garage spaces
                            </Text>
                     </View>
                     
              </View>
         </View>
         <View style={{borderWidth:1,borderColor:'grey',marginTop:10,marginBottom:10,width:Dimensions.get('screen').width}} />
<View>
<View style={{alignItems:'center',flexDirection:'row',marginBottom:15}}>
       <MaterialIcons name="mail" size={24} color="black" />
       <Text style={{fontSize:20,marginLeft:10}}>Contact agent:</Text>
       </View>
       <View style={{marginBottom:15}}>
       <Text style={{fontSize:17,marginBottom:7}}>Name</Text>
<TextInput placeholder="Enter your name" style={{
       backgroundColor:'#fbfbfb',
       borderWidth:1,
       borderColor:'grey',
       height:40,
       padding:10
}} />

       </View>
       <View style={{marginBottom:15}}>
       <Text style={{fontSize:17,marginBottom:7}}>Email Address</Text>
<TextInput placeholder="Enter your email" style={{
       backgroundColor:'#fbfbfb',
       borderWidth:1,
       borderColor:'grey',
       height:40,
       padding:10
}} />

       </View>
       <View style={{marginBottom:15}}>
       <Text style={{fontSize:17,marginBottom:7}}>Phone</Text>
<TextInput placeholder="Enter your phone"  style={{
       backgroundColor:'#fbfbfb',
       borderWidth:1,
       borderColor:'grey',
       height:40,
       padding:10
}} />

       </View>
       <View style={{marginBottom:15}}>
       <Text style={{fontSize:17,marginBottom:7}}>Message</Text>
<TextInput numberOfLines={6} placeholder="Enter your message" style={{
       backgroundColor:'#fbfbfb',
       borderWidth:1,
       borderColor:'grey',
       height:80,
       padding:10,
       textAlign:'left',
       alignItems:'flex-start',
       justifyContent:'flex-start'
}} />

       </View>
       <View>
       <TouchableOpacity  style={ [  {backgroundColor:'#1266f1',alignItems:'center'},styles.showdowProps]}>
              <Text style={{color:'#FFFFFF',padding:10,fontWeight:'600',fontSize:17}}>
              Contact agent
              </Text>
             </TouchableOpacity>
       </View>
</View>
              </View>
</ScrollView>
{<Modal
// style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
 
        <View style={styles.modalContainer}>
        <View style={[styles.modalContent]}>
            <WebView  originWhitelist={['*']} source={{ uri: _.get(listDEtails,'virtualTour')? _.get(listDEtails,'virtualTour'):'https://biganto.com/tour/36623/' }} />
          
          </View>
        <View style={{position:'absolute'}}>
        <AntDesign style={{marginTop:hp(-26),marginLeft:wp(88)}} name="closecircle" size={33} color="white" onPress={closeModal} />
        </View>

         
        </View>
      </Modal>}
             </View>
       );
     }


     export default DetailScreen
     
     const styles = StyleSheet.create({
       container: {
         flex: 1,
         backgroundColor: '#000',
         justifyContent: 'flex-start',
         alignItems: 'center',
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
       modalContainer: {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              height:hp(10)
              // width:200
            },
            modalContent: {
              backgroundColor: 'white',
              // padding: 20,
              borderRadius: 8,
              // flex:1,
              width:wp(93),
              height:Dimensions.get('screen').width
            },
            modalText: {
              fontSize: 18,
              marginBottom: 10,
            },
     });