import { View, Text, StyleSheet, Image, Button } from 'react-native';
import React from 'react';

export default function ServiceCard({ navigation, id_service, service_name, description, image, ...props }) {
    const handlePress = () => {
        navigation.navigate('Device', { id_service });
    };

    const getImageUri = (imagePath) => {
      return imagePath.replace('localhost', '10.0.2.2');
  };

    return (
        <View style={styles.card}>
            <Image
              source={{ uri: getImageUri(image) + "?nocache=" + new Date().getTime() }}
              style={styles.image}
            />
            <View style={styles.container}>
                <Text style={styles.brandTitle}>{service_name}</Text>
                <Text style={styles.text}>{description}</Text>
                {/* Other fields like location_service and support_hours can be added here if needed */}
            </View>
            <Button title='View details' onPress={handlePress} />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        width: 320,
        backgroundColor: '#303030',
        borderRadius: 12,
        padding: 24,
        gap: 12,
        margin: 8,
    },
    image: { width: 150, height: 150, borderRadius: 8, marginRight: 12, },
    container: { display: 'flex', width: '100%', margin: 8 },
    row: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
    brandTitle: { color: '#4287f5', fontSize: 16 },
    text: { color: '#f0f0f0', fontSize: 16 },
});