import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import api from '../config';
import { RFValue } from 'react-native-responsive-fontsize';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [salary_range, setSalaryRange] = useState('');
  const [experience_time, setExperienceTime] = useState('');
  const [availability, setAvailability] = useState({
    Morning: false,
    Afternoon: false,
    Night: false,
    Dawn: false,
  });
  const [description, setDescription] = useState('');
  const [profession, setProfession] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const weekDays = ['Sun', 'M', 'Tue', 'W', 'Thu', 'F', 'Sat'];
  const [loading, setLoading] = useState(false);
  const [avatarUri, setAvatarUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos de acesso à galeria para escolher uma imagem.');
      }
    })();
  }, []);

  const toggleSlot = (slot: string) => {
    setAvailability(prev => ({ ...prev, [slot]: !prev[slot] }));
  };

  const toggleDay = (day: string) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const pickImage = async () => {
    setAvatarUri(null)

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      console.log("result", result.assets[0].uri)
      setAvatarUri(result.assets[0].uri);
    }
  };

  async function fetchData() {
    try {
      const response = await api.post('/mobile/users/dados');
      const data = response.data.Data

      setProfile(data);
      setProfession(data.profession);
      setName(data.name);
      setSalaryRange(data.salary_range);
      setExperienceTime(data.experience_time);
      setDescription(data.description);
      setAvatarUri(null); // Limpa avatarUri para garantir que a imagem do banco será usada
      setSelectedDays(data.days_of_week ? JSON.parse(data.days_of_week) : []);
      setAvailability(typeof data.availability === 'string' ? JSON.parse(data.availability) : data.availability);
      console.log("entrei")
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveProfile = async () => {
    try {
      let base64Image = null;
      let fileType = null;
      if (avatarUri && avatarUri.startsWith('file://')) {
        const fileName = avatarUri.split('/').pop();
        fileType = fileName.split('.').pop();
        base64Image = await FileSystem.readAsStringAsync(avatarUri, { encoding: FileSystem.EncodingType.Base64 });
      }

      const payload = {
        ...(base64Image && { imagem_base64: `data:image/${fileType};base64,${base64Image}` }),
        name,
        salary_range,
        experience_time,
        description,
        profession,
        availability: JSON.stringify(availability),
        email: profile?.email,
        login: profile?.email,
        days_of_week: JSON.stringify(selectedDays),
        id: String(profile?.id),
        user_id: String(profile?.user_id),
      };

      console.log("payload", payload)

      const response = await api.post('/mobile/users/update', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("response", response.data);

      if (response.data.Status !== 1) {
        Toast.show({
          type: 'error',
          text1: 'Erro ao atualizar perfil!',
          text2: 'Verifique os dados e tente novamente.',
        });
        return;
      }

      Toast.show({
        type: 'success',
        text1: 'Perfil atualizado!',
        text2: 'Seus dados foram salvos com sucesso.',
      });

      setIsEditing(false);
      setAvatarUri(null); // Limpa avatarUri para garantir que a imagem do banco será usada
      fetchData(); // Recarrega os dados atualizados

    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro ao salvar',
        text2: 'Tente novamente mais tarde.',
      });
    }
  };

  const imageUrl = profile?.imagem
    ? `${profile.imagem}?t=${new Date().getTime()}`
    : undefined;

  return (
    <ScrollView contentContainerStyle={[styles.container, { paddingTop: insets.top }]}>
      {isEditing ? (
        <View style={styles.header}>
          <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
            <Text>🖼️</Text>
          </TouchableOpacity>
          {profile && (
            <Image
              source={{ uri: avatarUri || imageUrl }}
              style={styles.avatar}
            />
          )}
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)} style={styles.iconButton}>
            <Text>✏️</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)} style={styles.iconButton}>
            <Text>✏️</Text>
          </TouchableOpacity>
          {imageUrl && (
            <Image
              source={{ uri: imageUrl }}
              style={styles.avatar}
            />
          )}
        </View>
      )}

      {
        isEditing ? (
          <View style={styles.inputWrapper}>
            <TextInput placeholder="Name" placeholderTextColor="black" value={name} onChangeText={setName} style={styles.input} />
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.text}>{profile?.name}</Text>
          </View>
        )
      }

      {
        isEditing ? (
          <View style={styles.inputWrapper}>
            <TextInput
              value={salary_range}
              placeholder="Salary Range"
              placeholderTextColor="black"
              onChangeText={setSalaryRange}
              style={styles.input}
            />
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.label}>Salary Range:</Text>
            <Text style={styles.text}>{profile?.salary_range}</Text>
          </View>
        )
      }

      {
        isEditing ? (
          <View style={styles.inputWrapper}>
            <TextInput
              value={experience_time}
              placeholder='Experience Time'
              placeholderTextColor={"black"}
              onChangeText={setExperienceTime}
              style={styles.input}
            />
          </View>

        ) : (
          <View style={styles.section}>
            <Text style={styles.label}>Experience Time:</Text>
            <Text style={styles.text}>{profile?.experience_time}</Text>
          </View>
        )
      }

      {
        isEditing ? (
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder='Profession'
              placeholderTextColor={"black"}
              value={profession}
              onChangeText={setProfession}
              style={styles.text}
            />
          </View>

        ) : (
          <View style={styles.section}>
            <Text style={styles.label}>Professional Area:</Text>
            <Text style={styles.text}>{profile?.profession}</Text>
          </View>
        )
      }

      {
        isEditing ? (
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder='More Information:'
              placeholderTextColor={"black"}
              value={description}
              onChangeText={setDescription}
              style={styles.text}
            />
          </View>

        ) : (
          <View style={styles.section}>
            <Text style={styles.label}>More Information:</Text>
            <Text style={styles.text}>{profile?.description}</Text>
          </View>
        )
      }

      <View style={styles.daysRow}>
        {weekDays.map((day, i) => (
          <TouchableOpacity
            disabled={!isEditing}
            key={i}
            style={[
              styles.dayBox,
              selectedDays.includes(day) && styles.dayBoxFilled,
            ]}
            onPress={() => toggleDay(day)}
          >
            <Text
              style={[
                styles.dayText,
                selectedDays.includes(day) ? { color: '#fff' } : { color: '#0a2e4d' },
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Availability</Text>
        <View style={styles.availabilityRow}>
          {Object.entries(availability).map(([slot, isSelected], index) => (
            <TouchableOpacity disabled={!isEditing} key={index} style={styles.availBox} onPress={() => toggleSlot(slot)}>
              <View style={[styles.checkbox, isSelected && styles.checkboxChecked]} />
              <Text>{slot}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {
        isEditing && (
          <TouchableOpacity onPress={handleSaveProfile} style={styles.loginButton}>
            {loading ? (
              <ActivityIndicator size="large" style={{ flex: 1 }} color="white" animating={true}></ActivityIndicator>
            ) : (
              <Text style={styles.loginText}> Registrar</Text>
            )}

          </TouchableOpacity>
        )
      }
    </ScrollView >
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6f5fb',
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('10%'),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderRadius: 8,
    width: '100%',
    marginBottom: hp('2%'),
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: RFValue(16),
    color: 'black',
    borderColor: '#000',
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    padding: wp('2%'),
    backgroundColor: '#1DBFFF',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#1DBFFF',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
    color: '#fff',
    fontSize: RFValue(16),
    fontWeight: 'bold',
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
