import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {addToCart, removeFromCart} from '../store/action';
import {useDispatch, useSelector} from 'react-redux';

const Card = props => {
  const product = props.product;
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.reducer);
  const handleAddToCart = item => {
    dispatch(addToCart({...item, qty: 1}));
  };
  const handleRemoveFromCart = item => {
    dispatch(removeFromCart(item.id));
  };
  useEffect(() => {
    let result = cartItems.filter(element => {
      return element.id === product.id;
    });
    if (result.length) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
  }, [cartItems]);
  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'white',
        width: '95%',
        margin: 5,
        alignSelf: 'center',
        flexDirection: 'row',
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 7,
      }}
      onPress={() =>
        props.navigation.navigate('ProductDetail', {itemId: product.id})
      }>
      <Image
        source={{uri: product.img}}
        style={{
          width: 92,
          height: 143,
          borderRadius: 15,
        }}
      />
      <View
        style={{
          width: '75%',
          margin: 5,
          alignSelf: 'flex-start',
          padding: 14,
        }}>
        <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
          {product.name}
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            marginTop: 10,
            fontWeight: '600',
          }}>
          Colour: {product.colour}
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          Price: ${product.price}
        </Text>
      </View>
      {isAdded ? (
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            position: 'absolute',
            width: '40%',
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            bottom: 15,
            right: 15,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: 'black',
          }}
          onPress={() => handleRemoveFromCart(product)}>
          <Text style={{fontSize: 14, fontWeight: '500', color: 'white'}}>
            Remove from Cart
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: 'orange',
            position: 'absolute',
            width: '40%',
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            bottom: 15,
            right: 15,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: 'black',
          }}
          onPress={() =>   handleAddToCart(product)}>
          <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default Card;
