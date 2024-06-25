import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  Button,
  Image,
  useWindowDimensions,
  Pressable,
} from "react-native";
import GoalInput from "./src/components/GoalInput";
import { Colors } from "./constants/Colors";
import { GoalProvider } from "./src/contexts/GoalContext";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [currentGoalText, setCurrentGoalText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [modalType, setModalType] = useState("add");

  const { height } = useWindowDimensions();

  let imgSize = height < 500 ? 100 : 120;
  let imgRightPosition = height < 500 ? 20 : null;

  return (
    <GoalProvider>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Objetivos do Curso</Text>
        <Button
          title="Adicionar Objetivo"
          onPress={() => {
            setIsModalVisible(true);
            setModalType("add");
          }}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
        >
          <View style={styles.goalsInput}>
            <GoalInput
              modalType={modalType}
              setGoals={setGoals}
              itemToEdit={itemToEdit}
              setItemToEdit={setItemToEdit}
              setCurrentGoalText={setCurrentGoalText}
              currentGoalText={currentGoalText}
              setModalType={setModalType}
              setIsModalVisible={setIsModalVisible}
            />
          </View>
          <Button
            title="Cancelar"
            color={Colors.btnPrimary}
            onPress={() => {
              setIsModalVisible(false);
              setCurrentGoalText("");
              setItemToEdit(null);
              setModalType("add");
            }}
          />
        </Modal>
        <Image
          source={require("./assets/icon.png")}
          style={[
            styles.img,
            { width: imgSize, height: imgSize, right: imgRightPosition },
          ]}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={goals}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable
                android_ripple={{ color: Colors.btnPrimary }}
                style={({ pressed }) => [
                  styles.goalContainer,
                  pressed && { backgroundColor: "#ddd" },
                ]}
              >
                <Pressable
                  onPress={() => {
                    setModalType("edit");
                    setItemToEdit(item);
                    setCurrentGoalText(item.value);
                    setIsModalVisible(true);
                  }}
                  style={styles.goalItem}
                >
                  <View>
                    <Text style={styles.goalText}>{item.value}</Text>
                  </View>
                  <View>
                    <Pressable
                      onPress={() => {
                        setGoals((prevGoals) =>
                          prevGoals.filter((goal) => goal.id !== item.id)
                        );
                      }}
                    >
                      <Ionicons name="trash" color={"#F00"} size={24} />
                    </Pressable>
                  </View>
                </Pressable>
              </Pressable>
            )}
          />
        </View>
      </SafeAreaView>
    </GoalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.primary,
    justifyContent: "center",
  },
  goalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  img: {
    width: 100,
    height: 100,
    position: "absolute",
    bottom: 40,
  },
  goalsContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 50,
  },
});
