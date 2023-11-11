import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";

const initialProductsState = {
    fetchedProducts: [],
    currentProducts: [],
    listSearchProducts: [],
    status: null,
    error: null,
}

export const getProducts = createAsyncThunk(
    "products/getProducts",
    async function (_, { rejectWithValue }) {
        const docRef = doc(db, "products", "products");

        try {
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const { products } = docSnap.data();
                return products;
            } else {
                throw new Error("Документ не существует!");
            }

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// const products = [
//     {
//         "id": "0",
//         "productName": "iPhone 13",
//         "type": "smartphone",
//         "image": "product-images/smartphones/iphone13.webp",
//         "cost": 79990,
//         "description": "Новый смартфон от Apple с процессором A15 Bionic и высококачественной камерой.",
//         "options": {
//             "memory": "128GB",
//             "RAM": "4GB",
//             "processor": "Apple A15 Bionic",
//             "camera": "12MP + 12MP"
//         }
//     },
//     {
//         "id": "1",
//         "productName": "Смартфон Samsung Galaxy S21",
//         "type": "smartphone",
//         "image": "product-images/smartphones/samsung_galaxy_s21.webp",
//         "description": "Новый смартфон Samsung с выдающимся экраном и мощной камерой.",
//         "cost": 59990,
//         "options": {
//             "memory": "128GB",
//             "RAM": "8GB",
//             "processor": "Exynos 2100",
//             "camera": "12MP + 12MP + 64MP"
//         }
//     },
//     {
//         "id": "2",
//         "productName": "Смартфон iPhone 13 Pro",
//         "type": "smartphone",
//         "image": "product-images/smartphones/iphone_13_pro.webp",
//         "description": "Премиальный смартфон от Apple с передовыми технологиями и iOS 15.",
//         "cost": 89990,
//         "options": {
//             "memory": "256GB",
//             "RAM": "6GB",
//             "processor": "A15 Bionic",
//             "camera": "12MP + 12MP + 12MP"
//         }
//     },
//     {
//         "id": "3",
//         "productName": "Смартфон Google Pixel 6",
//         "type": "smartphone",
//         "image": "product-images/smartphones/google_pixel_6.webp",
//         "description": "Смартфон с фокусом на камеру и операционной системой Android 12.",
//         "cost": 64990,
//         "options": {
//             "memory": "128GB",
//             "RAM": "8GB",
//             "processor": "Google Tensor",
//             "camera": "50MP + 12MP"
//         }
//     },
//     {
//         "id": "4",
//         "productName": "Смартфон OnePlus 9 Pro",
//         "type": "smartphone",
//         "image": "product-images/smartphones/oneplus_9_pro.webp",
//         "description": "Мощный смартфон с высокой частотой обновления экрана и быстрой зарядкой.",
//         "cost": 56990,
//         "options": {
//             "memory": "256GB",
//             "RAM": "12GB",
//             "processor": "Snapdragon 888",
//             "camera": "48MP + 50MP + 8MP"
//         }
//     },
//     {
//         "id": "5",
//         "productName": "Смартфон Xiaomi Mi 11",
//         "type": "smartphone",
//         "image": "product-images/smartphones/xiaomi_mi_11.webp",
//         "description": "Смартфон с флагманскими характеристиками и доступной ценой.",
//         "cost": 39990,
//         "options": {
//             "memory": "128GB",
//             "RAM": "8GB",
//             "processor": "Snapdragon 888",
//             "camera": "108MP + 13MP + 5MP"
//         }
//     },
//     {
//         "id": "6",
//         "productName": "Ноутбук Dell XPS 15",
//         "type": "laptop",
//         "image": "product-images/laptops/dell_xps_15.jpg",
//         "description": "Мощный ноутбук с высококачественным дисплеем и процессором Intel Core i7.",
//         "cost": 89990,
//         "options": {
//             "memory": "512GB SSD",
//             "RAM": "16GB",
//             "processor": "Intel Core i7-11800H",
//             "camera": "720p HD"
//         }
//     },
//     {
//         "id": "7",
//         "productName": "Ноутбук Apple MacBook Pro 13",
//         "type": "laptop",
//         "image": "product-images/laptops/macbook_pro_13.webp",
//         "description": "Ноутбук от Apple с Retina-дисплеем и процессором Apple M1.",
//         "cost": 79990,
//         "options": {
//             "memory": "256GB SSD",
//             "RAM": "8GB",
//             "processor": "Apple M1",
//             "camera": "720p FaceTime HD"
//         }
//     },
//     {
//         "id": "8",
//         "productName": "Ноутбук HP Spectre x360",
//         "type": "laptop",
//         "image": "product-images/laptops/hp_spectre_x360.webp",
//         "description": "Ультрабук с сенсорным экраном и поддержкой стилуса HP Pen.",
//         "cost": 69990,
//         "options": {
//             "memory": "1TB SSD",
//             "RAM": "16GB",
//             "processor": "Intel Core i7-1165G7",
//             "camera": "HP Wide Vision 720p HD"
//         }
//     },
//     {
//         "id": "9",
//         "productName": "Смарт-часы Apple Watch Series 7",
//         "type": "smartwatch",
//         "image": "product-images/smartwatches/apple_watch_series_7.webp",
//         "description": "Смарт-часы от Apple с крупным дисплеем и множеством функций.",
//         "cost": 34990,
//         "options": {
//             "memory": "32GB",
//             "RAM": "1GB",
//             "processor": "Apple S7"
//         }
//     },
//     {
//         "id": "10",
//         "productName": "Смарт-часы Samsung Galaxy Watch 4",
//         "type": "smartwatch",
//         "image": "product-images/smartwatches/samsung_galaxy_watch_4.webp",
//         "description": "Смарт-часы от Samsung с экосистемой Tizen и мониторингом здоровья.",
//         "cost": 19990,
//         "options": {
//             "memory": "16GB",
//             "RAM": "1.5GB",
//             "processor": "Exynos W920"
//         }
//     },
//     {
//         "id": "11",
//         "productName": "Смарт-часы Fitbit Versa 3",
//         "type": "smartwatch",
//         "image": "product-images/smartwatches/fitbit_versa_3.webp",
//         "description": "Фитнес-часы Fitbit с встроенным GPS и долгим временем работы от батареи.",
//         "cost": 8990,
//         "options": {
//             "memory": "4GB",
//             "RAM": "NA",
//             "processor": "Fitbit OS"
//         }
//     },
//     {
//         "id": "12",
//         "productName": "Смарт-часы Garmin Forerunner 945",
//         "type": "smartwatch",
//         "image": "product-images/smartwatches/garmin_forerunner_945.webp",
//         "description": "Спортивные смарт-часы Garmin с поддержкой множества видов активности.",
//         "cost": 25990,
//         "options": {
//             "memory": "16GB",
//             "RAM": "NA",
//             "processor": "NA"
//         }
//     },
//     {
//         "id": "13",
//         "productName": "Смарт-часы Huawei Watch GT 3",
//         "type": "smartwatch",
//         "image": "product-images/smartwatches/huawei_watch_gt_3.webp",
//         "description": "Смарт-часы Huawei с длительным временем работы и мониторингом сна.",
//         "cost": 14990,
//         "options": {
//             "memory": "16GB",
//             "RAM": "2GB",
//             "processor": "Huawei Kirin A1"
//         }
//     },
//     {
//         "id": "14",
//         "productName": "Наушники Apple AirPods Pro",
//         "type": "headphone",
//         "image": "product-images/headphones/apple_airpods_pro.webp",
//         "description": "Беспроводные наушники Apple с активным шумоподавлением и качественным звуком.",
//         "cost": 21990
//     },
//     {
//         "id": "15",
//         "productName": "Наушники Bose QuietComfort 35 II",
//         "type": "headphone",
//         "image": "product-images/headphones/bose_quietcomfort_35_ii.webp",
//         "description": "Беспроводные наушники Bose с технологией шумоподавления и комфортной посадкой.",
//         "cost": 19990
//     },
//     {
//         "id": "16",
//         "productName": "Беспроводные наушники Sony WH-1000XM4",
//         "type": "headphone",
//         "image": "product-images/headphones/sony_wh_1000xm4.webp",
//         "cost": 24990,
//         "description": "Беспроводные наушники с шумоподавлением и высоким качеством звука."
//     }
// ]

// export const postProducts = createAsyncThunk(
//     "products/postProducts",
//     async function (_, { rejectWithValue }) {

//         const productsDocRef = doc(db, "products", "products");
//         console.log(products);

//         try {

//             await updateDoc(productsDocRef, {
//                 products
//             });


//         } catch(error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

const productsSlice = createSlice({
    name: "products",
    initialState: initialProductsState,
    reducers: {
        filteredProducts(state, action) {
            const filteredProductsType = action.payload;
            state.currentProducts = state.fetchedProducts;

            if (filteredProductsType === "all") {
                return;
            }

            state.currentProducts = state.currentProducts.filter((product) =>
                product.type === filteredProductsType
            );
        },
        searchProducts(state, action) {
            const searchValue = action.payload;

            state.listSearchProducts = state.fetchedProducts;

            if (searchValue.length === 0) {
                state.listSearchProducts = state.fetchedProducts;
                state.currentProducts = state.fetchedProducts;
            }

            state.listSearchProducts = state.listSearchProducts.filter(product =>
                product.productName.toLowerCase().includes(searchValue.toLowerCase())
            );
        },
        searchProduct(state, action) {
            const { queryCategory, querySearch } = action.payload;

            state.listSearchProducts = state.fetchedProducts;

            if (querySearch.length === 0 && queryCategory === "all") {
                state.listSearchProducts = state.fetchedProducts;
                state.currentProducts = state.fetchedProducts;
                return;
            }

            if (querySearch.length === 0) {
                state.listSearchProducts = state.fetchedProducts.filter(product =>
                    product.type === queryCategory
                );
                state.currentProducts = state.fetchedProducts.filter(product =>
                    product.type === queryCategory
                );
                return;
            }

            if (querySearch.length !== 0 && queryCategory === "all") {
                state.listSearchProducts = state.fetchedProducts.filter(product =>
                    product.productName.toLowerCase().includes(querySearch.toLowerCase())
                );
                return;
            }

            state.listSearchProducts = state.listSearchProducts.filter(product =>
                product.productName.toLowerCase().includes(querySearch.toLowerCase()) && product.type === queryCategory
            );


        },
        showProduct(state, action) {
            const id = action.payload;

            state.currentProducts = state.fetchedProducts.filter(product =>
                product.id === id
            )
        },
    },
    extraReducers: {
        [getProducts.pending]: (state) => {
            state.status = "loading";
            state.error = null;
        },
        [getProducts.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },
        [getProducts.fulfilled]: (state, action) => {
            state.status = "resolved";
            state.error = null;
            state.fetchedProducts = action.payload;
            state.currentProducts = action.payload;
            state.listSearchProducts = action.payload;
        }
    }
});

export const productsActions = productsSlice.actions;
export default productsSlice;