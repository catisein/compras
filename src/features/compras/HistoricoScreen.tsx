import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores, espaco } from '../../theme/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Historico'>;

export default function HistoricoScreen({ route, navigation }: Props) {
  const { itens } = route.params;

  // Filtra apenas os artigos que já foram marcados como comprados
  const itensComprados = itens.filter(item => item.comprado);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.btnVoltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color={cores.primaria} />
          <Text style={styles.txtVoltar}>Voltar à Lista</Text>
        </TouchableOpacity>
        <Text style={styles.tituloApp}>📜 Histórico de Compras</Text>
      </View>

      <FlatList
        data={itensComprados}
        keyExtractor={item => item.id}
        contentContainerStyle={{ gap: espaco.pequeno, paddingBottom: 24 }}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Ionicons name="time-outline" size={48} color={cores.secundario} />
            <Text style={styles.emptyText}>Ainda não tens compras registadas no histórico.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemCartao}
            onPress={() => navigation.navigate('DetalhesItem', { item })}
          >
            <Ionicons name="checkmark-circle" size={24} color={cores.sucesso} />
            
            <View style={{ flex: 1, marginHorizontal: 12 }}>
              <Text style={[styles.itemTitulo, styles.textoRiscado]} numberOfLines={1}>
                {item.quantidade}x {item.nome}
              </Text>
              <View style={styles.infoLinhaSecundaria}>
                <Text style={styles.itemCat}>{item.categoria}</Text>
                <Text style={styles.itemData}>• 📅 Adquirido a: {item.data}</Text>
              </View>
            </View>

            <Ionicons name="chevron-forward" size={18} color={cores.secundario} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
    paddingHorizontal: espaco.medio,
    paddingTop: 48,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: espaco.medio,
  },
  btnVoltar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: cores.cartao,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    elevation: 1,
  },
  txtVoltar: {
    fontSize: 14,
    color: cores.primaria,
    fontWeight: '600',
  },
  tituloApp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: cores.texto,
  },
  itemCartao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.cartao,
    padding: espaco.medio,
    borderRadius: 12,
    elevation: 2,
  },
  itemTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: cores.texto,
  },
  textoRiscado: {
    textDecorationLine: 'line-through',
    color: cores.secundario,
  },
  infoLinhaSecundaria: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  itemCat: {
    fontSize: 12,
    color: cores.primaria,
    fontWeight: '600',
  },
  itemData: {
    fontSize: 11,
    color: cores.secundario,
  },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
    gap: 8,
  },
  emptyText: {
    fontSize: 14,
    color: cores.secundario,
    textAlign: 'center',
  },
});