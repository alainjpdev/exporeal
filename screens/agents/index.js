import React, { useState,useEffect } from "react";

import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { SliderBox } from "react-native-image-slider-box";
import { agentsMock } from '../../json-file/agents';
import { AntDesign,FontAwesome5,MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import _ from 'lodash';
function AgentScreen() {

       const video = React.useRef(null);
       const [status, setStatus] = React.useState({});
const [images, setimages] = useState([])
const [listDEtails, setlistDEtails] = useState(agentsMock.agents)
const [typeSet, settypeSet] = React.useState('1')

const data = [
       { id: 1, name: 'Item 1' },
       { id: 2, name: 'Item 2' },
       { id: 3, name: 'Item 3' },
       { id: 4, name: 'Item 4' },
       { id: 5, name: 'Item 5' },
       { id: 6, name: 'Item 6' },
       // Add more data as needed
     ];
     

       const renderItem = ({ item }) => {
         return (
           <View style={[styles.item,{justifyContent:'space-between',flexDirection:'row',padding:30}]}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Image style={{width:60,height:60,borderRadius:40}} source={{uri:item?.images}} /> 
              <View style={{marginLeft:5}}>
                     <Text style={{fontSize:17,fontWeight:'500'}}>
                            {_.get(item,'name')}
                     </Text>
                     <Text>
                     {_.get(item,'mail')}
                     </Text>
              </View>
            </View>
            <View style={{backgroundColor:'green',borderRadius:30}}>
            <Text style={{fontSize:14,color:'white',padding:7,fontWeight:'500'}}>Active</Text>
            </View>
           </View>
         );
       };
     
       const renderColumnHeader = (headerName) => {
         return (
           <View style={[styles.columnHeader,{justifyContent:'space-between',flexDirection:'row',padding:30}]}>
             <Text style={styles.columnHeaderText}>Name</Text>
             <Text style={styles.columnHeaderText}>Status</Text>
           </View>
         );
       };
       return (
             <View style={{flex:1,padding:10}}>
              <FlatList
        data={listDEtails}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            {renderColumnHeader('Column 1')}
           
          </View>
        )}
      />
             </View>
       );
     }


     export default AgentScreen
     
     const styles = StyleSheet.create({
       container: {
         flex: 1,
         backgroundColor: '#000',
         justifyContent: 'flex-start',
         alignItems: 'center',
       },
       headerContainer: {
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            },
            columnHeader: {
              flex: 1,
              alignItems: 'center',
              backgroundColor: 'lightblue',
              paddingVertical: 10,
              marginHorizontal: 5,
            },
            columnHeaderText: {
              fontWeight: 'bold',
            },
            item: {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              margin: 5,
              backgroundColor: 'lightgray',
            },
     });