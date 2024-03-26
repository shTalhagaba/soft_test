import React, {useState, useEffect} from 'react';
import {ScrollView, Text, View} from 'react-native';
import APIService from '../network/APIService';
import Card from '../components/Card';
import Header from '../components/Header';

const Home = props => {
  const [products, setProducts] = useState([]);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const productsResponse = await APIService.getProducts();
      setProducts(productsResponse.data);

      const menuResponse = await APIService.getMenu();
      setMenu(menuResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white', marginBottom: 10}}>
      <Header navigation={props.navigation} />
      <ScrollView style={{flex: 1}}>
        {products.map(product => (
          <Card
            key={product.id}
            product={product}
            navigation={props.navigation}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;
