import categoryController from '../categoryController.js';
//import category from '../../entities/Category.js';
//import useCaseCreate from '../../use_cases/category/add.js';
/*import useCasegetAll from '../../use_cases/category/getAll.js';
import useCaseFindById from '../../use_cases/category/findById.js';
import useCasedelete from '../../use_cases/category/deleteById.js';
import useCaseUpdateById from '../../use_cases/category/updateById.js';
import categoryRepositoryMySqlDB from '../../db/database/mySql/repositories/categoryRepositoryMySqlDB.js';
import db from '../../config/dbConnectMysql.js';*/
import categoryGateway from '../../application/categoryGateway.js';
import categoryRepositoryMySqlDB from '../../db/database/mySql/repositories/categoryRepositoryMySqlDB.js';



/*jest.mock('../../use_cases/category/add.js');
jest.mock('../../use_cases/category/getAll.js');
jest.mock('../../use_cases/category/findById.js');
jest.mock('../../use_cases/category/deleteById.js');
jest.mock('../../use_cases/category/updateById.js');
jest.mock('../../application/categoryGateway.js');
jest.mock('../../db/database/mySql/repositories/categoryRepositoryMySqlDB.js');
jest.mock('../../config/dbConnectMysql.js');

jest.useFakeTimers();

describe('Category Controller', () => {

	const req = { body: { categoryName: 'it Category', description: 'it Description' } };
	const res = {
		status: jest.fn().mockReturnThis(),
		json: jest.fn()
	};
	const next = jest.fn();
	
	afterEach(() => {
	  jest.clearAllMocks();
	});
  
	it('addNewCategory', async () => {
	  const categoryControllerInstance = categoryController();
	  const categoryName = 'it Category';
	  const description = 'it Description';
	  
	  const expectedResponse = { id: 1, categoryName, description};
  
	  useCaseCreate.mockResolvedValue(expectedResponse);
  
	  await categoryControllerInstance.addNewCategory(req, res, next);
  
	  expect(useCaseCreate).toHaveBeenCalledWith(categoryName, description, expect.any(String), expect.any(String));
	  expect(res.json).toHaveBeenCalledWith(expectedResponse);
	});
  */
	/*it('fetchAllCategory', async () => {
	  const categoryControllerInstance = categoryController();
	  const expectedCategories = [{ id: 1, categoryName: 'Category 1', description: 'Description 1' }];
  
	  useCasegetAll.mockResolvedValue(expectedCategories);
  
	  await categoryControllerInstance.fetchAllCategory(req, res, next);
  
	  expect(useCasegetAll).toHaveBeenCalled();
	  expect(res.json).toHaveBeenCalledWith(expectedCategories);
	});
  
	it('fetchCategoryById', async () => {
	  const categoryControllerInstance = categoryController();
	  const categoryId = '1';
	  const expectedCategory = { id: categoryId, categoryName: 'it Category', description: 'it Description' };
  
	  useCaseFindById.mockResolvedValue(expectedCategory);
  
	  await categoryControllerInstance.fetchCategoryById({ params: { id: categoryId } }, res, next);
  
	  expect(useCaseFindById).toHaveBeenCalledWith(categoryId);
	  expect(res.json).toHaveBeenCalledWith(expectedCategory);
	});
  
	it('updateCategoryById', async () => {
	  const categoryControllerInstance = categoryController();
	  const categoryId = '1';
	  const categoryName = 'Updated Category';
	  const description = 'Updated Description';
	  const expectedMessage = 'Category updated successfully';
  
	  useCaseUpdateById.mockResolvedValue(expectedMessage);
  
	  const req = { params: { id: categoryId }, body: { categoryName, description } };
  
	  await categoryControllerInstance.updateCategoryById(req, res, next);
  
	  expect(useCaseUpdateById).toHaveBeenCalledWith(categoryId, categoryName, description, expect.any(Date));
	  expect(res.json).toHaveBeenCalledWith(expectedMessage);
	});
  
	it('deleteCategoryById', async () => {
	  const categoryControllerInstance = categoryController();
	  const categoryId = '1';
	  const expectedMessage = 'Category successfully deleted!';
  
	  useCasedelete.mockResolvedValue();
  
	  await categoryControllerInstance.deleteCategoryById({ params: { id: categoryId } }, res, next);
  
	  expect(useCasedelete).toHaveBeenCalledWith(categoryId);
	  expect(res.json).toHaveBeenCalledWith(expectedMessage);
	});*/
  //});


  // Import the categoryController function

  // Mock the use case modules
  jest.mock('../../use_cases/category/add.js');
  jest.mock('../../application/categoryGateway.js');
  jest.mock('../../db/database/mySql/repositories/categoryRepositoryMySqlDB.js');
  
  
  /*jest.mock('../../use_cases/category/getAll.js');
  jest.mock('../../use_cases/category/findById.js');
  jest.mock('../../use_cases/category/deleteById.js');
  jest.mock('../../use_cases/category/updateById.js');*/
  
  describe('categoryController', () => {
	let req, res, next;
  
	beforeEach(() => {
	  // Mock req, res, and next objects
	  req = { body: {categoryName: 'Test', description: 'Test Description' }, params: {} };
	  res = { status: 201,
	  json: jest.fn() };
	  next = jest.fn() ;
	});
  
	afterEach(() => {
	  jest.clearAllMocks(); // Clear all mocks after each test
	});
  
	describe('addNewCategory', () => {
	  it('should create a new category and return 201 status code', async () => {
		// Mock the useCaseCreate function to resolve with a category
		//const useCaseCreateMock = jest.fn().mockResolvedValueOnce({ id: 1, categoryName: 'Test', description: 'Test Description' });
  
		const useCaseCreateMock = jest.fn().mockResolvedValue({
			"Category added": 1, // Example insertId
			"Category": "Test Category", // Example nameCategory
			"Description": "Test Description" // Example description
		  });

		  /*categoryRepositoryMySqlDB().add().mockResolvedValueOnce({
			"Category added": 1, // Example insertId
			"Category": "Test Category", // Example nameCategory
			"Description": "Test Description" // Example description
		  });*/
		  /*categoryGateway().add.mockResolvedValueOnce({
			"Category added": 1, // Example insertId
			"Category": "Test Category", // Example nameCategory
			"Description": "Test Description" // Example description
		  });*/

		// Call addNewCategory with mock dependencies
		await categoryController().addNewCategory(req, res.status, next);
		//console.log(a);
		// Verify that the response status is 201 and JSON data is sent
		//expect(useCaseCreate.createCategory).toHaveBeenCalledTimes(1);
		expect(categoryRepositoryMySqlDB().add).toHaveBeenCalledWith({ id: 1, categoryName: 'Test', description: 'Test Description' });
		expect(res.status).toHaveBeenCalledWith(201);
		expect(res.json).toHaveBeenCalledWith({
			"Category added": 1,
			"Category": "Test Category",
			"Description": "Test Description"
		  });
		expect(next).not.toHaveBeenCalled();
	  });
  
	  /*test('should handle error if useCaseCreate fails', async () => {
		// Mock the useCaseCreate function to reject with an error
		const useCaseCreateMock = jest.fn().mockRejectedValueOnce(new Error('Test Error'));
  
		// Call addNewCategory with mock dependencies
		await categoryController().addNewCategory(req, res, next, useCaseCreateMock);
  
		// Verify that the error message is sent with a 400 status code
		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ error: 'Test Error - Category creation failed' });
		expect(next).not.toHaveBeenCalled();
	  });*/
	});
  
	// Write similar tests for fetchAllCategory, fetchCategoryById, updateCategoryById, and deleteCategoryById
  });
  