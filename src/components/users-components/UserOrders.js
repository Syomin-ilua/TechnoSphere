import React, { useEffect } from 'react';
import styles from "./UserOrders.module.css";
import Order from '../basket-components/Order';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../store/orders-slice';
import Loader from '../UI-components/Loader';

const now = new Date();

const date = new Intl.DateTimeFormat("ru", {
	day: "numeric",
	month: "short",
	year: "numeric",
	hour: "numeric",
	minute: "numeric",
	second: "numeric"
});

const UserOrders = () => {

	const dispatchAction = useDispatch();
	const userId = useSelector((state) => state.user.user.id);

	const { orders, status, error } = useSelector((state) => state.orders);

	useEffect(() => {
		dispatchAction(getOrders(userId));
	}, []);

	return (
		<div className={styles["user__wrapper"]}>
			<div className={styles["user__orders_wrapper"]}>
				<div className={styles["user__orders_title"]}>
					<h1>Ваши заказы</h1>
				</div>
				<div className={styles["orders__wrapper"]}>
					{status === "loading" && <Loader />}
					{error && error}
					{status === "resolved" && orders.length === 0 ?
						<div className={styles["orders__empty"]}>
							<p>У вас пока нет никаких заказов</p>
						</div> :
						<ul className={styles["orders__list"]}>
							{
								orders.map((order) => (
									<Order
										key={order.id}
										order={{
											id: order.id,
											date: order.date.format(now),
											totalPrice: order.totalPrice,
											products: order.products,
										}}
									/>
								))
							}
						</ul>
					}
				</div>
			</div>
		</div>
	)
}

export default UserOrders;