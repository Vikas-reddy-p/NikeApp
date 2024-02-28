import {
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SectionList,
  Pressable,
} from "react-native";
//import data from "../data/masterdata";
import { useEffect, useRef, useState } from "react";
import Categorieslist from "../components/CategoriesList";
import { useDispatch, useSelector } from "react-redux";
import { masterProductsSlice } from "../store/masterProductsSlice";
import * as Location from "expo-location";

const MensScreen = ({ navigation }) => {
  //let mensData;
  //const [mensData, setMensData] = useState(null);
  const data = useSelector((state) => state.masterProducts.allProducts);
  // setMensData(data["men"]);
  const mensData = data["men"];
  // useEffect(() => {
  //   const data = useSelector((state) => state.masterProducts.allProducts);
  //   setMensData(data["men"]);
  // }, []);

  const scrollViewRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.warn("Permission to access location was denied");
          return;
        }

        let currlocation = await Location.getCurrentPositionAsync({});
        //setLocation(currlocation);
        reverseGeoCode(currlocation.coords);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  const reverseGeoCode = async (address) => {
    try {
      if (address) {
        const reverseGeoCodedAddress = await Location.reverseGeocodeAsync({
          longitude: address.longitude,
          latitude: address.latitude,
        });
        //setDeliveryLocation(reverseGeoCodedAddress[0]);
        dispatch(
          masterProductsSlice.actions.setDeliveryLocation(
            reverseGeoCodedAddress[0]
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const scrollTo = (viewRef) => {
    viewRef.measure((x, y, width, height, pageX, pageY) => {
      // Scroll to the position of the pressed view
      scrollViewRef.current.scrollTo({ y: pageY, animated: true });
    });
  };

  const navigateToDynamicScreen = (categoryName) => {
    // dispatch(
    //   masterProductsSlice.actions.findSelectedCategory({
    //     selectedCategoryName: categoryName,
    //     selectedGender: "men",
    //   })
    // );
    navigation.navigate("Dynamic", {
      selectedCategoryName: categoryName,
      selectedGender: "men",
    });
  };
  // return <></>;
  return mensData ? (
    <ScrollView style={styles.container} ref={scrollViewRef}>
      <View>
        <View style={styles.childContainer}>
          <Text style={styles.sectionHeader}>This Week's Highlights</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            //data={data.men.highlights}
            data={mensData?.["highlights"]}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigateToDynamicScreen(item.name)}
                style={styles.highlightsTouchable}
              >
                <Image
                  source={{
                    uri: item.image,
                  }}
                  style={styles.highlightsImage}
                />
                <View style={styles.titlesView}>
                  {item.subTitle ? (
                    <Text style={styles.subTitle}>{item.subTitle}</Text>
                  ) : null}
                  <Text style={styles.title}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.childContainer}>
          <Text style={styles.sectionHeader}>Shop by Colour</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            // data={data.men.shopByColour}
            data={mensData?.["shopByColour"]}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigateToDynamicScreen(item.name)}
                style={styles.shopColoursTouchable}
              >
                <Image
                  source={{
                    uri: item.image,
                  }}
                  style={styles.shopColoursImage}
                />
                <View style={styles.titlesView}>
                  {item.subTitle ? (
                    <Text style={styles.subTitle}>{item.subTitle}</Text>
                  ) : null}
                  <Text style={styles.title}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <Categorieslist
          //nestedList={data.men.shopAll}
          nestedList={mensData?.["shopAll"]}
          scrollTo={scrollTo}
          onSelect={navigateToDynamicScreen}
        />
      </View>
    </ScrollView>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  childContainer: { paddingVertical: 20, paddingLeft: 20 },
  sectionHeader: { fontSize: 20, fontWeight: "500", marginBottom: 20 },
  highlightsTouchable: {
    width: 150,
    height: 200,
    backgroundColor: "#fff",
    marginRight: 10,
  },
  highlightsImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  shopColoursTouchable: {
    width: 150,
    height: 250,
    backgroundColor: "#fff",
    marginRight: 10,
  },
  shopColoursImage: {
    width: 150,
    height: 200,
    borderRadius: 10,
  },
  titlesView: {
    alignSelf: "flex-start",
    paddingLeft: 5,
    paddingTop: 10,
  },
  subTitle: { color: "grey" },
  title: { fontWeight: "500" },
});

export default MensScreen;
