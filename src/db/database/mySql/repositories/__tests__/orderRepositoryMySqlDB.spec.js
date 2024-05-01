import orderRepositoryMongoDB from "../orderRepositoryMySqlDB.js";
import connectDatabaseMySql from "../../../../../config/dbConnectMysql.js";

jest.mock('../../../../../config/dbConnectMysql.js', () => ({
	beginTransaction: jest.fn(),
  query: jest.fn(),
  rollback: jest.fn(),
  commit: jest.fn()
}))

describe('orderRepositoryMongoDB', () => {
  afterEach(() => {
    // Clear all mocks after each test
    jest.clearAllMocks();
  });

	describe('add', () => {
		it('should add a new order to the database', async () => {
			// Mock successful database transaction
			connectDatabaseMySql.beginTransaction.mockImplementation((callback) => callback());
			connectDatabaseMySql.query.mockImplementationOnce((query, values, callback) => callback(null, { insertId: 1 }));
			connectDatabaseMySql.query.mockImplementationOnce((query, values, callback) => callback(null));
			connectDatabaseMySql.commit.mockImplementation((callback) => callback());
			// Mock data for testing
			const orderEntity = {
				getOrderNumber: jest.fn().mockReturnValue('123'),
				getCustomer: jest.fn().mockReturnValue('customer_id'),
				getTotalOrderPrice: jest.fn().mockReturnValue(100),
				getOrderStatus: jest.fn().mockReturnValue('order_status_id'),
				getOrderProductsDescription: jest.fn().mockReturnValue([{ productId: 1, productQuantity: 2 }])
			};
	
			// Call the add function
			const result = await orderRepositoryMongoDB().add(orderEntity);
	
			// Assertions
			expect(connectDatabaseMySql.query).toHaveBeenCalledTimes(2);
			expect(connectDatabaseMySql.commit).toHaveBeenCalled();
		});
	});
});
