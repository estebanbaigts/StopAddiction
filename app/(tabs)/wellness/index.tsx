import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Plus, Sun, Moon, Star, Gamepad as GamepadIcon } from 'lucide-react-native';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const THEME = {
  primary: '#2E1760',
  accent: '#8A4FFF',
  text: '#FFFFFF',
};

export default function WellnessScreen() {
  const insets = useSafeAreaInsets();
  const [hasEntryToday, setHasEntryToday] = useState(false);

  const today = format(new Date(), 'EEEE d MMMM yyyy', { locale: fr });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={[THEME.primary, '#1A0D3C']}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?w=800&q=80' }}
            style={styles.headerImage}
          />
          <Text style={styles.date}>{today}</Text>
          <Text style={styles.title}>Journal de bien-être</Text>
        </View>

        {!hasEntryToday ? (
          <Link href="/wellness/new" asChild>
            <TouchableOpacity style={styles.createButton}>
              <Plus color={THEME.text} size={24} />
              <Text style={styles.createButtonText}>Créer l'entrée du jour</Text>
            </TouchableOpacity>
          </Link>
        ) : (
          <View style={styles.sections}>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Sun color={THEME.accent} size={24} />
                <Text style={styles.sectionTitle}>Résumé du jour</Text>
              </View>
              <Text style={styles.sectionContent}>
                Votre humeur est à 8/10 aujourd'hui...
              </Text>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Moon color={THEME.accent} size={24} />
                <Text style={styles.sectionTitle}>Réflexion du soir</Text>
              </View>
              <Text style={styles.sectionContent}>
                Moments mémorables et réflexions...
              </Text>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Star color={THEME.accent} size={24} />
                <Text style={styles.sectionTitle}>Rapport de nuit</Text>
              </View>
              <Text style={styles.sectionContent}>
                Qualité du sommeil et rêves...
              </Text>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <GamepadIcon color={THEME.accent} size={24} />
                <Text style={styles.sectionTitle}>Divertissement</Text>
              </View>
              <Text style={styles.sectionContent}>
                Jeux et activités du jour...
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.primary,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  headerImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: THEME.accent,
  },
  date: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: THEME.text,
    opacity: 0.8,
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: THEME.text,
    marginBottom: 24,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.accent,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    gap: 12,
  },
  createButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: THEME.text,
  },
  sections: {
    padding: 20,
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: THEME.text,
  },
  sectionContent: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: THEME.text,
    opacity: 0.8,
  },
});