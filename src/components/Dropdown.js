import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
const Dropdown = ({ options, placeholder, onSelect }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  //["Option 1", "Option 2", "Option 3"];

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const selectOption = (option) => {
    setSelectedValue(option);
    setDropdownVisible(false);
    onSelect(option);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.dropdownPlaceholder}
        onPress={toggleDropdown}
      >
        <Text style={styles.text}>{selectedValue || placeholder}</Text>
        <FontAwesome name="caret-down" size={24} color="black" />
      </TouchableOpacity>

      <Modal
        visible={isDropdownVisible}
        animationType="slide"
        transparent
        onBackdropPress={toggleDropdown}
      >
        <View style={styles.centered_view}>
          <View style={styles.dropdown}>
            {options.map((option) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                key={option}
                onPress={() => selectOption(option)}
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.dropdownClose}
              onPress={toggleDropdown}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centered_view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  dropdown: {
    width: 60,
    height: "auto",
    borderWidth: 1,
    borderColor: "#222",
    backgroundColor: "#fff",
  },
  dropdownPlaceholder: {
    flexDirection: "row",
    padding: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    width: 65,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 1.5,
  },
  dropdownItem: { padding: 10, borderBottomWidth: 1, borderColor: "#ccc" },
  dropdownClose: { padding: 10, backgroundColor: "#f0f0f0" },
});

export default Dropdown;
