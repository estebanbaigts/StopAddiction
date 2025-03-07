import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '@/lib/supabase';

const THEME = {
  primary: '#2E1760',
  accent: '#8A4FFF',
  text: '#FFFFFF',
};

type MoodScore = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type SleepQuality = 1 | 2 | 3 | 4 | 5;

export default function NewEntryScreen() {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [moodScore, setMoodScore] = useState<MoodScore>(5);
  const [journalEntry, setJournalEntry] = useState('');
  const [eveningReflection, setEveningReflection] = useState('');
  const [sleepQuality, setSleepQuality] = useState<SleepQuality>(3);
  const [sleepDuration, setSleepDuration] = useState('');
  const [activities, setActivities] = useState('');
  const [socialInteractions, setSocialInteractions] = useState('');
  const [memorableMoments, setMemorableMoments] = useState('');
  const [gamesPlayed, setGamesPlayed] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);

  const handleAddImage = async () => {
    if (Platform.OS === 'web') {
      // Handle web file upload
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAttachments([...attachments, result.assets[0].uri]);
    }
  };

  const handleSubmit = async () => {
    if (!journalEntry.trim()) {
      setError('Le journal est obligatoire');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data: entry, error: entryError } = await supabase
        .from('wellness_entries')
        .insert({
          mood_score: moodScore,
          journal_entry: journalEntry,
          evening_reflection: eveningReflection,
          sleep_quality: sleepQuality,
          sleep_duration: parseInt(sleepDuration, 10),
          activities: activities.split(',').map(a => a.trim()),
          social_interactions: socialInteractions,
          memorable_moments: memorableMoments,
          games_played: gamesPlayed.split(',').map(game => ({
            name: game.trim(),
            duration: 0,
            enjoyment: 0
          })),
        })
        .select()
        .single();

      if (entryError) throw entryError;

      // Handle attachments upload here
      // ...

      router.replace('/wellness');
    } catch (err) {
      setError('Une erreur est survenue');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={[THEME.primary, '#1A0D3C']}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft color={THEME.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Nouvelle entrée</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {error && (
          <Text style={styles.error}>{error}</Text>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Humeur du jour (1-10)</Text>
          <View style={styles.moodContainer}>
            {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as MoodScore[]).map((score) => (
              <TouchableOpacity
                key={score}
                style={[
                  styles.moodButton,
                  moodScore === score && styles.moodButtonSelected,
                ]}
                onPress={() => setMoodScore(score)}
              >
                <Text
                  style={[
                    styles.moodButtonText,
                    moodScore === score && styles.moodButtonTextSelected,
                  ]}
                >
                  {score}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Journal du jour</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            value={journalEntry}
            onChangeText={setJournalEntry}
            placeholder="Comment s'est passée votre journée ?"
            placeholderTextColor="rgba(255,255,255,0.6)"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Réflexion du soir</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            value={eveningReflection}
            onChangeText={setEveningReflection}
            placeholder="Vos pensées sur la journée..."
            placeholderTextColor="rgba(255,255,255,0.6)"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Qualité du sommeil (1-5)</Text>
          <View style={styles.sleepContainer}>
            {([1, 2, 3, 4, 5] as SleepQuality[]).map((quality) => (
              <TouchableOpacity
                key={quality}
                style={[
                  styles.sleepButton,
                  sleepQuality === quality && styles.sleepButtonSelected,
                ]}
                onPress={() => setSleepQuality(quality)}
              >
                <Text
                  style={[
                    styles.sleepButtonText,
                    sleepQuality === quality && styles.sleepButtonTextSelected,
                  ]}
                >
                  {quality}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.input}
            value={sleepDuration}
            onChangeText={setSleepDuration}
            placeholder="Durée du sommeil (en minutes)"
            placeholderTextColor="rgba(255,255,255,0.6)"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activités</Text>
          <TextInput
            style={styles.input}
            value={activities}
            onChangeText={setActivities}
            placeholder="Activités (séparées par des virgules)"
            placeholderTextColor="rgba(255,255,255,0.6)"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interactions sociales</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            value={socialInteractions}
            onChangeText={setSocialInteractions}
            placeholder="Décrivez vos interactions sociales..."
            placeholderTextColor="rgba(255,255,255,0.6)"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Moments mémorables</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            value={memorableMoments}
            onChangeText={setMemorableMoments}
            placeholder="Les moments qui ont marqué votre journée..."
            placeholderTextColor="rgba(255,255,255,0.6)"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Jeux joués</Text>
          <TextInput
            style={styles.input}
            value={gamesPlayed}
            onChangeText={setGamesPlayed}
            placeholder="Jeux (séparés par des virgules)"
            placeholderTextColor="rgba(255,255,255,0.6)"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photos</Text>
          <TouchableOpacity
            style={styles.addImageButton}
            onPress={handleAddImage}
          >
            <ImageIcon color={THEME.text} size={24} />
            <Text style={styles.addImageText}>Ajouter une photo</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: THEME.text,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  error: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FF4B4B',
    textAlign: 'center',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: THEME.text,
    marginBottom: 12,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    color: THEME.text,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  textArea: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    color: THEME.text,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  moodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  moodButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodButtonSelected: {
    backgroundColor: THEME.accent,
  },
  moodButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: THEME.text,
    opacity: 0.8,
  },
  moodButtonTextSelected: {
    opacity: 1,
  },
  sleepContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  sleepButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sleepButtonSelected: {
    backgroundColor: THEME.accent,
  },
  sleepButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: THEME.text,
    opacity: 0.8,
  },
  sleepButtonTextSelected: {
    opacity: 1,
  },
  addImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  addImageText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: THEME.text,
  },
  submitButton: {
    backgroundColor: THEME.accent,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: THEME.text,
  },
});