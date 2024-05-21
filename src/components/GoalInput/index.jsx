import React, { View, TextInput, StyleSheet, Button } from "react-native";

export default function GoalInput({ currentGoalText, setCurrentGoalText, setGoals }) {
  const handleAddGoal = () => {
    setGoals((prevGoals) => [
      ...prevGoals,
      {
        id: Math.random().toString(),
        value: currentGoalText,
      },
    ]);
    setCurrentGoalText("");
  };

  return (
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
  );
}

const styles = StyleSheet.create({
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
  userInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "70%",
    gap: 20,
    flex: 1,
  },
});
