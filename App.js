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
} from "react-native";
import GoalInput from "./src/components/GoalInput";
import { GoalProvider } from "./src/contexts/GoalContext";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [currentGoalText, setCurrentGoalText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <GoalProvider>
      <StatusBar style="light" />

      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Course Native Goals</Text>
        <Button
          title="Add new goal"
          onPress={() => {
            setIsModalVisible(true);
          }}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
        >
          <View style={styles.goalsInput}>
            <GoalInput
              setGoals={setGoals}
              setCurrentGoalText={setCurrentGoalText}
              currentGoalText={currentGoalText}
              setIsModalVisible={setIsModalVisible}
            />
          </View>
          <Button
            title="Close"
            onPress={() => {
              setIsModalVisible(false);
              setCurrentGoalText("");
            }}
            style={styles.showModalButton}
          />
        </Modal>
        <View style={styles.goalsContainer}>
          <FlatList
            data={goals}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            renderItem={({ item }) => {
              return (
                <Text
                  style={styles.goalText}
                  onPress={() =>
                    setGoals((prevGoals) =>
                      prevGoals.filter((goal) => goal.id !== item.id)
                    )
                  }
                >
                  {item.value}
                </Text>
              );
            }}
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
    paddingTop: 50,
    backgroundColor: "#29335C",
  },
  goalsContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 20,
  },
  goalText: {
    color: "#fff",
    fontSize: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#fff",
    marginBottom: 10,
    width: 350,
  },
  goalsInput: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
