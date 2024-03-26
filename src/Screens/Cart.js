import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import Header from '../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import Divider from '../components/Divider';
import {addToCart, removeFromCart, updateFromCart} from '../store/action';

const Cart = props => {
  const cartItems = useSelector(state => state.reducer);
  const dispatch = useDispatch();

  const handleAddOneToCart = item => {
    let list = [...cartItems];
    let add = [];
    list.map(element => {
      if (element?.id === item?.id) {
        add.push({...element, qty: element?.qty + 1});
      } else {
        add.push(element);
      }
    });
    dispatch(updateFromCart(add));
  };

  const handleNegToCart = item => {
    let list = [...cartItems];
    let add = [];
    list.map(element => {
      if (element?.id === item?.id && item?.qty > 1) {
        add.push({...element, qty: element?.qty - 1});
      } else {
        add.push(element);
      }
    });
    dispatch(updateFromCart(add));
  };

  const handleRemoveFromCart = item => {
    dispatch(removeFromCart(item.id));
  };

  const renderItem = ({item}) => (
    <View
      style={{marginVertical: 10, marginHorizontal: 20, flexDirection: 'row'}}>
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          position: 'absolute',
          width: '20%',
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          bottom: 60,
          right: 10,
          borderRadius: 15,
          borderWidth: 1,
          borderColor: 'black',
        }}
        onPress={() => handleRemoveFromCart(item)}>
        <Text style={{fontSize: 14, fontWeight: '500', color: 'white'}}>
          Remove
        </Text>
      </TouchableOpacity>
      <Image
        source={{uri: item.img}}
        style={{width: 100, height: 150, borderRadius: 10}}
      />
      <View
        style={{
          width: '70%',
          marginHorizontal: 7,
          padding: 14,
          marginVertical: 10,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>{item.name}</Text>
        <Text style={{fontSize: 16, marginTop: 5}}>Colour: {item.colour}</Text>
        <Text style={{fontSize: 16, marginTop: 5}}>Price: ${item.price}</Text>
        <View
          style={{flexDirection: 'row', marginTop: 15, alignContent: 'center'}}>
          <TouchableOpacity
            style={{
              backgroundColor: 'orange',
              width: 35,
              height: 35,
              alignItems: 'center',
              borderRadius: 15,
              borderWidth: 1,
              borderColor: 'black',
            }}
            onPress={() => handleNegToCart(item)}>
            <Text style={{fontSize: 26, fontWeight: '500', color: 'white'}}>
              -
            </Text>
          </TouchableOpacity>
          <Text style={{fontSize: 16, marginHorizontal: 20}}>
            Qty: {item?.qty}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: 'orange',
              width: 35,
              height: 35,
              alignItems: 'center',
              borderRadius: 15,
              borderWidth: 1,
              borderColor: 'black',
            }}
            onPress={() => handleAddOneToCart(item)}>
            <Text style={{fontSize: 24, fontWeight: '500', color: 'white'}}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Divider />
    </View>
  );
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header navigation={props.navigation} back={true} />
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={() => (
          <View
            style={{
              marginTop: 20,
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20}}>{'Empty Cart!!'}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Cart;
