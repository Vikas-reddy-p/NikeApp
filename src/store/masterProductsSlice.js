import { createSlice } from "@reduxjs/toolkit";
import masterdata from "../data/masterdata";

const initialState = {
  allProducts: null,
  deliveryLocation: null,
  selectedCategoryData: {},
};

export const masterProductsSlice = createSlice({
  name: "masterProducts",
  initialState,
  reducers: {
    setMasterData: (state, action) => {
      state.allProducts = action.payload;
    },
    setDeliveryLocation: (state, action) => {
      state.deliveryLocation = action.payload;
    },
    findSelectedCategory: (state, action) => {
      state.selectedCategoryData = findCategoryDataByNameandGender(
        action.payload.selectedGender,
        action.payload.selectedCategoryName,
        state.allProducts
      );
    },
  },
});

// const findCategoryDataByNameandGender = (gender, nameToFind, allProducts) => {
//   if (gender in allProducts) {
//     let a = {};
//     const dataByGender = allProducts[gender];
//     for (let categoryKey in dataByGender) {
//       const categoryData = dataByGender[categoryKey];
//       if (categoryKey === "shopAll") {
//         categoryData.forEach((element) => {
//           element.topics.forEach((obj) => {
//             if (obj.name === nameToFind) {
//               a = obj;
//             }
//           });
//         });
//       } else {
//         categoryData.forEach((obj) => {
//           if (obj.name === nameToFind) {
//             a = obj;
//           }
//         });
//       }
//     }
//     return a;
//   }

//   //   const dataByGender = allProducts[gender];
//   //   if (dataByGender) {
//   //     return Object.keys(dataByGender)
//   //       .flatMap((categoryKey) => dataByGender[categoryKey])
//   //       .find((obj) => obj.name === nameToFind);
//   //   }
//   //   return null;
// };

const findCategoryDataByNameandGender = (gender, nameToFind, allProducts) => {
  const genderData = allProducts[gender];

  if (!genderData) {
    return null;
  }

  const searchInCategory = (category) => {
    const searchArray =
      category === "shopAll"
        ? genderData[category].flatMap((element) => element.topics)
        : genderData[category];
    return searchArray.find((obj) => obj.name === nameToFind);
  };

  return Object.keys(genderData).reduce(
    (result, category) => result || searchInCategory(category),
    null
  );
};
