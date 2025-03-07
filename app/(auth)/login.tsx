import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import { Mail, Lock } from 'lucide-react-native';

const THEME = {
  primary: '#2E1760',
  accent: '#8A4FFF',
  text: '#FFFFFF',
};

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    // TODO: Implement actual login logic
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[THEME.primary, '#1A0D3C']}
        style={StyleSheet.absoluteFill}
      />
      
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' }}
          style={styles.headerImage}
        />
        <Text style={styles.title}>Nova Recovery</Text>
        <Text style={styles.subtitle}>Votre parcours vers le rétablissement commence ici</Text>
      </View>

      <View style={styles.form}>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        
        <View style={styles.inputContainer}>
          <Mail color={THEME.accent} size={20} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="rgba(255,255,255,0.6)"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Lock color={THEME.accent} size={20} />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            placeholderTextColor="rgba(255,255,255,0.6)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Pas encore de compte ?</Text>
          <Link href="/register" asChild>
            <TouchableOpacity>
              <Text style={styles.registerLink}>S'inscrire</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.primary,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  headerImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: THEME.accent,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: THEME.text,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: THEME.text,
    opacity: 0.8,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  form: {
    padding: 20,
  },
  error: {
    color: '#FF4B4B',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  input: {
    flex: 1,
    color: THEME.text,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginLeft: 12,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: THEME.accent,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  button: {
    backgroundColor: THEME.accent,
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: THEME.text,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  registerText: {
    color: THEME.text,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    opacity: 0.8,
  },
  registerLink: {
    color: THEME.accent,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
});