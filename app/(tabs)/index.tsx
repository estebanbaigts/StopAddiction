import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated from 'react-native-reanimated';
import { Clock, Trophy, Brain, Heart } from 'lucide-react-native';

const THEME = {
  primary: '#2E1760',
  accent: '#8A4FFF',
  text: '#FFFFFF',
};

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[THEME.primary, '#1A0D3C']}
        style={styles.background}
      />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome back, Alex</Text>
          <Text style={styles.streak}>🔥 15 Day Streak</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Clock color={THEME.accent} size={24} />
            <Text style={styles.statValue}>15</Text>
            <Text style={styles.statLabel}>Days Clean</Text>
          </View>
          <View style={styles.statCard}>
            <Trophy color={THEME.accent} size={24} />
            <Text style={styles.statValue}>Level 8</Text>
            <Text style={styles.statLabel}>Progress</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Goals</Text>
          <View style={styles.goalCard}>
            <Brain color={THEME.accent} size={24} />
            <View style={styles.goalInfo}>
              <Text style={styles.goalTitle}>Meditation Session</Text>
              <Text style={styles.goalSubtitle}>10 minutes of mindfulness</Text>
            </View>
          </View>
          <View style={styles.goalCard}>
            <Heart color={THEME.accent} size={24} />
            <View style={styles.goalInfo}>
              <Text style={styles.goalTitle}>Breathing Exercise</Text>
              <Text style={styles.goalSubtitle}>Complete 3 cycles</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.primary,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  greeting: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: THEME.text,
    marginBottom: 8,
  },
  streak: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: THEME.text,
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: THEME.text,
    marginTop: 8,
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: THEME.text,
    opacity: 0.8,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: THEME.text,
    marginBottom: 16,
  },
  goalCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  goalInfo: {
    marginLeft: 16,
  },
  goalTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: THEME.text,
  },
  goalSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: THEME.text,
    opacity: 0.8,
  },
});