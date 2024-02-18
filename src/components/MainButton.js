import { StyleSheet, Text, Pressable } from "react-native";

const MainButton = (props) => {
  return (
    <Pressable onPress={props.onPressHandler} style={styles.button}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    backgroundColor: "#000",
    bottom: 20,
    alignSelf: "center",
    width: "90%",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default MainButton;
