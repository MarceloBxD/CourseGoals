import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import GoalInput from "./src/components/GoalInput";
import { GoalProvider } from "./src/contexts/GoalContext";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [currentGoalText, setCurrentGoalText] = useState("");

  return (
    <GoalProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <Text style={styles.title}>Course Native Goals</Text>
        <GoalInput
          setGoals={setGoals}
          setCurrentGoalText={setCurrentGoalText}
          currentGoalText={currentGoalText}
        />
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
    backgroundColor: "#111",
    alignItems: "center",
    paddingTop: 50,
  },

  goalsContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    marginTop: 60,
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
    minWidth: "100%",
  },
});
