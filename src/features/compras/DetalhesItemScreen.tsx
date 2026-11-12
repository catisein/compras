import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores, espaco } from '../../theme/theme';
import AppButton from '../../components/AppButton';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'DetalhesItem'>;

export default function DetalhesItemScreen({ route, navigation }: Props) {
  const { item } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cardDetalhe}>
        <View style={styles.headerDetalhe}>
          <Ionicons
            name={item.comprado ? 'checkmark-circle' : 'basket'}
            size={36}
            color={item.comprado ? cores.sucesso : cores.primaria}
          />
          <View style={styles.badgeCat}>
            <Text style={styles.txtBadgeCat}>{item.categoria}</Text>
          </View>
        </View>

        <Text style={styles.nomeArtigo}>{item.nome}</Text>

        <View style={styles.infoBloco}>
          <Text style={styles.rotulo}>Quantidade Pedida:</Text>
          <Text style={styles.valor}>{item.quantidade} unidade(s)</Text>
        </View>

        <View style={styles.infoBloco}>
          <Text style={styles.rotulo}>Estado Atual:</Text>
          <Text
            style={[
              styles.valor,
              { color: item.comprado ? cores.sucesso : cores.perigo, fontWeight: 'bold' },
            ]}
          >
            {item.comprado ? 'Comprado / Adquirido' : 'Pendente (Falta comprar)'}
          </Text>
        </View>

        {item.notas ? (
          <View style={styles.infoBloco}>
            <Text style={styles.rotulo}>Notas Adicionais:</Text>
            <Text style={styles.valor}>{item.notas}</Text>
          </View>
        ) : null}
      </View>

      <View style={{ marginTop: espaco.medio }}>
        <AppButton titulo="Voltar à Lista" icone="arrow-back" onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: cores.fundo,
    padding: espaco.grande,
    justifyContent: 'center',
    gap: espaco.medio,
  },
  cardDetalhe: {
    backgroundColor: cores.cartao,
    borderRadius: 16,
    padding: espaco.grande,
    gap: espaco.medio,
    elevation: 3,
  },
  headerDetalhe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badgeCat: {
    backgroundColor: '#EAEAEA',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  txtBadgeCat: {
    fontSize: 12,
    fontWeight: 'bold',
    color: cores.primaria,
  },
  nomeArtigo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: cores.texto,
  },
  infoBloco: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 10,
  },
  rotulo: {
    fontSize: 12,
    color: cores.secundario,
    fontWeight: '600',
    marginBottom: 2,
  },
  valor: {
    fontSize: 16,
    color: cores.texto,
  },
});