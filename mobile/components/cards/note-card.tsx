import React from 'react';
import { NoteType } from '@/types/types';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type NoteCardProps = {
  note: NoteType;
  onShare: () => void;
};

export function NoteCard({ note, onShare }: NoteCardProps) {
  return (
    <View style={styles.noteCard}>
      <Text style={styles.noteTitle}>{note.title}</Text>
      <Text style={styles.noteSummary}>{note.summary}</Text>
      <View style={styles.noteFooter}>
        <Text style={styles.noteDate}>{note.date}</Text>
        <TouchableOpacity style={styles.shareButton} onPress={onShare}>
          <MaterialIcons name="share" size={20} color="#4A90E2" />
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  noteCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  noteSummary: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  noteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteDate: {
    fontSize: 12,
    color: '#999',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#4A90E2',
    marginLeft: 4,
  },
});
