import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import api from "./services/api";

export default function App() {
  const [projects, setProjetcs] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setProjetcs(response.data);
    });
  }, []);

  async function handleAddProject() {
    const response = await api.post("projects", {
      title: `Novo Projeto ${Date.now()}`,
      owner: `Flavia Martins `,
    });
    const project = response.data;
    setProjetcs([...projects, project]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={(project) => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.project}> {project.title} </Text>
          )}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={handleAddProject}
        >
          <Text style={styles.buttontext}> Adicionar projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
    //justifyContent: "center",
    //alignItems: "center",
  },
  project: {
    color: "#ffff",
    fontSize: 30,
    //fontWeight: "bold",
  },
  button: {
    backgroundColor: "#fff",
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttontext: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
