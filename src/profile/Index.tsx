import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import Button from '../components/Button';
import Divider from '../components/Divider';
import Checkbox from '../components/Checkbox';

import ProfileHeader from './ProfileHeader';
import PhotosSection from './PhotosSection';
import DocumentsSection from './DocumentsSection';

type ProfileScreenProps = {
  route?: {
    params?: {
      editing?: boolean;
    };
  };
};

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const route = useRoute();

  const [isEditing, setIsEditing] = useState(false);

  // Dados de exemplo para as fotos
  const photos = [
    { id: '1', uri: 'https://images.unsplash.com/photo-1590479773265-7464e5d48118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
    { id: '2', uri: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
    { id: '3', uri: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
    { id: '4', uri: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80' },
  ];
  
  // Dados de exemplo para os documentos
  const documents = [
    { id: '1', name: 'authorization_certificate.pdf', type: 'pdf' },
    { id: '2', name: 'identity_card.pdf', type: 'pdf' },
    { id: '3', name: 'construction_license_2025.pdf', type: 'pdf' },
    { id: '4', name: 'safety_training_certificate.pdf', type: 'pdf' },
  ];

  useEffect(() => {
    if (route.params?.editing) {
      setIsEditing(true);
    }
  }, [route.params]);

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader 
        name="Jack Smith" 
        avatarUri="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
        progressPercentage={0.8}
        salaryRange="$800"
        experienceTime="7 years" 
      />
      <View style={styles.content}>
        <View style={styles.professionalAreaContainer}>
          <Text style={styles.professionalAreaTitle}>Professional Area:</Text>
          <Text style={styles.professionalAreaText}>
            Skills: Installation and repair: Proficient in installing and repairing pipes, plumbing issues, clogged toilets.
          </Text>
          <Divider color="#A2E2FB" thickness={3} marginVertical={12} />
        </View>
        
        <PhotosSection photos={photos} />
        <Divider color="#A2E2FB" thickness={3} marginVertical={12} />
        
        <DocumentsSection documents={documents} />
        <Divider color="#A2E2FB" thickness={3} marginVertical={12} />
        
        <View style={styles.moreInfoContainer}>
          <Text style={styles.moreInfoTitle}>More information:</Text>
          <Text style={styles.moreInfoText}>Speak English and Spanish.</Text>
        </View>
        
        <View style={styles.syndicateButtonContainer}>
          <Button
            label="Syndicate verification"
            onPress={() => console.log('Syndicate verification pressed')}
            variant="outlined"
            size="medium"
            icon="check-decagram"
          />
        </View>
        
        <View style={styles.daysOfWeekContainer}>
          <Text style={styles.sectionTitle}>Days of the week</Text>
          <View style={styles.daysButtonsContainer}>
            <TouchableOpacity 
              style={styles.dayButton}
              onPress={() => console.log('Sunday pressed')}
            >
              <Text style={styles.dayButtonText}>S</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.dayButton}
              onPress={() => console.log('Monday pressed')}
            >
              <Text style={styles.dayButtonText}>M</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.dayButton, styles.selectedDayButton]}
              onPress={() => console.log('Tuesday pressed')}
            >
              <Text style={styles.selectedDayButtonText}>T</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.dayButton, styles.selectedDayButton]}
              onPress={() => console.log('Wednesday pressed')}
            >
              <Text style={styles.selectedDayButtonText}>W</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.dayButton, styles.selectedDayButton]}
              onPress={() => console.log('Thursday pressed')}
            >
              <Text style={styles.selectedDayButtonText}>T</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.dayButton, styles.selectedDayButton]}
              onPress={() => console.log('Friday pressed')}
            >
              <Text style={styles.selectedDayButtonText}>F</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.dayButton}
              onPress={() => console.log('Saturday pressed')}
            >
              <Text style={styles.dayButtonText}>S</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.availabilityContainer}>
          <Text style={styles.sectionTitle}>Availability</Text>
          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxRow}>
              <TouchableOpacity 
                style={styles.customCheckbox}
                onPress={() => console.log('Morning toggled')}
              >
                <View style={[styles.checkboxSquare, styles.checkedBox]}>
                  <Text style={styles.checkMark}>✓</Text>
                </View>
                <Text style={styles.checkboxLabel}>Morning</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.customCheckbox}
                onPress={() => console.log('Afternoon toggled')}
              >
                <View style={[styles.checkboxSquare, styles.checkedBox]}>
                  <Text style={styles.checkMark}>✓</Text>
                </View>
                <Text style={styles.checkboxLabel}>Afternoon</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.checkboxRow}>
              <TouchableOpacity 
                style={styles.customCheckbox}
                onPress={() => console.log('Night toggled')}
              >
                <View style={styles.checkboxSquare}>
                  {/* Unchecked */}
                </View>
                <Text style={styles.checkboxLabel}>Night</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.customCheckbox}
                onPress={() => console.log('Dawn toggled')}
              >
                <View style={styles.checkboxSquare}>
                  {/* Unchecked */}
                </View>
                <Text style={styles.checkboxLabel}>Dawn</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
  },
  professionalAreaContainer: {
    marginBottom: 20,
    paddingHorizontal: 0,
  },
  professionalAreaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  professionalAreaText: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 16,
    lineHeight: 24,
  },
  moreInfoContainer: {
    marginBottom: 5,
    paddingHorizontal: 0,
  },
  moreInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  moreInfoText: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 16,
    lineHeight: 24,
  },
  syndicateButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  section: {
    padding: 16,
    elevation: 2,
    borderRadius: 8,
    shadowRadius: 4,
    marginBottom: 16,
    shadowOpacity: 0.1,
    shadowColor: '#000',
    backgroundColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 2 },
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#10365F',
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333333',
  },
  editingIndicator: {
    padding: 8,
    marginTop: 16,
    borderRadius: 4,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#E8F5FE',
  },
  editingText: {
    marginLeft: 8,
    color: '#1DA1F2',
    fontWeight: 'bold',
  },
  availabilityContainer: {
    marginVertical: 16,
    backgroundColor: '#E8F5FE',
    padding: 16,
    borderRadius: 8,
  },
  checkboxContainer: {
    marginTop: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  customCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 5,
  },
  checkboxSquare: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#10365F',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#10365F',
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#000000',
  },
  daysOfWeekContainer: {
    marginVertical: 16,
    backgroundColor: '#E8F5FE',
    padding: 16,
    borderRadius: 8,
  },
  daysButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 5,
  },
  dayButton: {
    width: 40,
    height: 40,
    marginHorizontal: 2,
    borderRadius: 8,
    borderColor: '#10365F',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  selectedDayButton: {
    backgroundColor: '#10365F',
  },
  dayButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10365F',
  },
  selectedDayButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  availabilityContainer: {
    marginVertical: 16,
  },
  checkboxContainer: {
    marginTop: 10,
  },
});

export default ProfileScreen;

