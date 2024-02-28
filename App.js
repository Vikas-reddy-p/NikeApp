import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Navigation from "./src/navigation";
import { Provider } from "react-redux";
import { store } from "./src/store";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <StatusBar style="auto" />
      <Toast />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
