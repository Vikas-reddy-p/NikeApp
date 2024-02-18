import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
//import products from "../data/products";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { productsSlice } from "../store/productsSlice";
import { FontAwesome } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";

const ProductsScreen = ({ test }) => {
  //console.log(test);
  const navigation = useNavigation(); // this works similar to having navigtion in props...but when using as props, navigation prop is avaible only to the components which are rendered by the NavigationContainer , whereas using useNavigation() , we can get it anywhere. for example , in the CartlistItem component we cannot get navigation as props.

  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  return (
    // <FlatList
    //   data={products}
    //   numColumns={2}
    //   renderItem={({ item }) => (
    //     <TouchableOpacity
    //       onPress={() => {
    //         dispatch(productsSlice.actions.setSelectedProduct(item.id));
    //         navigation.navigate("Product Details");
    //       }}
    //       style={styles.itemContainer}
    //       // style={({ pressed }) => [
    //       //   styles.itemContainer,
    //       //   { opacity: pressed ? 0.2 : 1 },
    //       // ]}
    //       //android_ripple={{ color: "#eee" }}
    //     >
    //       <Pressable style={styles.favoriteIcon}>
    //         <FontAwesome name="heart-o" size={22} color="black" />
    //       </Pressable>
    //       <Image
    //         source={{
    //           uri: item.image,
    //         }}
    //         style={styles.image}
    //       ></Image>
    //       <View style={styles.itemTextView}>
    //         <Text style={styles.itemText}>{item.name}</Text>
    //         <Text style={styles.itemText}>MRP : ₹ {item.price}</Text>
    //       </View>
    //     </TouchableOpacity>
    //   )}
    // />

    <FlashList
      data={products}
      horizontal={false}
      numColumns={2}
      estimatedItemSize={20}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            dispatch(productsSlice.actions.setSelectedProduct(item.id));
            navigation.navigate("Product Details");
          }}
          style={styles.itemContainer}
        >
          <Pressable style={styles.favoriteIcon}>
            <FontAwesome name="heart-o" size={22} color="black" />
          </Pressable>
          <Image
            source={{
              uri: item.image,
            }}
            style={styles.image}
          ></Image>
          <View style={styles.itemTextView}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>MRP : ₹ {item.price}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  itemContainer: {
    //width: "50%",
    padding: 4,
    backgroundColor: "#fff",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 30,
  },
  itemTextView: {
    paddingLeft: 15,
    paddingVertical: 15,
  },
  favoriteIcon: {
    borderWidth: 1,
    borderColor: "#fff",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    alignSelf: "flex-end",
    position: "absolute",
    right: 10,
    top: 15,
    zIndex: 1,
    backgroundColor: "#fff",
  },
});

export default ProductsScreen;
