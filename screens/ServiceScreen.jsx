import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../api';
import { setServices } from '../store/serviceSlice';
import ServiceCard from '../components/ServiceCard';

export default function ServiceScreen({ navigation }) {
  const dispatch = useDispatch();
  const { services } = useSelector((store) => store.service);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getAllServices();
  }, [searchTerm]); 

  async function getAllServices() { // Поиск на backend 
    try {
      const params = searchTerm ? { title: searchTerm } : {};
      const response = await axiosInstance.get('/services', { params });
      dispatch(setServices(response.data));
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }

  return (
    <ScrollView>
      <TextInput
        style={styles.searchBar}
        placeholder="Поиск услуг..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={styles.page}>
        {!!services && services.map((service) => (
          <ServiceCard key={service.id} {...service} navigation={navigation} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
  },
  searchBar: {
    fontSize: 18,
    margin: 10,
    width: '95%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
  },
});