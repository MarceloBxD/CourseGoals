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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Course Native Goals</Text>
      <View style={styles.userInputs}>
        <TextInput
          style={styles.input}
          value={currentGoalText}
          onChangeText={(text) => setCurrentGoalText(text)}
          placeholder="Enter your new goal"
          placeholderTextColor="#fff"
        />
        <Button onPress={() => handleAddGoal()} title="Create" />
      </View>
      <View style={styles.goalsContainer}>
        {goals.map((goal) => (
          <Text
            style={styles.goalText}
            key={goal}
            onPress={() =>
              setGoals((prevGoals) => prevGoals.filter((g) => g !== goal))
            }
          >
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
    backgroundColor: "#111",
    alignItems: "center",
    paddingTop: 50,
  },
  userInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "70%",
    gap: 20,
    flex: 1,
  },
  goalsContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    marginTop: 60,
  },
  input: {
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    width: "80%",
    color: "#fff",
    marginBottom: 20,
    marginTop: 20,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  title: {
    color: "#fff",
    fontSize: 20,
  },
  goalText: {
    color: "#fff",
    fontSize: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
  },
});
