import React, { useState,useEffect } from "react";

import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { SliderBox } from "react-native-image-slider-box";
import { propertiesMock } from '../../json-file/constants';
import { AntDesign,FontAwesome5,MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import _ from 'lodash';
function ContactScreen() {

       const video = React.useRef(null);
       const [status, setStatus] = React.useState({});
const [images, setimages] = useState([])
const [listDEtails, setlistDEtails] = useState(_.get(propertiesMock,'BuyHomes[0]'))
const [typeSet, settypeSet] = React.useState('1')

       
       return (
             <View style={{flex:1,padding:10}}>
              <ScrollView>
              
         <SliderBox
         
  images={_.get(listDEtails,'images',[])}
  sliderBoxHeight={400}
  onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
/>
<View style={{marginTop:10,marginBottom:10}}>
        
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
             </View>
       );
     }


     export default ContactScreen
     
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
     });