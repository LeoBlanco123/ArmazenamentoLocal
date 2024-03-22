import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react';

export default function App() {
  const [nomeProduto, setNomeProduto] = useState('')
  const [precoProduto, setPrecoProduto] = useState('')
  const [listProdutos, setListProdutos] = useState([])

  useEffect(() => {
    buscarDados()
  }, [])

  async function salvar() {
    let produtos = [];
    if (await AsyncStorage.getItem("PRODUTOS") !== null) {
      produtos = JSON.parse(await AsyncStorage.getItem("PRODUTOS"));
    }

    produtos.push({ nome: nomeProduto, preco: precoProduto })

    await AsyncStorage.setItem("PRODUTOS", JSON.stringify(produtos))
    alert("PRODUTO SALVO")

  }

  async function buscarDados() {
    const p = await AsyncStorage.getItem("PRODUTOS")
    setListProdutos(JSON.parse(p))
  }

  return (
    <View style={styles.container}>
      <Text>CADASTRO</Text>

      <TextInput
        placeholder='DIGITE O NOME DO PRODUTO'
        style={styles.input}
        value={nomeProduto}
        onChangeText={(value) => setNomeProduto(value)}
      />

      <TextInput
        placeholder='DIGITE O PREÇO DO PRODUTO'
        style={styles.input}
        value={precoProduto}
        onChangeText={(value) => setPrecoProduto(value)}
      />

      <TouchableOpacity style={styles.btn} onPress={salvar}>
        <Text style={{ color: 'white' }}>CADASTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={buscarDados}>
        <Text style={{ color: 'white' }}>BUSCAR DADOS</Text>
      </TouchableOpacity>

      <FlatList
        //Informados para a FlatLIst
        data={listProdutos}

        /* Renderizando itens para exibir na FlatLIst*/
        renderItem={({ item }) => {

          return (
            <View style={{ width: 300, borderWidth: 1, borderRadius: 15, height: 50, alignItems: 'center', justifyContent: 'center', marginVertical: 3 }}>
              <View>
                <Text style={{ fontSize: 18 }}>NOME:{item.nome} PREÇO:{item.preco}</Text>
              </View>
              <TouchableOpacity style={{
                flexDirection: 'row',
                justifyContent: "space-around", backgroundColor: 'red', borderRadius: 12
              }}>
                <Text>EXCLUIR</Text>
              </TouchableOpacity>
            </View>
          )
        }}
      />

      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  input: {
    borderWidth: 1,
    height: 50,
    width: 300,
    borderRadius: 15
  },
  btn: {
    borderWidth: 1,
    height: 50,
    width: 300,
    borderRadius: 15,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: "center"
  }
});