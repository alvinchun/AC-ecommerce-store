import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";
const ProductContext = React.createContext();
//Provider
//Consumer
class ProductProvider extends Component {
	state = {
		products: [],
		detailProduct: detailProduct,
		cart: storeProducts,
		modalOpen: false,
		modalProduct: detailProduct,
		cartSubTotal: 0,
		cartTax: 0,
		cartTotal: 0
	};

	componentDidMount() {
		this.setProducts();
	}

	setProducts = () => {
		let tempProducts = [];
		storeProducts.forEach(item => {
			const singleItem = { ...item };
			tempProducts = [...tempProducts, singleItem];
		});
		this.setState(() => {
			return { products: tempProducts };
		});
	};

	getItem = id => {
		const product = this.state.products.find(item => item.id === id);
		return product;
	};

	handleDetail = id => {
		const product = this.getItem(id);
		this.setState(() => {
			return { detailProduct: product };
		});
	};

	addToCart = id => {
		// `` template literals
		let tempProducts = [...this.state.products];
		const index = tempProducts.indexOf(this.getItem(id));
		const product = tempProducts[index];
		product.inCart = true;
		product.count = 1;
		const price = product.price;
		product.total = price;
		this.setState(
			() => {
				return { products: tempProducts, cart: [...this.state.cart, product] };
			},
			() => {
				console.log(this.state);
			}
		);
	};
	// tester = () => {
	// 	console.log("State products :", this.state.products[0].inCart);
	// 	console.log("Data products :", storeProducts[0].inCart);

	// 	const tempProducts = [...this.state.products];
	// 	tempProducts[0].inCart = true;
	// 	this.setState(
	// 		() => {
	// 			return { products: tempProducts };
	// 		},
	// 		() => {
	// 			console.log("State products :", this.state.products[0].inCart);
	// 			console.log("Data products :", storeProducts[0].inCart);
	// 		}
	// 	);
	// };

	openModal = id => {
		const product = this.getItem(id);
		this.setState(() => {
			return { modalProduct: product, modalOpen: true };
		});
	};

	closeModal = () => {
		this.setState(() => {
			return { modalOpen: false };
		});
	};

	increment = id => {
		console.log("this is increment method");
	};

	decrement = id => {
		console.log("this is decrement method");
	};

	removeItem = id => {
		console.log("item removed");
	};

	removeItem = id => {
		console.log("cart was cleared");
	};

	clearCart = id => {
		console.log("cart was cleared");
	};

	render() {
		return (
			// We are getting the value in an object (that's the key point of using context API to render values inside of object)
			<ProductContext.Provider
				value={{
					...this.state,
					handleDetail: this.handleDetail,
					addToCart: this.addToCart,
					openModal: this.openModal,
					closeModal: this.closeModal,
					increment: this.increment,
					decrement: this.decrement,
					removeItem: this.removeItem,
					clearCart: this.clearCart
				}}
			>
				{/* <button onClick={this.tester}> test me </button> */}
				{this.props.children}
			</ProductContext.Provider>
		);
	}
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
