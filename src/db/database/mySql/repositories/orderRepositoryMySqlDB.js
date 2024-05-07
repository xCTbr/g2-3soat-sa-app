import db from '../../../../config/dbConnectMysql.js';

export default function orderRepositoryMongoDB() {
	const add = async (orderEntity) => {
		return new Promise((resolve, reject) => {
			// Begin transaction
			db.beginTransaction((beginError) => {
				if (beginError) {
					return reject(beginError);
				}
				const insertQuery = "INSERT INTO orders (orderNumber, customer_id, totalOrderPrice, orderStatus_id, createdAt) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)";
				const orderProducts = orderEntity.getOrderProductsDescription().map(product => [product.productId, product.productQuantity]);
				db.query(insertQuery, [orderEntity.getOrderNumber(), orderEntity.getCustomer(), orderEntity.getTotalOrderPrice(), orderEntity.getOrderStatus()], (error, result) => {
					if (error) {
						return db.rollback(() => reject(error));
					}
					const orderId = result.insertId;
					const insertProductQuery = "INSERT INTO orderProductsdescription (orderId, productId, productQuantity) VALUES ?";
					db.query(insertProductQuery, [orderProducts.map(product => [orderId, ...product])], (productError) => {
						if (productError) {
							return db.rollback(() => reject(productError));
						}
						db.commit((commitError) => {
							if (commitError) {
								return db.rollback(() => reject(commitError));
							}
							resolve({ orderId, ...orderEntity });
						});
					});
				});
			});
		});
	};

	const findAll = async (params) => {
		return new Promise((resolve, reject) => {
			db.beginTransaction((beginError) => {
				if (beginError) {
					return reject(beginError);
				}
				const select = "SELECT * FROM orders order by 1 asc";
				db.query(select, (queryError, result) => {
					if (queryError) {
						return db.rollback(() => reject(queryError));
					}
					db.commit((commitError) => {
						if (commitError) {
							return db.rollback(() => reject(commitError));
						}
						resolve(result);
					});
				});
			});
		});
	};
    
	const findById = async (id) => {
		return new Promise((resolve, reject) => {
			// Begin transaction
			db.beginTransaction((beginError) => {
				if (beginError) {
					return reject(beginError);
				}
	
				const select = "SELECT * FROM orders WHERE id = ?";
				db.query(select, [id], (queryError, result) => {
					if (queryError) {
						// Rollback the transaction if there is an error
						return db.rollback(() => reject(queryError));
					}
	
					// Commit the transaction and close the connection
					db.commit((commitError) => {
						if (commitError) {
							// Rollback the transaction if there is an error during commit
							return db.rollback(() => reject(commitError));
						}
	
						// Resolve with the query result
						resolve(result);
					});
				});
			});
		});
	};

	const deleteById = async (id) => {
		return new Promise((resolve, reject) => {
			// Begin transaction
			db.beginTransaction((beginError) => {
				if (beginError) {
					return reject(beginError);
				}
	
				const select = "DELETE FROM ordersproductsdescription WHERE orderId = ?; DELETE FROM orders WHERE id = ?";
				db.query(select, [id, id], (queryError, result) => {
					if (queryError) {
						// Rollback the transaction if there is an error
						return db.rollback(() => reject(queryError));
					}
	
					// Commit the transaction and close the connection
					db.commit((commitError) => {
						if (commitError) {
							// Rollback the transaction if there is an error during commit
							return db.rollback(() => reject(commitError));
						}
						// Resolve with the query result
						resolve(result);
					});
				});
			});
		});
	};

	const updateById = async (id, orderEntity) => {
		return new Promise((resolve, reject) => {
			// Begin transaction
			db.beginTransaction((beginError) => {
				if (beginError) {
					return reject(beginError);
				}
	
				const updateQuery = "UPDATE orders SET orderNumber=?, customer_id=?, totalOrderPrice=?, orderStatus_id, updatedAt=CURRENT_TIMESTAMP WHERE id=?";
				db.query(updateQuery, [ orderEntity.getOrderNumber(), orderEntity.getCustomer(),orderEntity.getTotalOrderPrice(), orderEntity.getOrderStatus(), id], (error, result) => {
					if (error) {
						// Rollback the transaction if there is an error
						return db.rollback(() => reject(error));
					}
	
					// Commit the transaction and close the connection
					db.commit((commitError) => {
						if (commitError) {
							// Rollback the transaction if there is an error during commit
							return db.rollback(() => reject(commitError));
						}
	
						//const nameStatus = statusEntity.getStatusName();
						const description = statusEntity.getDescription();
						const rowUpdate = result.affectedRows;
						let retorno = "Status Order updated";
	
						if (rowUpdate === 0) {
							retorno = "Status Order not found";
							return resolve({ retorno, rowUpdate });
						}
	
						return resolve({ response: retorno, rowUpdate, "Description": description });
					});
				});
			});
		});
	};

	const updateStatusById = async (id, status) => {
		return new Promise((resolve, reject) => {
			// Begin transaction
			db.beginTransaction((beginError) => {
				if (beginError) {
					return reject(beginError);
				}
	
				const updateQuery = "UPDATE orders SET orderStatus_id=?, updatedAt=CURRENT_TIMESTAMP WHERE id=?";
				db.query(updateQuery, [status, id], (error, result) => {
					if (error) {
						// Rollback the transaction if there is an error
						return db.rollback(() => reject(error));
					}
	
					// Commit the transaction and close the connection
					db.commit((commitError) => {
						if (commitError) {
							// Rollback the transaction if there is an error during commit
							return db.rollback(() => reject(commitError));
						}
	
						const rowUpdate = result.affectedRows;
						let retorno = "Order updated";
	
						if (rowUpdate === 0) {
							retorno = "Order not found";
							return resolve({ response: retorno, rowUpdate });
						}
	
						return resolve({ response: retorno, rowUpdate });
					});
				});
			});
		});
	};

	return {
		add,
		findById,
		findAll,
		updateById,
		deleteById,
		updateStatusById		
	}
}
