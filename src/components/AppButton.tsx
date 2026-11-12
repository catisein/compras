import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores, espaco } from '../theme/theme';

type AppButtonProps = {
  titulo?: string;
  onPress: () => void;
  icone?: keyof typeof Ionicons.glyphMap;
};

export default function AppButton({ titulo, onPress, icone }: AppButtonProps) {
  return (
    <TouchableOpacity style={styles.botao} activeOpacity={0.7} onPress={onPress}>
      {icone ? <Ionicons name={icone} size={18} color={cores.fundo} /> : null}
      {titulo ? <Text style={styles.texto}>{titulo}</Text> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: espaco.pequeno,
    padding: espaco.medio,
    borderRadius: 8,
    backgroundColor: cores.primaria,
  },
  texto: {
    color: cores.fundo,
    fontWeight: 'bold',
    fontSize: 16,
  },
});