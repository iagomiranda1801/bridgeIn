import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';

type PhotosSectionProps = {
  photos: Array<{
    id: string;
    uri: string;
  }>;
};

const PhotosSection: React.FC<PhotosSectionProps> = ({ photos }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Photos</Text>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {photos.map((photo) => (
          <View key={photo.id} style={styles.photoCard}>
            <Image 
              source={{ uri: photo.uri }} 
              style={styles.photo} 
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scrollContent: {
    paddingRight: 20,
    paddingBottom: 4,
  },
  photoCard: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 12,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
});

export default PhotosSection;
