import {
  FlatList,
  Image,
  StyleSheet,
  View,
  useWindowDimensions,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import products from "../data/products";
import { useDispatch, useSelector } from "react-redux";
import { cartSlice } from "../store/cartSlice";
import MainButton from "../components/MainButton";
import { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";
import { FontAwesome } from "@expo/vector-icons";

const ProductDetailsScreen = ({ navigation }) => {
  const { width } = useWindowDimensions(); // to get the screen dimensions
  const [addToCartClickFlag, setAddToCartClickFlag] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  // useEffect(() => {
  //   //setAddToCartFlag(false);
  // }, [selectedSize]);

  const dispatch = useDispatch();
  const selectedProduct = useSelector(
    (state) => state.products.selectedProduct
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: selectedProduct.name,
    });
  }, [selectedProduct]);
  //const product = products[0];

  const addToCart = () => {
    //setAddToCartFlag(true);
    setAddToCartClickFlag(true);
    if (selectedSize) {
      let product = { ...selectedProduct, size: selectedSize };
      dispatch(cartSlice.actions.addCartItem({ product }));
    }
  };

  const goToCart = () => {
    navigation.navigate("Bag");
  };

  const selectSizeDropdown = (size) => {
    setSelectedSize(size);
  };

  return (
    <View>
      <ScrollView>
        {/* Image Carousel */}
        <FlatList
          data={selectedProduct.images}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={{ width, aspectRatio: 1 }} />
          )}
          horizontal
          showsHorizontalScrollIndicator={true}
          pagingEnabled
        />
        {/* <Pressable
          style={[
            {
              zIndex: 1,
              marginVertical: 0,
              position: "relative",
              left: 15,
              top: -35,
            },
          ]}
        >
          <FontAwesome name="heart-o" size={24} color="black" />
        </Pressable> */}
        <View style={{ padding: 20 }}>
          {/* Title */}
          <View
            style={[styles.flexRowView, { justifyContent: "space-between" }]}
          >
            <Text style={styles.title}>{selectedProduct.name}</Text>
            <Pressable style={{ marginTop: 22 }}>
              <FontAwesome name="heart-o" size={24} color="black" />
            </Pressable>
          </View>

          {/* Price */}
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.price}>MRP : ₹ {selectedProduct.price}</Text>
            <Text style={styles.additionalText}>Incl. of taxes</Text>
            <Text style={styles.additionalText}>
              (Also includes all applicable taxes)
            </Text>
            {/* <Dropdown
              options={selectedProduct.sizes}
              placeholder="Size"
              onSelect={selectSizeDropdown}
            /> */}
          </View>
          {/* size selection */}
          <Text style={styles.text}>Size</Text>
          {addToCartClickFlag && !selectedSize ? (
            <Text style={{ fontSize: 16, color: "red", marginTop: 5 }}>
              Please select a size.
            </Text>
          ) : null}
          <View style={styles.flexRowView}>
            {selectedProduct.sizes.map((size) => {
              return (
                <Pressable
                  key={size}
                  style={[
                    styles.sizeButton,
                    selectedSize === size && styles.selected,
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text style={styles.text}>{size}</Text>
                </Pressable>
              );
            })}
          </View>

          {/* Description */}
          <Text style={styles.description}>{selectedProduct.description}</Text>
        </View>
      </ScrollView>

      {/* Add to Cartt button */}
      {/* <View style={{ flexDirection: "row" }}> */}
      {/* <View style={{ width: "25%", paddingLeft: 10 }}>
          <MainButton
            title={<FontAwesome name="heart" size={20} color="white" />}
            onPressHandler={addToCart}
          />
        </View> */}
      {/* <View style={{ width: "75%" }}> */}
      <MainButton title="Add to Bag" onPressHandler={addToCart} />
      {/* {!addToCartFlag ? (
            <MainButton title="Add to Bag" onPressHandler={addToCart} />
          ) : (
            <MainButton title="Go to Bag" onPressHandler={goToCart} />
          )} */}
      {/* </View> */}
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "500",
    marginVertical: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
    letterSpacing: 1.5,
  },
  price: {
    //paddingTop: 5,
    paddingRight: 10,
    fontSize: 18,
    //fontWeight: "500",
    letterSpacing: 1.5,
  },
  additionalText: {
    fontSize: 16,
    color: "#aaa",
  },
  description: {
    fontSize: 18,
    fontWeight: "300",
    marginVertical: 15,
    paddingBottom: 70,
    lineHeight: 30,
  },
  flexRowView: {
    flexDirection: "row",
  },
  sizeButton: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginRight: 10,
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: "#aaa",
    borderRadius: 25,
  },
  selected: {
    borderWidth: 3,
    backgroundColor: "rgb(214 219 221))",
    borderColor: "#222",
  },
});

export default ProductDetailsScreen;