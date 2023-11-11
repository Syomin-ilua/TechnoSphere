import React from 'react';
import styles from "./UserOrders.module.css";
import Order from '../basket-components/Order';

const orders = [
	{
		id: "1",
		date: "12.02.2023",
		totalPrice: 120000,
		products: [
			{
				id: "1",
				productName: "IPHONE 13",
				memory: "128",
				RAM: "8",
				price: 50000
			},
			{
				id: "3",
				productName: "MACBOOK PRO M1",
				memory: "256",
				RAM: "8",
				price: 70000
			}
		]
	},
	{
		id: "2",
		date: "12.02.2023",
		totalPrice: 120000,
		products: [
			{
				id: "1",
				productName: "IPHONE 13",
				memory: "128",
				RAM: "8",
				price: 50000
			},
			{
				id: "3",
				productName: "MACBOOK PRO M1",
				memory: "256",
				RAM: "8",
				price: 70000
			}
		]
	}
]


const UserOrders = () => {
	return (
		<div className={styles["user__wrapper"]}>
			<div className={styles["user__orders_wrapper"]}>
				<div className={styles["user__orders_title"]}>
					<h1>Ваши заказы</h1>
				</div>
				<ul className={styles["orders__list"]}>
					{
						orders.map((order) => (
							<Order
								key={order.id}
								order={{
									id: order.id,
									date: order.date,
									totalPrice: order.totalPrice,
									products: order.products,
								}}
							/>
						))
					}
				</ul>
			</div>
		</div>
	)
}

export default UserOrders;