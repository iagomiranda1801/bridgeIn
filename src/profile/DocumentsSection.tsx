import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Document = {
  id: string;
  name: string;
  type: string;
};

type DocumentsSectionProps = {
  documents: Document[];
};

const DocumentsSection: React.FC<DocumentsSectionProps> = ({ documents }) => {
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'file-pdf-box';
      case 'doc':
      case 'docx':
        return 'file-word-box';
      case 'xls':
      case 'xlsx':
        return 'file-excel-box';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return 'file-image-box';
      default:
        return 'file-document-box';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Documents</Text>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {documents.map((doc) => (
          <TouchableOpacity 
            key={doc.id} 
            style={styles.documentBadge}
            activeOpacity={0.7}
          >
            <Icon 
              name={getFileIcon(doc.type)} 
              size={20} 
              color="#FFFFFF" 
              style={styles.documentIcon}
            />
            <Text style={styles.documentName} numberOfLines={1} ellipsizeMode="tail">
              {doc.name}
            </Text>
          </TouchableOpacity>
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
  documentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10365F',
    borderRadius: 6,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginRight: 12,
    minWidth: 160,
    maxWidth: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  documentIcon: {
    marginRight: 8,
  },
  documentName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
});

export default DocumentsSection;
