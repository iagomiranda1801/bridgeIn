import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, ProgressBar } from 'react-native-paper';
import Divider from '../components/Divider';

type ProfileHeaderProps = {
  name: string;
  avatarUri: string;
  progressPercentage: number;
  salaryRange?: string;
  experienceTime?: string;
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  name, 
  avatarUri, 
  progressPercentage,
  salaryRange = "$800",
  experienceTime = "7 years"
}) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Avatar.Image 
            size={100} 
            source={{ uri: avatarUri }} 
            style={styles.avatar}
          />
        </View>
        
        <Text style={styles.name}>{name}</Text>
      </View>
      
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Profile {Math.round(progressPercentage * 100)}% complete
        </Text>
        <View style={styles.progressBarContainer}>
          <ProgressBar 
            progress={progressPercentage} 
            color="#1DA1F2" 
            style={styles.progressBar} 
          />
        </View>
      </View>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Salary Range: </Text>
          <Text style={styles.infoValue}>{salaryRange}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Experience Time: </Text>
          <Text style={styles.infoValue}>{experienceTime}</Text>
        </View>
        
        <Divider color="#A2E2FB" thickness={3} marginVertical={12} />  
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    marginBottom: 0,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  container: {
    paddingTop: 16,
    paddingBottom: 8,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  avatarContainer: {
    marginBottom: 8,
  },
  avatar: {
    backgroundColor: '#FFFFFF',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
  },
  progressContainer: {
    width: '100%',
    marginTop: 0,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#DEF1F9',
  },
  progressText: {
    fontSize: 14,
    marginBottom: 8,
    color: '#10365F',
    textAlign: 'center',
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  infoContainer: {
    width: '100%',
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  infoItem: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  infoValue: {
    fontSize: 16,
    color: '#333333',
  },
});

export default ProfileHeader;
