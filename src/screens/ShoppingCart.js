import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
  Button,
} from "react-native";
import cart from "../data/cart";
import CartListItem from "../components/CartListItem";
import { useDispatch, useSelector } from "react-redux";
import {
  cartSlice,
  selectDeliveryPrice,
  selectNumberOfItems,
  selectSubTotal,
  selectTotal,
} from "../store/cartSlice";
import MainButton from "../components/MainButton";
import { Foundation } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useState } from "react";
import DatePicker from "react-native-date-picker";
import { AntDesign } from "@expo/vector-icons";

const ShoppingCartTotals = () => {
  const subTotal = useSelector(selectSubTotal);
  const deliveryFee = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);
  let minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

  const [date, setDate] = useState(minDate);
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.totalsContainer}>
      <View
        style={[
          styles.row,
          { paddingBottom: 15, borderBottomWidth: 1, borderColor: "gainsboro" },
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text}>Select delivery date</Text>
          <Pressable onPress={() => setOpen(true)} style={{ marginLeft: 5 }}>
            <AntDesign name="calendar" size={20} color="black" />
          </Pressable>
          <DatePicker
            modal
            open={open}
            date={date}
            mode="date"
            minimumDate={minDate}
            onConfirm={(date) => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
        <View>
          <Text style={styles.textBold}>{date.toDateString()}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Subtotal</Text>
        <Text style={styles.text}>₹{subTotal}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Delivery</Text>
        <Text style={styles.text}>₹{deliveryFee}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textBold}>Total</Text>
        <Text style={styles.textBold}>₹{total}</Text>
      </View>
    </View>
  );
};

const ShoppingCart = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const numberOfItems = useSelector(selectNumberOfItems);

  const navigateToHome = () => navigation.navigate("Home");
  const dispatch = useDispatch();
  const checkOut = () => {};
  const clearCart = () => {
    dispatch(cartSlice.actions.clearCart());
  };

  return numberOfItems ? (
    <>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={ShoppingCartTotals}
      />
      <View style={styles.actionsView}>
        <View style={{ width: "20%", paddingLeft: 10 }}>
          <MainButton
            title={<Foundation name="trash" size={20} color="white" />}
            onPressHandler={clearCart}
          />
        </View>
        <View style={{ width: "80%" }}>
          <MainButton title="Checkout" onPressHandler={checkOut} />
        </View>
      </View>
    </>
  ) : (
    <>
      <View style={styles.cartEmptyContainer}>
        <View style={styles.bagIconView}>
          <SimpleLineIcons name="bag" size={40} color="black" />
        </View>

        <Text style={styles.textCartEmpty}>Your Bag is empty.</Text>
        <Text style={styles.textCartEmpty}>
          When you add products, they'll {"\n"}appear here.
        </Text>
      </View>
      <MainButton title="Shop Now" onPressHandler={navigateToHome} />
    </>
  );
};

const styles = StyleSheet.create({
  cartEmptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  totalsContainer: {
    margin: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: "gainsboro",
    paddingBottom: 70,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  text: { fontSize: 16, color: "gray" },
  textBold: { fontSize: 16, fontWeight: "500" },
  textCartEmpty: { fontSize: 18, textAlign: "center", lineHeight: 25 },
  actionsView: {
    flexDirection: "row",
  },
  bagIconView: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    marginVertical: 10,
  },
});

export default ShoppingCart;
