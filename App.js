import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [currentGoalText, setCurrentGoalText] = useState("");

  const handleAddGoal = () => {
    setGoals((prevGoals) => [...prevGoals, currentGoalText]);
    setCurrentGoalText("");
  };

  const handleDeleteGoal = () => {
    setGoals((prevGoals) => {
      return prevGoals.filter((goal) => goal !== currentGoalText);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <TextInput
          style={styles.input}
          value={currentGoalText}
          onChangeText={(text) => setCurrentGoalText(text)}
          placeholder="Enter your new goal"
        />
        <Button onPress={() => handleAddGoal()} title="Create" />
      </View>
      <View style={styles.goals}>
        {goals.map((goal) => (
          <Text onPress={() => handleDeleteGoal()} key={goal}>
            {goal}
          </Text>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    alignItems: "center",
  },
  userInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    flex: 1,
  },
  goals: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
  input: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "80%",
    color: "white",
    marginBottom: 20,
  },
});
