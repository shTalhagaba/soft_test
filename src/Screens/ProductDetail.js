import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import APIService from '../network/APIService';
import Header from '../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, removeFromCart} from '../store/action';
import {useIsFocused} from '@react-navigation/native';

const ProductDetail = props => {
  const itemId = props.route.params.itemId;
  const [selectedProduct, setSelectedProduct] = useState();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.reducer);
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let result = cartItems.filter(element => {
      return element.id === itemId;
    });
    console.log('result : ', result);
    if (result.length) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
  }, []);

  useEffect(() => {
    let result = cartItems.filter(element => {
      return element.id === selectedProduct?.id;
    });
    console.log('result : ', result);
    if (result.length) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
  }, [cartItems,selectedProduct]);

  const fetchData = async () => {
    try {
      const productResponse = await APIService.getProductById(itemId);
      setSelectedProduct(productResponse.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = item => {
    dispatch(addToCart({...item, qty: 1}))
  };
  const handleRemoveFromCart = item => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header navigation={props.navigation} back={true} />
      {loading ? (
        <ActivityIndicator
          size="large"
          color="black"
          style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}
        />
      ) : (
        <ScrollView style={{flex: 1}}>
          <Image
            source={{uri: selectedProduct?.img}}
            style={{
              width: '70%',
              height: 450,
              alignSelf: 'center',
              borderRadius: 50,
              marginTop: 10,
              marginBottom: 20,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: '800',
              alignSelf: 'center',
              margin: 5,
              textAlign: 'center',
            }}>
            {selectedProduct?.name}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              alignSelf: 'center',
              margin: 5,
              textAlign: 'center',
            }}>
            Colour: {selectedProduct?.colour}
          </Text>
          <View
            style={{
              borderColor: 'black',
              borderWidth: 1,
              padding: 10,
              width: '30%',
              alignItems: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              borderRadius: 15,
              marginVertical: 10,
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Price: ${selectedProduct?.price}
            </Text>
          </View>
          {isAdded ? (
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                width: '80%',
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                borderRadius: 15,
                borderWidth: 1,
                borderColor: 'black',
                zIndex:10000,
              }}
              onPress={() => handleRemoveFromCart(selectedProduct)}>
              <Text style={{fontSize: 18, fontWeight: '500', color: 'white'}}>
                Remove from Cart
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: 'orange',
                width: '80%',
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                borderRadius: 15,
                borderWidth: 1,
                borderColor: 'black',
              }}
              onPress={() => handleAddToCart(selectedProduct)}>
              <Text style={{fontSize: 18, fontWeight: '500', color: 'white'}}>
                Add to Cart
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default ProductDetail;
