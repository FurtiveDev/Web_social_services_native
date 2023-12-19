import { ScrollView, StyleSheet, View, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../api';
import { setServices } from '../store/serviceSlice';
import ServiceCard from '../components/ServiceCard';

export default function ServiceScreen({ navigation }) {
    const dispatch = useDispatch();
    const { services } = useSelector((store) => store.service);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function getAllServices() {
            await axiosInstance.get('/services').then((response) => dispatch(setServices(response?.data)));
        }
        getAllServices();
    }, [dispatch]);

    const filteredServices = searchTerm
        ? services.filter(service =>
            service.service_name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : services;

    return (
        <ScrollView>
            <TextInput
                style={styles.searchBar}
                placeholder="Поиск услуг..."
                value={searchTerm}
                onChangeText={setSearchTerm}
                // The following props ensure the keyboard is set correctly for Russian input
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <View style={styles.page}>
                {!!filteredServices &&
                    filteredServices.map((service) => (
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