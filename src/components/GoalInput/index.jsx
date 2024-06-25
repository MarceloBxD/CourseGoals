import React, { useRef } from "react";
import { View, TextInput, StyleSheet, Button, useWindowDimensions } from "react-native";
import { Colors } from "../../../constants/Colors";

export default function GoalInput({
  currentGoalText,
  setCurrentGoalText,
  setGoals,
  setIsModalVisible,
  modalType,
  itemToEdit,
  setItemToEdit,
  setModalType,
}) {
  const { height } = useWindowDimensions();
  const inputRef = useRef(null);
  const marginTopDistance = height < 380 ? 30 : 50;

  const handleAddGoal = () => {
    if (currentGoalText === "") return alert("Preencha o campo de meta!");

    setGoals((prevGoals) => [
      ...prevGoals,
      {
        id: Math.random().toString(),
        value: currentGoalText,
      },
    ]);
    setCurrentGoalText("");
    setIsModalVisible(false);
    setModalType("add");
  };

  const handleEditGoal = () => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) => {
        if (goal.id === itemToEdit.id) {
          return { ...goal, value: currentGoalText };
        }
        return goal;
      })
    );
    setCurrentGoalText("");
    setItemToEdit(null);
    setIsModalVisible(false);
    setModalType("add");
  };

  return (
    <View style={[styles.userInputs, { marginTop: marginTopDistance }]}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={currentGoalText}
        onChangeText={setCurrentGoalText}
        placeholder="Nova meta"
        placeholderTextColor={Colors.btnPrimary}
        autoFocus={true}
      />
      <Button
        color={Colors.btnPrimary}
        onPress={() => (modalType === "add" ? handleAddGoal() : handleEditGoal())}
        title={modalType === "add" ? "Adicionar" : "Editar"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomColor: Colors.btnPrimary,
    borderBottomWidth: 1,
    width: "80%",
    color: Colors.btnPrimary,
    marginTop: 20,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  userInputs: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    gap: 20,
    flex: 1,
  },
});
