import useCaseCreate from '../use_cases/category/add.js'
import useCasegetAll from '../use_cases/category/getAll.js'
import useCaseFindById from '../use_cases/category/findById.js';
import useCasedelete from '../use_cases/category/deleteById.js'
import useCaseUpdateById from '../use_cases/category/updateById.js';

export default function categoryController() {
  
	const addNewCategory = (req, res, next) => {
    const { categoryName, description } = req.body;

    useCaseCreate(
			categoryName,
      description,
      Date(),
      Date()
    )
    .then((category) => res.status(201).json(category))
    .catch((error) => res.status(400).json(next(`${error.message} - Category creation failed`)));
  };

  const fetchCategoryById = (req, res, next) => {
    useCaseFindById(req.params.id)
      .then((category) => {
        if (!category) {
          res.json(`No category found with id: ${req.params.id}`);
        }
        res.json(category);
      })
      .catch((error) => next(error));
  };

  const fetchAllCategory = (req, res, next) => {
    useCasegetAll()
      .then((category) => {
        if (!category) {
          res.json(`No category found`);
        }
        res.json(category);
      })
      //.catch((error) => res.status(400).json(next(`${error.message} - Category list failed`)));
      //.catch((error) => next(error));
      .catch((error) => res.json('Falha'));
  };

  const deleteCategoryById = (req, res, next) => {
    useCasedelete(req.params.id)
      /*.then(() => res.json('Category sucessfully deleted!'))
      .catch((error) => next(error));*/
      .then((message) => {
        const resultado = message.rowUpdate;
        if (resultado === 0) {
            res.status(400).json(message);
        }
    })
    .then((message) => {
        // Send response
        res.status(204).json(message);
    })
    //.catch(next); // Pass any errors to the error handling middleware
    .catch((error) => res.status(400).json(next(`${error.message} - Category delete failed`)));
  };
  
  const updateCategoryById = (req, res, next) => {
    const {categoryName, description} = req.body;

    useCaseUpdateById(
      req.params.id,
      categoryName,
      description,
      Date()
    )
      /*.then((message) => (
        res.json(message)))
      .catch((error) => next(error));*/
      .then((message) => {
        const resultado = message.rowUpdate;
        if (resultado === 0) {
            res.status(204).json(message);
        }
    })
    .then((message) => {
        // Send response
        res.status(200).json(message);
    })
    //.catch(next); // Pass any errors to the error handling middleware
    .catch((error) => res.status(400).json(next(`${error.message} - Category updated failed`)));
  };
  
  return {
		addNewCategory,
    fetchAllCategory,
    fetchCategoryById,
    updateCategoryById,
    deleteCategoryById
  };
}