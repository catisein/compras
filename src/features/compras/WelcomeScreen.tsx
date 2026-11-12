import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import AppButton from '../../components/AppButton';
import { cores, espaco } from '../../theme/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop' }}
        style={styles.imagemCapa}
        resizeMode="cover"
      />

      <View style={styles.headerBox}>
        <Text style={styles.titulo}>🛒 Smart Compras</Text>
        <Text style={styles.subtitulo}>Simplifica as tuas compras, gere o histórico e poupa tempo!</Text>
      </View>

      <View style={styles.cartaoInfo}>
        <Text style={styles.infoTitulo}>O que podes fazer:</Text>
        <Text style={styles.infoTexto}>• Adicionar artigos com categorias e quantidades.</Text>
        <Text style={styles.infoTexto}>• Acompanhar o histórico de compras com datas.</Text>
        <Text style={styles.infoTexto}>• Filtrar rapidamente entre pendentes e concluídos.</Text>
      </View>

      <View style={{ width: '100%', marginTop: espaco.medio }}>
        <AppButton
          titulo="Começar a Comprar"
          icone="arrow-forward"
          onPress={() => navigation.navigate('ListaCompras')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: cores.fundo,
    padding: espaco.grande,
    alignItems: 'center',
    gap: espaco.medio,
  },
  imagemCapa: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginTop: 16,
  },
  headerBox: {
    alignItems: 'center',
    gap: espaco.pequeno,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: cores.texto,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 15,
    color: cores.secundario,
    textAlign: 'center',
  },
  cartaoInfo: {
    width: '100%',
    backgroundColor: cores.cartao,
    padding: espaco.medio,
    borderRadius: 12,
    gap: espaco.pequeno,
    elevation: 2,
  },
  infoTitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: cores.primaria,
    marginBottom: 2,
  },
  infoTexto: {
    fontSize: 13,
    color: cores.texto,
  },
});