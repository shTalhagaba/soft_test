import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

const Header = props => {
  const cartData = useSelector(state => state.reducer);
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    setCartItems(cartData.length);
  }, [cartData]);
  return (
    <View
      style={{
        backgroundColor: 'orange',
        width: '100%',
        height: 60,
        flexDirection: 'row',
      }}>
      {props?.back?
      <TouchableOpacity
        style={{
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'flex-end',
          borderRadius: 25,
          marginLeft: 15,
        }}
        onPress={() => props.navigation.goBack()}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>{'Back'}</Text>
      </TouchableOpacity>:null}
      <TouchableOpacity
        style={{
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 25,
          marginRight: 5,
          marginLeft:'auto',
        }}
        onPress={() => props.navigation.navigate('Cart')}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '900',
            position: 'absolute',
            top: 1,
          }}>
          {cartItems}
        </Text>
        <Image
          source={require('../assets/cart.png')}
          style={{width: 35, height: 35, marginTop: 8, marginRight: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
