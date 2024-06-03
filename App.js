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
} from "react-native";
import GoalInput from "./src/components/GoalInput";
import { Colors } from "./constants/Colors";
import { GoalProvider } from "./src/contexts/GoalContext";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [currentGoalText, setCurrentGoalText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { height } = useWindowDimensions();

  const marginTopDistance = height < 380 ? 30 : 10;

  let imgSize = height < 500 ? 100 : 200;
  let imgRightPosition = height < 500 ? 20 : null;

  return (
    <GoalProvider>
      <StatusBar style="light" />

      <SafeAreaView
        style={[
          styles.container,
          {
            marginTop: marginTopDistance,
          },
        ]}
      >
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
        <Image
          source={require("./assets/icon.png")}
          style={[
            styles.img,
            {
              width: imgSize,
              height: imgSize,
              right: imgRightPosition,
            },
          ]}
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

// Essa não é a melhor prática, pois só é executado uma vez
// const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: Colors.primary,
  },
  img: {
    width: 100,
    height: 100,
    marginVertical: 20,
    position: "absolute",
    bottom: 0,
  },

  goalsContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    marginTop: 50,
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
});
