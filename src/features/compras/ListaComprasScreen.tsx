import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores, espaco } from '../../theme/theme';
import AppButton from '../../components/AppButton';
import type { ItemCompra, CategoriaItem, FiltroCompra } from './types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ListaCompras'>;

export default function ListaComprasScreen({ navigation }: Props) {
  const [itens, setItens] = useState<ItemCompra[]>([
    {
      id: '1',
      nome: 'Leite meio-gordo',
      quantidade: 2,
      categoria: 'Lacticínios',
      comprado: false,
      notas: 'Marca preferida',
      data: '05/11/2026',
    },
    {
      id: '2',
      nome: 'Maçãs Gala',
      quantidade: 6,
      categoria: 'Frutas e Legumes',
      comprado: true,
      data: '04/11/2026',
    },
  ]);

  const [novoNome, setNovoNome] = useState('');
  const [novaQtd, setNovaQtd] = useState('1');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<CategoriaItem>('Geral');
  const [filtro, setFiltro] = useState<FiltroCompra>('Todos');

  const categoriasDisponiveis: CategoriaItem[] = [
    'Geral',
    'Frutas e Legumes',
    'Lacticínios',
    'Talho e Peixaria',
    'Padaria',
    'Bebidas',
    'Limpeza',
    'Higiene',
  ];

  function adicionarItem() {
    if (!novoNome || !novoNome.trim()) {
      Alert.alert('Atenção', 'Por favor, escreve o nome do artigo.');
      return;
    }

    const qtdNum = Number(novaQtd);
    if (isNaN(qtdNum) || qtdNum <= 0) {
      Alert.alert('Atenção', 'Insere uma quantidade válida.');
      return;
    }

    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString('pt-PT');

    const novo: ItemCompra = {
      id: Date.now().toString(),
      nome: novoNome.trim(),
      quantidade: qtdNum,
      categoria: categoriaSelecionada,
      comprado: false,
      data: dataFormatada,
    };

    // Atualização segura do estado da lista
    setItens(prevItens => [novo, ...prevItens]);
    
    // Limpar os campos do formulário
    setNovoNome('');
    setNovaQtd('1');
    setCategoriaSelecionada('Geral');
  }

  function alternarComprado(id: string) {
    setItens(prev =>
      prev.map(item => (item.id === id ? { ...item, comprado: !item.comprado } : item))
    );
  }

  function eliminarItem(id: string) {
    setItens(prev => prev.filter(item => item.id !== id));
  }

  const itensVisiveis = itens.filter(item => {
    if (filtro === 'Pendentes') return !item.comprado;
    if (filtro === 'Comprados') return item.comprado;
    if (filtro !== 'Todos') return item.categoria === filtro;
    return true;
  });

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.btnVoltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color={cores.primaria} />
          <Text style={styles.txtVoltar}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.headerTituloBtn} 
          onPress={() => navigation.navigate('Historico', { itens })}
        >
          <Ionicons name="time-outline" size={18} color={cores.primaria} />
          <Text style={styles.tituloApp}>Ver Histórico</Text>
        </TouchableOpacity>
      </View>

      {/* Formulário de Adição */}
      <View style={styles.formCard}>
        <Text style={styles.formTitulo}>Adicionar Novo Artigo</Text>
        
        <View style={styles.rowInputs}>
          <TextInput
            style={[styles.input, { flex: 3 }]}
            placeholder="Nome do produto..."
            placeholderTextColor="#888"
            value={novoNome}
            onChangeText={setNovoNome}
          />
          <TextInput
            style={[styles.input, { flex: 1, textAlign: 'center' }]}
            placeholder="Qtd"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={novaQtd}
            onChangeText={setNovaQtd}
          />
        </View>

        {/* Categorias Horizontal Scroll */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catScroll}>
          {categoriasDisponiveis.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.chipCat,
                categoriaSelecionada === cat && styles.chipCatAtivo,
              ]}
              onPress={() => setCategoriaSelecionada(cat)}
            >
              <Text
                style={[
                  styles.txtChipCat,
                  categoriaSelecionada === cat && styles.txtChipCatAtivo,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <AppButton titulo="Adicionar Artigo" icone="add" onPress={adicionarItem} />
      </View>

      {/* Filtros */}
      <View style={styles.filtrosContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {(['Todos', 'Pendentes', 'Comprados', ...categoriasDisponiveis] as const).map(f => (
            <TouchableOpacity
              key={f}
              style={[styles.btnFiltro, filtro === f && styles.btnFiltroAtivo]}
              onPress={() => setFiltro(f)}
            >
              <Text style={[styles.txtFiltro, filtro === f && styles.txtFiltroAtivo]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Lista de Itens */}
      <FlatList
        data={itensVisiveis}
        keyExtractor={item => item.id}
        contentContainerStyle={{ gap: espaco.pequeno, paddingBottom: 24 }}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Ionicons name="basket-outline" size={48} color={cores.secundario} />
            <Text style={styles.emptyText}>A tua lista está vazia nesta vista.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.itemCartao}>
            <TouchableOpacity onPress={() => alternarComprado(item.id)}>
              <Ionicons
                name={item.comprado ? 'checkmark-circle' : 'ellipse-outline'}
                size={24}
                color={item.comprado ? cores.sucesso : cores.primaria}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flex: 1, marginHorizontal: 12 }}
              onPress={() => navigation.navigate('DetalhesItem', { item })}
            >
              <Text
                style={[
                  styles.itemTitulo,
                  item.comprado && styles.textoRiscado,
                ]}
                numberOfLines={1}
              >
                {item.quantidade}x {item.nome}
              </Text>
              <View style={styles.infoLinhaSecundaria}>
                <Text style={styles.itemCat}>{item.categoria}</Text>
                <Text style={styles.itemData}>• 📅 {item.data}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => eliminarItem(item.id)}>
              <Ionicons name="trash-outline" size={20} color={cores.perigo} />
            </TouchableOpacity>
          </View>
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
  headerTituloBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: cores.cartao,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    elevation: 1,
  },
  tituloApp: {
    fontSize: 14,
    fontWeight: 'bold',
    color: cores.texto,
  },
  formCard: {
    backgroundColor: cores.cartao,
    borderRadius: 12,
    padding: espaco.medio,
    gap: espaco.pequeno,
    elevation: 2,
    marginBottom: espaco.medio,
  },
  formTitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: cores.primaria,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: cores.texto,
    backgroundColor: '#FAFAFA',
  },
  catScroll: {
    gap: 6,
    paddingVertical: 4,
  },
  chipCat: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#EAEAEA',
  },
  chipCatAtivo: {
    backgroundColor: cores.primaria,
  },
  txtChipCat: {
    fontSize: 12,
    color: cores.secundario,
    fontWeight: '600',
  },
  txtChipCatAtivo: {
    color: cores.fundo,
  },
  filtrosContainer: {
    marginBottom: espaco.medio,
  },
  btnFiltro: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: cores.cartao,
    elevation: 1,
  },
  btnFiltroAtivo: {
    backgroundColor: cores.primaria,
  },
  txtFiltro: {
    fontSize: 12,
    color: cores.secundario,
    fontWeight: '600',
  },
  txtFiltroAtivo: {
    color: cores.fundo,
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
    padding: 32,
    gap: 8,
  },
  emptyText: {
    fontSize: 14,
    color: cores.secundario,
    textAlign: 'center',
  },
});