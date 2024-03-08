import { StatusBar } from 'expo-status-bar';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/home';

import { AntDesign,Ionicons } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useEffect, useState } from 'react';
import BuyScreen from './screens/buy';
import MapScreen from './screens/map';
import DetailScreen from './screens/buy/details-view';
import ContactScreen from './screens/contact';
import AgentScreen from './screens/agents';
const Stack = createNativeStackNavigator();



function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);




  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const CustomHeader =({navigation})=>{
// console.log('navigationnavigation',navigation);
    return <View style={[styles.container1,{flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#000000',height:hp('13%')}]}>
      <View style={{marginTop:10,marginLeft:10}}>
      <Image resizeMethod='resize' resizeMode='center' style={{height:hp('10%'),width:wp('60%')}} source={require('./assets/images/sp.png')} />
      </View>
      <View style={{marginTop:10,marginRight:10}}>
      <AntDesign onPress={()=>toggleMenu()}  name="menu-unfold" size={24} color="white" />
      </View>
      <Modal style={{width:wp('20%')}} visible={isMenuOpen} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={closeMenu}>
        <View style={styles.modalContainer}>
          <View style={styles.menuItems}>
            <TouchableOpacity onPress={()=>{closeMenu();navigation.navigate('Home');}} style={styles.menuItem}>
              <Text style={styles.menuItemText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{closeMenu();navigation.navigate('Buy');}} style={styles.menuItem}>
              <Text style={styles.menuItemText}>Buy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Rent</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{closeMenu();navigation.navigate('Agent');}} style={styles.menuItem}>
              <Text style={styles.menuItemText}>Agents</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{closeMenu();navigation.navigate('Contact');}} style={styles.menuItem}>
              <Text style={styles.menuItemText}>Contact</Text>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity> */}
        </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  }
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{
          header: (props) => <CustomHeader {...props} title="My App" />,
        }}>
            
          
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Buy" component={BuyScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="Agent" component={AgentScreen} />
          <Stack.Screen name="ListView" component={DetailScreen} />
      
        {/* <Stack.Screen name="ListView" component={DetailScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#333',
    
  },
  menuButton: {
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // width:wp('70%')
  },
  menuItems: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width:wp('70%'),
    alignItems: 'center',
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuItemText: {
    color: '#333',
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
