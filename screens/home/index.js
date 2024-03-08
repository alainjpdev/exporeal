import * as React from 'react';

import { Dimensions, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

function HomeScreen() {
  let navigate = useNavigation()

       const video = React.useRef(null);
       const [status, setStatus] = React.useState({});
       return (<View style={{flex:1}}>
              <View style={styles.container}>
              
          <Video
        ref={video}
        shouldPlay={true}
       source={{uri:'https://res.cloudinary.com/dk473trop/video/upload/v1677176374/azulik_video/azulik_full_aarvha.mp4'}}
        style={styles.videoPlayer}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
        
         </View>
         <TouchableOpacity onPress={()=>navigate.navigate('Buy')}  style={{backgroundColor:'#dcebff',position:'absolute',marginLeft:wp(83),marginTop:20,borderRadius:10}}>
        <Text style={{color:'#0a0bff',padding:10}}>Skip</Text>
      </TouchableOpacity>
         </View>
       );
     }


     export default HomeScreen
     
     const styles = StyleSheet.create({
       container: {
         flex: 1,
         backgroundColor: '#000',
         justifyContent: 'center',
         alignItems: 'center',
       },
       videoPlayer: {
         width: '100%',
        //  height:Dimensions.get('window').height,
      //  marginTop:hp(-10)
         aspectRatio: 9/16,
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