import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
} from "react-native";

const Categorieslist = ({ nestedList, scrollTo, onSelect }) => {
  const navigation = useNavigation();
  const [toggleFlag, setToggleFlag] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");

  const sectionToggler = (categoryName, viewRef) => {
    scrollTo(viewRef);
    setToggleFlag(true);
    if (selectedSection === categoryName) {
      setToggleFlag(false);
      setSelectedSection("");
    } else {
      setSelectedSection(categoryName);
    }
  };

  const Subsections = ({ category }) => {
    return (
      <View style={{ paddingVertical: 10 }}>
        {category.topics.map((topic, index, array) => (
          <Pressable
            key={topic.name}
            style={styles.subCategoriesView}
            android_ripple={{ color: "#ddd" }}
            onPress={() => onSelect(topic.name)}
          >
            <View
              style={[
                styles.subCatergoryItem,
                {
                  borderBottomWidth: index < array.length - 1 ? 1 : 0,
                  borderBottomColor:
                    index < array.length - 1 ? "#ccc" : "transparent",
                },
              ]}
            >
              <Text style={styles.subCatergoryText}>{topic.name}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    );
  };

  return nestedList.map((category) => (
    <View key={category.name}>
      <ImageBackground
        style={{ marginVertical: 2.5 }}
        source={{ uri: category.image }}
      >
        <Pressable
          style={styles.categoryItem}
          //onPress={() => setToggleFlag(!toggleFlag)}
          ref={(ref) => (viewref = ref)}
          onPress={() => sectionToggler(category.name, viewref)}
          android_ripple={{ color: "#ddd" }}
        >
          <Text style={styles.catergoryText}>{category.name}</Text>
        </Pressable>
      </ImageBackground>

      {toggleFlag && selectedSection === category.name ? (
        // <View style={{ paddingVertical: 10 }}>
        //   {category.topics.map((topic, index, array) => (
        //     <Pressable
        //       key={topic.name}
        //       style={styles.subCategoriesView}
        //       android_ripple={{ color: "#ddd" }}
        //       onPress={() => onSelect(topic.name)}
        //     >
        //       <View
        //         style={[
        //           styles.subCatergoryItem,
        //           {
        //             borderBottomWidth: index < array.length - 1 ? 1 : 0,
        //             borderBottomColor:
        //               index < array.length - 1 ? "#ccc" : "transparent",
        //           },
        //         ]}
        //       >
        //         <Text style={styles.subCatergoryText}>{topic.name}</Text>
        //       </View>
        //     </Pressable>
        //   ))}
        // </View>
        <Subsections category={category} />
      ) : null}
    </View>
  ));
};

const styles = StyleSheet.create({
  categoryItem: {
    height: 90,
    paddingHorizontal: 20,
    justifyContent: "center",
    //backgroundColor: "#aaa234",
  },
  subCategoriesView: {
    paddingHorizontal: 20,
  },
  subCatergoryItem: {
    height: 70,
    justifyContent: "center",
  },
  subCatergoryText: {
    fontWeight: "500",
  },
  catergoryText: {
    fontWeight: "500",
    fontSize: 16,
    color: "#fff",
  },
});

export default Categorieslist;
