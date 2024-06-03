import React, {
  View,
  TextInput,
  StyleSheet,
  Button,
  useWindowDimensions,
  KeyboardAvoidingView,
} from "react-native";

import { useEffect, useRef } from "react";

import { Colors } from "../../../constants/Colors";

export default function GoalInput({
  currentGoalText,
  setCurrentGoalText,
  setGoals,
  setIsModalVisible,
}) {
  const { width, height } = useWindowDimensions();

  const inputRef = useRef(null);

  const marginTopDistance = height < 380 ? 30 : 50;

  const handleAddGoal = () => {
    if (currentGoalText === "") return alert("Please enter a goal");

    setGoals((prevGoals) => [
      ...prevGoals,
      {
        id: Math.random().toString(),
        value: currentGoalText,
      },
    ]);
    setCurrentGoalText("");
    setIsModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      style={[
        styles.userInputs,
        {
          marginTop: marginTopDistance,
        },
      ]}
    >
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={currentGoalText}
        onChangeText={(text) => setCurrentGoalText(text)}
        placeholder="Enter your new goal"
        placeholderTextColor="#fff"
        autoFocus={true}
      />
      <Button
        color={Colors.btnPrimary}
        onPress={() => handleAddGoal()}
        disabled={currentGoalText === ""}
        title="Add new goal"
      />
    </KeyboardAvoidingView>
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
    flexDirection: "column",
    alignItems: "center",
    width: "70%",
    gap: 20,
    flex: 1,
  },
});
