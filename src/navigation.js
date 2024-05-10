import { NavigationContainer, useRoute } from "@react-navigation/native";
import ProductsScreen from "./screens/ProductsScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ShoppingCart from "./screens/ShoppingCart";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { selectNumberOfItems } from "./store/cartSlice";
import {
  DrawerContentScrollView,
  createDrawerNavigator,
} from "@react-navigation/drawer";

import MainButton from "./components/MainButton";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import data from "./data/masterdata";
import MensScreen from "./screens/MensScreen";
import WomensScreen from "./screens/WomensScreen";
import DynamicScreen from "./screens/DynamicScreen";
import { productsSlice } from "./store/productsSlice";
import { masterProductsSlice } from "./store/masterProductsSlice";
import axios from "axios";
import { useEffect } from "react";
import masterdata from "./data/masterdata";
import products from "./data/products";

const makeApiCall = async (url) => {
  try {
    // const result = await fetch(url, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    const result = await axios.get(url);
    //const resultJson = await result.json();
    //console.log(result.data);
    //return resultJson;
    return result.data;
  } catch (err) {
    console.error(err);
  }
};

const Navigation = () => {
  const dispatch = useDispatch();
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  const Tab = createMaterialTopTabNavigator();
  const numberOfItems = useSelector(selectNumberOfItems);

  const PRODUCTS_API_URL =
    "https://mocki.io/v1/21d7c289-9e21-4c42-bb4f-30dd8ab6978a";
  const MASTER_DATA_API_URL =
    "https://mocki.io/v1/60b8db9f-a399-45ca-abc8-21dc9c1aecec";

  useEffect(() => {
    const masterData = makeApiCall(MASTER_DATA_API_URL);
    const productsData = makeApiCall(PRODUCTS_API_URL);
    masterData.then((data) => {
      dispatch(
        masterProductsSlice.actions.setMasterData(data ? data : masterdata)
      );
    });
    productsData.then((data) => {
      dispatch(productsSlice.actions.setProductsState(data ? data : products));
    });
  }, []);

  const headerIcons = ({ navigation }) => ({
    //moved from options of Stack.Screen
    headerRight: () => (
      //here since the pressable is inside the options we cannot get access to navigation directly. either we can move it to different component and use useNavigation() hook or return the entire options as an object so that navigation can passed as param to that function(like done here.) and this function can also get route prop.
      <>
        <Pressable
          onPress={() => navigation.navigate("Bag")}
          style={{ marginRight: 15 }}
        >
          <Feather name="search" size={26} color="black" />
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Bag")}
          style={{ flexDirection: "row" }}
        >
          <SimpleLineIcons name="bag" size={26} color="black" />
          <Text
            style={{
              position: "absolute",
              left: 9,
              top: 6,
              fontWeight: "500",
            }}
          >
            {numberOfItems}
          </Text>
        </Pressable>
      </>
    ),
  });

  const shopHeaderIcons = ({ navigation }) => ({
    headerRight: () => (
      <View style={{ flexDirection: "row" }}>
        <Pressable
          onPress={() => navigation.navigate("Bag")}
          style={{ marginRight: 15 }}
        >
          <Feather name="search" size={26} color="black" />
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Bag")}
          style={{ flexDirection: "row", marginRight: 10 }}
        >
          <SimpleLineIcons name="bag" size={26} color="black" />
          <Text
            style={{
              position: "absolute",
              left: 9,
              top: 6,
              fontWeight: "500",
            }}
          >
            {numberOfItems}
          </Text>
        </Pressable>
      </View>
    ),
  });
  const cartHeaderActions = ({ navigation }) => ({
    headerRight: () => (
      <Pressable onPress={() => navigation.navigate("Bag")}>
        <FontAwesome5 name="heart" size={20} color="black" />
      </Pressable>
    ),
    // headerLeft: () => (
    //   <Pressable onPress={() => navigation.navigate("Products")}>
    //     <FontAwesome5 name="home" size={20} color="black" />
    //   </Pressable>
    // ),
  });

  function EmptyScreen() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Coming Soon</Text>
      </View>
    );
  }

  function Shop({ navigation }) {
    return (
      <Tab.Navigator
        initialRouteName="Men"
        screenOptions={{
          swipeEnabled: false,
          tabBarItemStyle: { width: 85 },
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}
      >
        <Tab.Screen name="Men" component={MensScreen} />
        <Tab.Screen name="Women" component={WomensScreen} />
        <Tab.Screen name="Kids" component={EmptyScreen} />
        <Tab.Screen name="Jordan" component={EmptyScreen} />
      </Tab.Navigator>
    );
  }

  const drawerItems = [
    {
      name: "Discover",
      icon: "compass",
    },
    {
      name: "Shop",
      icon: "search",
    },
    {
      name: "Events",
      icon: "calendar",
    },
    {
      name: "Orders",
      icon: "package",
    },
    {
      name: "Favorites",
      icon: "heart",
    },
    {
      name: "Inbox",
      icon: "inbox",
    },
    {
      name: "Settings",
      icon: "settings",
    },
  ];

  const CustomDrawerContent = (props) => {
    const currentRouteName =
      props.navigation.getState().routes[props.navigation.getState().index]
        .name;
    return (
      <DrawerContentScrollView {...props}>
        <View style={{ paddingLeft: 25, paddingVertical: 35 }}>
          <Pressable onPress={() => props.navigation.navigate("Profile")}>
            <FontAwesome name="user-circle" size={58} color="gray" />
            <Text style={{ fontWeight: "500", marginTop: 10 }}>
              Vikas Reddy
            </Text>
          </Pressable>
        </View>
        <View style={{ borderTopWidth: 0.5, borderTopColor: "#aaa" }}>
          {drawerItems.map((item) => (
            <TouchableOpacity
              key={item.name}
              onPress={() => {
                props.navigation.navigate(item.name);
              }}
            >
              <View
                style={[
                  styles.touchableView,
                  {
                    backgroundColor:
                      currentRouteName === item.name ? "#ddd" : "#fff",
                  },
                ]}
              >
                <Feather
                  name={item.icon}
                  size={24}
                  color={currentRouteName === item.name ? "black" : "#aaa"}
                />
                <Text
                  style={
                    currentRouteName === item.name
                      ? styles.activeText
                      : styles.text
                  }
                >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </DrawerContentScrollView>
    );
  };

  function Home() {
    return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        initialRouteName="Shop"
      >
        <Drawer.Screen name="Discover" component={EmptyScreen} />
        <Drawer.Screen name="Shop" component={Shop} options={shopHeaderIcons} />
        <Drawer.Screen name="Events" component={EmptyScreen} />
        <Drawer.Screen name="Orders" component={EmptyScreen} />
        <Drawer.Screen name="Favorites" component={EmptyScreen} />
        <Drawer.Screen name="Inbox" component={EmptyScreen} />
        <Drawer.Screen name="Settings" component={EmptyScreen} />
      </Drawer.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: "white" },
          //headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dynamic"
          component={DynamicScreen}
          options={headerIcons}
        />
        <Stack.Screen name="Profile" component={EmptyScreen} />
        <Stack.Screen
          name="Products"
          component={ProductsScreen}
          options={headerIcons}
        />
        <Stack.Screen
          name="Product Details"
          component={ProductDetailsScreen}
          options={headerIcons}
        />
        <Stack.Screen
          name="Bag"
          component={ShoppingCart}
          options={cartHeaderActions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    textTransform: "none",
    fontWeight: "500",
    fontSize: 16,
  },
  touchableView: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    paddingLeft: 25,
  },
  text: { marginLeft: 15, color: "#aaa" },
  activeText: {
    marginLeft: 15,
    color: "black",
    fontWeight: "500",
  },
});

export default Navigation;
