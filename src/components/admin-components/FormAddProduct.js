import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeProducts } from "../../store/products-slice";
import { db } from '../../firebase';
import { setDoc, doc } from 'firebase/firestore';
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import PreviewImage from './PreviewImage';
import useInput from "../../hooks/use-input";
import styles from "./FormAddProduct.module.css";
import "react-toastify/dist/ReactToastify.css";

const imageTypeFile = ["jpg", "jpeg", "png", "webp"];
const hostURL = "/upload";

const FormAddProduct = () => {

	const dispathAction = useDispatch();
	const { status, error, categoriesProducts } = useSelector((state) => state.categoriesProducts);

	const [categorieProducts, setCategorieProducts] = useState("smartphones");
	const filteredCategoryProducts = categoriesProducts.filter((categorie) =>
		categorie.filterValue !== "all"
	);

	const [imagesData, setImagesData] = useState([]);
	const [imagesDataRender, setImagesDataRender] = useState([]);
	const [imagesURL, setImagesURL] = useState([]);

	const inputFileRef = useRef();

	const imageChangeHandler = (event) => {
		const files = Array.from(event.target.files);

		if (files.length > 3) {
			toast.warn("Больше 3-х фотографий добавлять нельзя!");
			return;
		}

		files.forEach((file) => {

			const fileReader = new FileReader();

			if (imagesData.length === 3) {
				toast.warning("Больше 3-х фотографий добавлять нельзя!");
				return;
			}

			const extension = file.name.substring(file.name.lastIndexOf(".") + 1);

			if (!imageTypeFile.includes(extension)) {
				toast.warning(`Файлы данного типа ${extension} нельзя загружать!`);
				return;
			}

			fileReader.onload = () => {

				setImagesData((prevState) => {
					return [
						...prevState,
						file
					]
				});

				setImagesDataRender((prevState) => {
					return [
						...prevState,
						{
							name: file.name,
							size: file.size,
							url: fileReader.result,
							id: Math.random()
						}
					];
				});

				setImagesURL((prevState) => {
					return [
						...prevState,
						`${file.name}`
					]
				});
			}

			fileReader.readAsDataURL(file);

		});
	}

	const {
		value: enteredNameProduct,
		hasError: hasNameProductInputError,
		isValid: isEnteredNameProductValid,
		inputChangeHandler: nameProductChangeHandler,
		inputLostFocusHandler: nameProductLostFocusHandler,
		resetValues: resetNameProductInputValues
	} = useInput((val) => val.length !== 0);

	const {
		value: enteredDescriptionProduct,
		hasError: hasDescriptionProductInputError,
		isValid: isEnteredDescriptionProductValid,
		inputChangeHandler: descriptionProductChangeHandler,
		inputLostFocusHandler: descriptionProductLostFocusHandler,
		resetValues: resetDescriptionProductInputValues
	} = useInput((val) => val.length !== 0);

	const {
		value: enteredCostProduct,
		hasError: hasCostProductInputError,
		isValid: isEnteredCostProductValid,
		inputChangeHandler: costProductChangeHandler,
		inputLostFocusHandler: costProductLostFocusHandler,
		resetValues: resetCostProductInputValues
	} = useInput((val) => val.length !== 0);

	const [options, setOptionsProduct] = useState({
		memory: "",
		camera: "",
		processor: "",
		ram: ""
	});

	const memoryChangeHandler = (event) => {
		setOptionsProduct({
			...options,
			memory: event.target.value
		});
	}

	const cameraChangeHandler = (event) => {
		setOptionsProduct({
			...options,
			camera: event.target.value
		});
	}

	const processorChangeHandler = (event) => {
		setOptionsProduct({
			...options,
			processor: event.target.value
		});
	}

	const ramChangeHandler = (event) => {
		setOptionsProduct({
			...options,
			ram: event.target.value
		});
	}

	const categorieProductsChangeHandler = (event) => {
		setCategorieProducts(event.target.value);
	}

	const addProductHandler = (event) => {
		event.preventDefault();

		if (!imagesData) {
			toast.warn("Загрузите файлы");
			return;
		}

		const newProduct = {
			id: uuidv4(),
			productName: enteredNameProduct,
			description: enteredDescriptionProduct,
			cost: enteredCostProduct,
			type: categorieProducts,
			images: [...imagesURL],
			options: options.camera ? options : null
		}

		dispathAction(changeProducts(newProduct));
		setDoc(doc(db, "reviews", newProduct.id), {
			reviews: [],
			rating: 0
		});
		productUpload();

		setImagesData([]);
		setImagesDataRender([]);
		setImagesURL([]);
		setOptionsProduct({
			memory: "",
			camera: "",
			processor: "",
			ram: ""
		});
		resetNameProductInputValues();
		resetCostProductInputValues();
		resetDescriptionProductInputValues();

		toast.success("Товар добавлен!");

	}

	const productUpload = async () => {

		const formData = new FormData();

		for (let i = 0; i < imagesData.length; i++) {
			formData.append("images", imagesData[i]);
		}

		try {
			const response = await fetch(hostURL, {
				method: "POST",
				body: formData
			});

			if (!response.ok) {
				throw new Error("Произошла ошибка загрузки файлов товара!");
			}

			const responseData = await response.json();

			if (!responseData.status) {
				throw new Error(responseData.message);
			}

		} catch (error) {
			console.log(error);
		}

	}

	const addImageHandler = () => {
		inputFileRef.current.click();
	}

	const removeImage = (id, name) => {

		const removeImagesRenderArray = imagesDataRender.filter((image) =>
			image.id !== id
		);

		const removeImagesData = imagesData.filter((image) =>
			name !== image.name
		);

		const removeImagesURLArray = imagesURL.filter((imageURL) =>
			name !== imageURL
		);

		setImagesDataRender(removeImagesRenderArray);
		setImagesData(removeImagesData);
		setImagesURL(removeImagesURLArray);
	}

	const optionsProductSmartphoneAndLaptopHTML =
		<div className={styles["options__product"]}>
			<p className={styles["subtitle__inputs"]}>Свойства товара</p>
			<label className={styles["label__input"]} htmlFor='memory'>
				<p className={styles["subtitle__text"]}>Память: </p>
				<input required type='text' id='memory' value={options.memory} onChange={memoryChangeHandler} />
			</label>
			<label className={styles["label__input"]} htmlFor='ram'>
				<p className={styles["subtitle__text"]}>Оперативная память: </p>
				<input required type='text' id='ram' value={options.ram} onChange={ramChangeHandler} />
			</label>
			<label className={styles["label__input"]} htmlFor='processor'>
				<p className={styles["subtitle__text"]}>Процессор: </p>
				<input required type='text' id='processor' value={options.processor} onChange={processorChangeHandler} />
			</label>
			<label className={styles["label__input"]} htmlFor='camera'>
				<p className={styles["subtitle__text"]}>Камера: </p>
				<input required type='text' id='camera' value={options.camera} onChange={cameraChangeHandler} />
			</label>
		</div>;

	const optionsProductSmartwatchHTML =
		<div className={styles["options__product"]}>
			<p className={styles["subtitle__inputs"]}>Свойства товара</p>
			<label className={styles["label__input"]} htmlFor='memory'>
				<p className={styles["subtitle__text"]}>Память:</p>
				<input type='text' id='memory' value={options.memory} onChange={memoryChangeHandler} />
			</label>
			<label className={styles["label__input"]} htmlFor='ram'>
				<p className={styles["subtitle__text"]}>Оперативная память:</p>
				<input type='text' id='ram' value={options.ram} onChange={ramChangeHandler} />
			</label>
			<label className={styles["label__input"]} htmlFor='processor'>
				<p className={styles["subtitle__text"]}>Процессор:</p>
				<input type='text' id='processor' value={options.processor} onChange={processorChangeHandler} />
			</label>
		</div>;

	return (
		<form onSubmit={addProductHandler} className={styles["form__add_product"]}>
			<div className={styles["add__product_title"]}>
				<h2>Добавление нового товара</h2>
			</div>
			<label className={styles["label__select"]}>
				<p className={styles["subtitle__text"]}>Категория нового товара:</p>
				{status === "loading" && <span className="loader__pin"></span>}
				{error && <p>Произошла ошибка!</p>}
				{status === "resolved" &&
					<select className={styles["category__products_select"]} onChange={categorieProductsChangeHandler} value={categorieProducts}>
						{filteredCategoryProducts.map((categorie) =>
							<option value={categorie.filterValue}>{categorie.filterTypeText}</option>
						)
						}
					</select>
				}
			</label>
			<label className={styles["label__input"]}>
				<p className={styles["subtitle__text"]}>Введите название товара:</p>
				<div className={styles["input__wrapper"]}>
					<input type='text' onChange={nameProductChangeHandler} onBlur={nameProductLostFocusHandler} value={enteredNameProduct} />
					{hasNameProductInputError && <p className="error__text">Поле не должно быть пустым!</p>}
				</div>
			</label>

			<label className={styles["label__input"]}>
				<p className={styles["subtitle__text"]}>Введите цену товара:</p>
				<div className={styles["input__wrapper"]}>
					<input type='number' onChange={costProductChangeHandler} onBlur={costProductLostFocusHandler} value={enteredCostProduct} />
					{hasCostProductInputError && <p className="error__text">Поле не должно быть пустым!</p>}
				</div>
			</label>
			<div className={styles["label__input_images"]}>
				<p className={styles["subtitle__text"]}>Добавьте 3 фотографии товара:</p>
				<div className={styles["images__wrapper"]}>
					<div className={styles["input__image_wrapper"]}>
						<button type='button' onClick={addImageHandler} className={styles["btn__add_file"]}>Загрузить изображение товара</button>
						<input type="file" multiple className={styles["input__file"]} ref={inputFileRef} onChange={imageChangeHandler} accept=".jpg,.jpeg,.png,.webp" />
						{
							imagesData.length !== 0 ?
								<div className={styles["uploaded__images"]}>
									{
										imagesDataRender.map((image) =>
											<PreviewImage image={image} onDelete={removeImage} />
										)
									}
								</div>
								:
								<p className={styles["empty__images"]}>Вы ещё не загрузили изображения товаров</p>
						}
					</div>
				</div>
			</div>
			<label className={styles["label__input_description"]}>
				<p className={styles["subtitle__text"]}>Описание товара: </p>
				<textarea value={enteredDescriptionProduct} onBlur={descriptionProductLostFocusHandler} onChange={descriptionProductChangeHandler}></textarea>
				{hasDescriptionProductInputError && <p className="error__text">Поле не должно быть пустым!</p>}
			</label>
			{categorieProducts === "smartphones" || categorieProducts === "laptops" ?
				optionsProductSmartphoneAndLaptopHTML : ""
			}
			{categorieProducts === "smartwatches" &&
				optionsProductSmartwatchHTML
			}
			<button className={styles["btn__add_product"]} type="submit">Добавить товар</button>
			<ToastContainer />
		</form>
	)
}

export default FormAddProduct;