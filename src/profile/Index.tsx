import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import api from '../config';
const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const [profile, setProfile] = useState(null);
  const [availability, setAvailability] = useState({
    Morning: false,
    Afternoon: false,
    Night: false,
    Dawn: false,
  });

  const toggleSlot = (slot: string) => {
    setAvailability(prev => ({ ...prev, [slot]: !prev[slot] }));
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.post('/mobile/users/dados');
        const data = response.data.Data
        setProfile(data);
      } catch (error) {
        console.error('Erro ao logar:', error);
        Toast.show({
          type: 'error',
          text1: 'Error in login',
          text2: 'Contact your administrator',
        });
      } finally {

      }
    }
    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}><Text>✏️</Text></TouchableOpacity>
        <Image
          source={{ uri: 'https://i.imgur.com/B0oV4Ju.png' }} // Substitua com sua imagem
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.iconButton}><Text>☰</Text></TouchableOpacity>
      </View>

      <Text style={styles.name}>{profile?.name}</Text>

      <Text style={styles.progressText}>Profile 80% complete</Text>
      <View style={styles.progressBar}>
        <View style={styles.progressFill} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Salary Range:</Text>
        <Text style={styles.text}>$800</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Experience Time:</Text>
        <Text style={styles.text}>{profile?.experience_time}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Professional Area:</Text>
        <Text style={styles.text}>
          {profile?.profession}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Photos</Text>
        <ScrollView horizontal>
          {['https://i.imgur.com/Z1gD8V2.jpg', 'https://i.imgur.com/G0qlf6B.jpg'].map((uri, i) => (
            <Image key={i} source={{ uri }} style={styles.photo} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Documents</Text>
        <View style={styles.tagsRow}>
          {['authorization_certificate.pdf', 'identity_card.pdf'].map((doc, i) => (
            <View key={i} style={styles.docTag}>
              <Text style={styles.docText}>{doc}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>More Information:</Text>
        <Text style={styles.text}>Speak English and Spanish.</Text>
      </View>

      <TouchableOpacity>
        <Text style={styles.link}>Syndicate verification</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.label}>Days of the week</Text>
        <View style={styles.daysRow}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <View key={i} style={[styles.dayBox, i > 1 && i < 6 ? styles.dayBoxFilled : null]}>
              <Text
                style={[
                  styles.dayText,
                  day === 'S' || day === 'M' ? { color: '#0a2e4de' } : null,
                ]}
              >
                {day}
              </Text>
            </View>
          ))}

        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Availability</Text>
        <View style={styles.availabilityRow}>
          {Object.entries(availability).map(([slot, isSelected], index) => (
            <TouchableOpacity key={index} style={styles.availBox} onPress={() => toggleSlot(slot)}>
              <View style={[styles.checkbox, isSelected && styles.checkboxChecked]} />
              <Text>{slot}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6f5fb',
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('10%'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    padding: wp('2%'),
  },
  avatar: {
    width: wp('30%'),
    height: wp('30%'),
    borderRadius: wp('15%'),
  },
  name: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: hp('1%'),
  },
  progressText: {
    textAlign: 'center',
    color: '#333',
  },
  progressBar: {
    height: hp('1.5%'),
    width: '100%',
    backgroundColor: '#d3eef7',
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: hp('1%'),
  },
  progressFill: {
    width: '80%',
    backgroundColor: '#00aaff',
    height: '100%',
  },
  section: {
    marginVertical: hp('1.5%'),
  },
  label: {
    fontWeight: 'bold',
    fontSize: wp('4.5%'),
    marginBottom: 5,
  },
  text: {
    fontSize: wp('4%'),
  },
  photo: {
    width: wp('25%'),
    height: wp('25%'),
    marginRight: wp('2%'),
    borderRadius: 8,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  docTag: {
    backgroundColor: '#0c3c68',
    padding: 8,
    borderRadius: 10,
    marginRight: 8,
  },
  docText: {
    color: '#fff',
    fontSize: wp('3.5%'),
  },
  link: {
    textAlign: 'center',
    color: '#0a2e4d',
    fontSize: wp('4%'),
    textDecorationLine: 'underline',
    marginVertical: hp('1%'),
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayBox: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0a2e4d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayBoxFilled: {
    backgroundColor: '#0a2e4d',
  },
  dayText: {
    color: '#fff',
  },
  availabilityRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  availBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 8,
    borderRadius: 4,
  },
  checkboxChecked: {
    backgroundColor: '#000',
  },
});
