import orderRepositoryMongoDB from "../orderRepositoryMySqlDB.js";
import connectDatabaseMySql from "../../../../../config/dbConnectMysql.js";

jest.mock('../../../../../config/dbConnectMysql.js', () => ({
	beginTransaction: jest.fn(),
  query: jest.fn(),
  rollback: jest.fn(),
  commit: jest.fn(),
}))

describe('orderRepositoryMongoDB', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});
	describe('add', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});
		const orderEntity = {
			getOrderNumber: jest.fn().mockReturnValue('123'),
			getCustomer: jest.fn().mockReturnValue('customer_id'),
			getTotalOrderPrice: jest.fn().mockReturnValue(100),
			getOrderStatus: jest.fn().mockReturnValue('order_status_id'),
			getOrderProductsDescription: jest.fn().mockReturnValue([{ productId: 1, productQuantity: 2 }])
		};
		it('should add a new order to the database', async () => {
			connectDatabaseMySql.beginTransaction.mockImplementation((callback) => callback());
			connectDatabaseMySql.query.mockImplementationOnce((query, values, callback) => callback(null, { insertId: 1 }));
			connectDatabaseMySql.query.mockImplementationOnce((query, values, callback) => callback(null));
			connectDatabaseMySql.commit.mockImplementation((callback) => callback());

			const result = await orderRepositoryMongoDB().add(orderEntity);

			expect(connectDatabaseMySql.query).toHaveBeenCalledTimes(2);
			expect(connectDatabaseMySql.commit).toHaveBeenCalled();
		});

		it('should handle beginTransaction errors', async () => {
			const beginError = new Error('Transaction Error');
			connectDatabaseMySql.beginTransaction.mockImplementation((callback) => callback(beginError));

			await expect(orderRepositoryMongoDB().add(orderEntity)).rejects.toThrow(beginError);
		});

		it('should rollback the transaction if there is an error on insertQuery', async () => {
			const error = new Error('Error');

			connectDatabaseMySql.beginTransaction.mockImplementation((callback) => callback());
			connectDatabaseMySql.query.mockImplementationOnce((query, values, callback) => callback(error));
			connectDatabaseMySql.rollback.mockImplementationOnce(callback => {
				callback(null); // Rollback succeeded
			});
			
			let errorResult;
			try {
				await orderRepositoryMongoDB().add(orderEntity);
			} catch (error) {
				errorResult = error;
			}
			expect(errorResult).toBeInstanceOf(Error);
			expect(connectDatabaseMySql.rollback).toHaveBeenCalled();
		});

		it('should rollback the transaction if there is an error on insertProductQuery', async () => {
			const error = new Error('Error');
			const productError = new Error('Product Error');

			connectDatabaseMySql.beginTransaction.mockImplementation((callback) => callback());
			connectDatabaseMySql.query.mockImplementationOnce((query, values, callback) => callback(null, { insertId: 1 }));
			connectDatabaseMySql.query.mockImplementationOnce((query, values, callback) => callback(productError));
			connectDatabaseMySql.rollback.mockImplementationOnce(callback => callback(error));
			
			let errorResult;
			try {
				await orderRepositoryMongoDB().add(orderEntity);
			} catch (error) {
				errorResult = error;
			}
			expect(errorResult).toBeInstanceOf(Error);
			expect(connectDatabaseMySql.rollback).toHaveBeenCalled();
		});

		it('should rollback the transaction if there is an commitError', async () => {
			const error = new Error('Error');

			connectDatabaseMySql.beginTransaction.mockImplementation((callback) => callback());
			connectDatabaseMySql.query.mockImplementationOnce((query, values, callback) => callback(null, {}));
			connectDatabaseMySql.query.mockImplementationOnce((query, values, callback) => callback(null));
			connectDatabaseMySql.commit.mockImplementationOnce((callback) => callback(error));
			// connectDatabaseMySql.rollback.mockImplementationOnce(callback => callback(error));

			let errorResult;
			try {
				await orderRepositoryMongoDB().add(orderEntity);
			} catch (error) {
				errorResult = error;
			}

			expect(errorResult).toBeInstanceOf(Error);
			expect(connectDatabaseMySql.rollback).toHaveBeenCalled();
		});
	});

	describe('findAll', () => {
		it('should find all orders to the database', async () => {
			connectDatabaseMySql.beginTransaction.mockImplementation((callback) => callback());
			connectDatabaseMySql.query.mockImplementationOnce((query, callback) => callback(null, {}));
			connectDatabaseMySql.query.mockImplementationOnce((query, callback) => callback(null));
			connectDatabaseMySql.commit.mockImplementation((callback) => callback());

			await orderRepositoryMongoDB().findAll();

			expect(connectDatabaseMySql.query).toHaveBeenCalledTimes(1);
			expect(connectDatabaseMySql.commit).toHaveBeenCalled();
		});

		it('should handle beginTransaction errors', async () => {
			const beginError = new Error('Transaction Error');
			connectDatabaseMySql.beginTransaction.mockImplementation((callback) => callback(beginError));

			await expect(orderRepositoryMongoDB().findAll()).rejects.toThrow(beginError);
		});

		it('should rollback the transaction if there is an error on find query', async () => {
			const error = new Error('Error');

			connectDatabaseMySql.beginTransaction.mockImplementation((callback) => callback());
			connectDatabaseMySql.query.mockImplementationOnce((query, callback) => callback(error, {}));
			connectDatabaseMySql.commit.mockImplementation((callback) => callback(error));
			connectDatabaseMySql.rollback.mockImplementationOnce(callback => callback(error));

			
			let errorResult;
			try {
				await orderRepositoryMongoDB().findAll();
			} catch (error) {
				errorResult = error;
			}
			expect(errorResult).toBeInstanceOf(Error);
			expect(connectDatabaseMySql.rollback).toHaveBeenCalled();
		});

		it('should rollback the transaction if there is an commitError', async () => {
			const error = new Error('Error');

			connectDatabaseMySql.beginTransaction.mockImplementation((callback) => callback());
			connectDatabaseMySql.query.mockImplementationOnce((query, callback) => callback(null, {}));
			connectDatabaseMySql.commit.mockImplementationOnce((callback) => callback(error));
			connectDatabaseMySql.rollback.mockImplementationOnce(callback => callback(error));
			
			let errorResult;
			try {
				await orderRepositoryMongoDB().findAll();
			} catch (error) {
				errorResult = error;
			}

			expect(errorResult).toBeInstanceOf(Error);
			expect(connectDatabaseMySql.rollback).toHaveBeenCalled();
		});
	});

	describe('findById', () => {
		const orderRepo = orderRepositoryMongoDB();
		const id = 1;

		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should find order by id', async () => {
			connectDatabaseMySql.beginTransaction.mockImplementation((callback) => callback());
			connectDatabaseMySql.query.mockImplementationOnce((query, values, callback) => callback(null, {}));
			connectDatabaseMySql.commit.mockImplementation((callback) => callback());
			const result = await orderRepo.findById(id);

			expect(result).toEqual({});
		});

		it('should handle beginTransaction errors', async () => {
			const beginError = new Error('Transaction Error');
			connectDatabaseMySql.beginTransaction.mockImplementation((callback) => callback(beginError));

			await expect(orderRepo.findById(id)).rejects.toThrow(beginError);
		});

		it('should rollback the transaction if there is an error on find query', async () => {
			const error = new Error('Error');

			connectDatabaseMySql.beginTransaction.mockImplementation((callback) => callback());
			connectDatabaseMySql.query.mockImplementationOnce((query, values, callback) => callback(error));
			connectDatabaseMySql.commit.mockImplementation((callback) => callback(error));
			connectDatabaseMySql.rollback.mockImplementationOnce(callback => callback(error));

			let errorResult;
			try {
				await orderRepo.findById(id);
			} catch (error) {
				errorResult = error;
			}
			expect(errorResult).toBeInstanceOf(Error);
			expect(connectDatabaseMySql.rollback).toHaveBeenCalled();
		});

		it('should rollback the transaction if there is an commitError', async () => {
			const error = new Error('Error');

			connectDatabaseMySql.beginTransaction.mockImplementation((callback) => callback());
			connectDatabaseMySql.query.mockImplementationOnce((query, values, callback) => callback(null, {}));
			connectDatabaseMySql.commit.mockImplementationOnce((callback) => callback(error));
			connectDatabaseMySql.rollback.mockImplementationOnce(callback => callback(error));

			let errorResult;
			try {
				await orderRepo.findById(id);
			} catch (error) {
				errorResult = error;
			}

			expect(errorResult).toBeInstanceOf(Error);
			expect(connectDatabaseMySql.rollback).toHaveBeenCalled();
		});
	});

	describe('deleteById', () => {
		const orderRepo = orderRepositoryMongoDB();
		const id = 1;

		it('should delete order by id', async () => {
			connectDatabaseMySql.beginTransaction.mockImplementation((callback) => callback());
			connectDatabaseMySql.query.mockImplementationOnce((query, values, callback) => callback(null, {}));
			connectDatabaseMySql.commit.mockImplementation((callback) => callback());
			const result = await orderRepo.deleteById(id);

			expect(result).toEqual({});
		});

		it('should handle beginTransaction errors', async () => {
			const beginError = new Error('Transaction Error');
			connectDatabaseMySql.beginTransaction.mockImplementation((callback) => callback(beginError));

			await expect(orderRepo.deleteById(id)).rejects.toThrow(beginError);
		});

		it('should rollback the transaction if there is an error on delete query', async () => {
			const error = new Error('Error');

			connectDatabaseMySql.beginTransaction.mockImplementation((callback) => callback());
			connectDatabaseMySql.query.mockImplementationOnce((query, values, callback) => callback(error));
			connectDatabaseMySql.commit.mockImplementation((callback) => callback(error));
			connectDatabaseMySql.rollback.mockImplementationOnce(callback => callback(error));

			let errorResult;
			try {
				await orderRepo.deleteById(id);
			} catch (error) {
				errorResult = error;
			}
			expect(errorResult).toBeInstanceOf(Error);
			expect(connectDatabaseMySql.rollback).toHaveBeenCalled();
		});

		it('should rollback the transaction if there is an commitError', async () => {
			const error = new Error('Error');

			connectDatabaseMySql.beginTransaction.mockImplementation((callback) => callback());
			connectDatabaseMySql.query.mockImplementationOnce((query, values, callback) => callback(null, {}));
			connectDatabaseMySql.commit.mockImplementationOnce((callback) => callback(error));
			connectDatabaseMySql.rollback.mockImplementationOnce(callback => callback(error));

			let errorResult;
			try {
				await orderRepo.deleteById(id);
			} catch (error) {
				errorResult = error;
			}

			expect(errorResult).toBeInstanceOf(Error);
			expect(connectDatabaseMySql.rollback).toHaveBeenCalled();
		});
	});

	describe('updateById', () => {
		const orderRepo = orderRepositoryMongoDB();
		const id = 1;
		const orderEntity = {
			getOrderNumber: jest.fn().mockReturnValue('123'),
			getCustomer: jest.fn().mockReturnValue('customer_id'),
			getTotalOrderPrice: jest.fn().mockReturnValue(100),
			getOrderStatus: jest.fn().mockReturnValue('order_status_id'),
			getOrderProductsDescription: jest.fn().mockReturnValue([{ productId: 1, productQuantity: 2 }])
		};
		const statusEntity = {
			getDescription: jest.fn().mockReturnValue('description'),
		};

		it.skip('should update order by id', async () => {
			connectDatabaseMySql.beginTransaction.mockImplementation((callback) => callback());
			connectDatabaseMySql.query.mockImplementationOnce((query, values, callback) => callback(null, {}));
			connectDatabaseMySql.commit.mockImplementation((callback) => callback());
			const result = await orderRepo.updateById(id, orderEntity);

			expect(result).toEqual({});
		});

		it('should handle beginTransaction errors', async () => {
			const beginError = new Error('Transaction Error');
			connectDatabaseMySql.beginTransaction.mockImplementation((callback) => callback(beginError));

			await expect(orderRepo.updateById(id, orderEntity)).rejects.toThrow(beginError);
		});

		it('should rollback the transaction if there is an error on update query', async () => {
			const error = new Error('Error');

			connectDatabaseMySql.beginTransaction.mockImplementation((callback) => callback());
			connectDatabaseMySql.query.mockImplementationOnce((query, values, callback) => callback(error));
			connectDatabaseMySql.commit.mockImplementation((callback) => callback(error));
			connectDatabaseMySql.rollback.mockImplementationOnce(callback => callback(error));

			let errorResult;
			try {
				await orderRepo.updateById(id, orderEntity);
			} catch (error) {
				errorResult = error;
			}
			expect(errorResult).toBeInstanceOf(Error);
			expect(connectDatabaseMySql.rollback).toHaveBeenCalled();
		});

		it('should rollback the transaction if there is an commitError', async () => {
			const error = new Error('Error');

			connectDatabaseMySql.beginTransaction.mockImplementation((callback) => callback());
			connectDatabaseMySql.query.mockImplementationOnce((query, values, callback) => callback(null, {}));
			connectDatabaseMySql.commit.mockImplementationOnce((callback) => callback(error));
			connectDatabaseMySql.rollback.mockImplementationOnce(callback => callback(error));

			let errorResult;
			try {
				await orderRepo.updateById(id, order);
			} catch (error) {
				errorResult = error;
			}

			expect(errorResult).toBeInstanceOf(Error);
		});
	});

	describe('updateStatusById', () => {
		const orderRepo = orderRepositoryMongoDB();
		const id = 1;
		const status = 'status';

		it('should update status by id', async () => {
			connectDatabaseMySql.beginTransaction.mockImplementation((callback) => callback());
			connectDatabaseMySql.query.mockImplementationOnce((query, values, callback) => callback(null, { affectedRows: 1 }));
			connectDatabaseMySql.commit.mockImplementation((callback) => callback());
			const result = await orderRepo.updateStatusById(id, status);

			expect(result).toEqual({
				response: 'Order updated',
				rowUpdate: 1
			});
		});

		it('should not update status by id when Order not found', async () => {
			connectDatabaseMySql.beginTransaction.mockImplementation((callback) => callback());
			connectDatabaseMySql.query.mockImplementationOnce((query, values, callback) => callback(null, { affectedRows: 0 }));
			connectDatabaseMySql.commit.mockImplementation((callback) => callback());
			const result = await orderRepo.updateStatusById(id, status);

			expect(result).toEqual({
				response: 'Order not found',
				rowUpdate: 0
			});
		});

		it('should handle beginTransaction errors', async () => {
			const beginError = new Error('Transaction Error');
			connectDatabaseMySql.beginTransaction.mockImplementation((callback) => callback(beginError));

			await expect(orderRepo.updateStatusById(id, status)).rejects.toThrow(beginError);
		});

		it('should rollback the transaction if there is an error on update query', async () => {
			const error = new Error('Error');

			connectDatabaseMySql.beginTransaction.mockImplementation((callback) => callback());
			connectDatabaseMySql.query.mockImplementationOnce((query, values, callback) => callback(error));
			connectDatabaseMySql.commit.mockImplementation((callback) => callback(error));
			connectDatabaseMySql.rollback.mockImplementationOnce(callback => callback(error));

			let errorResult;
			try {
				await orderRepo.updateStatusById(id, status);
			} catch (error) {
				errorResult = error;
			}
			expect(errorResult).toBeInstanceOf(Error);
			expect(connectDatabaseMySql.rollback).toHaveBeenCalled();
		});

		it('should rollback the transaction if there is an commitError', async () => {
			const error = new Error('Error');

			connectDatabaseMySql.beginTransaction.mockImplementation((callback) => callback());
			connectDatabaseMySql.query.mockImplementationOnce((query, values, callback) => callback(null, {}));
			connectDatabaseMySql.commit.mockImplementationOnce((callback) => callback(error));
			connectDatabaseMySql.rollback.mockImplementationOnce(callback => callback(error));

			let errorResult;
			try {
				await orderRepo.updateStatusById(id, status);
			} catch (error) {
				errorResult = error;
			}

			expect(errorResult).toBeInstanceOf(Error);
		});
	});
});
