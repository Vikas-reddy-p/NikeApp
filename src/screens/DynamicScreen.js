import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet } from "react-native";
import data from "../data/masterdata";
import ProductsScreen from "./ProductsScreen";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { masterProductsSlice } from "../store/masterProductsSlice";
const Tab = createMaterialTopTabNavigator();

const DynamicScreen = ({ route, navigation }) => {
  const { selectedCategoryName, selectedGender } = route.params;
  const dispatch = useDispatch();
  dispatch(
    masterProductsSlice.actions.findSelectedCategory({
      selectedCategoryName: selectedCategoryName,
      selectedGender: selectedGender,
    })
  );

  const selectedCategoryData = useSelector(
    (state) => state.masterProducts.selectedCategoryData
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: selectedCategoryName,
    });
  }, [selectedCategoryName]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarLabelStyle: styles.tabBarLabelStyle,
      }}
    >
      {selectedCategoryData.subCategories.map((subCategory) => (
        <Tab.Screen key={subCategory} name={subCategory}>
          {(props) => <ProductsScreen test={subCategory} />}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    textTransform: "none",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default DynamicScreen;
