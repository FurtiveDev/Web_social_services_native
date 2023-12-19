import { View, Text, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { resetService, setService } from '../store/serviceSlice';
import { axiosInstance } from '../api';

export default function DeviceScreen({ route }) {
    const { id_service } = route.params;
    const dispatch = useDispatch();
    const { service } = useSelector((store) => store.service);
    useEffect(() => {
        async function getOneService() {
            await axiosInstance.get(`/services/${id_service}`).then((response) => dispatch(setService(response?.data)));
        }
        getOneService();
        return () => {
            dispatch(resetService());
        };
    }, [dispatch]);
    console.log((service.image))
    return (
        <View style={styles.container}>
            <Image //тк картинка недоступна в эмуляторе через локалхост поэтому меняем ее на 10.0.2.2
            source={{
                uri: typeof service.image === 'string' ? service.image.replace('localhost', '192.168.72.14') : 'default_image_uri'
            }}
            style={styles.image}
            />
            <Text style={styles.title}>{service.service_name}</Text>
            <Text style={styles.description}>{service.description}</Text>
            <Text style={styles.info}>Location: {service.location_service}</Text>
            <Text style={styles.info}>Support Hours: {service.support_hours}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    description: {
        fontSize: 16,
        marginBottom: 10
    },
    info: {
        fontSize: 14,
        color: 'gray'
    }
});