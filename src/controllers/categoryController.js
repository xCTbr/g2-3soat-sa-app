import useCaseCreate from '../use_cases/category/add.js'
import useCasegetAll from '../use_cases/category/getAll.js'
import useCaseFindById from '../use_cases/category/findById.js';
import useCasedelete from '../use_cases/category/deleteById.js'
import useCaseUpdateById from '../use_cases/category/updateById.js';

export default function categoryController() {
  
	const addNewCategory = async (req, res, next) => {
    try{
    const { categoryName, description } = req.body;

    await useCaseCreate(
			categoryName,
      description,
      Date(),
      Date()
    ).then((category) => {
      res.status(201).json(category);
    });//.catch((error) => res.status(400).json(error.message));
      //; res.status(201).json(category);
    }catch(error){
      res.status(400).json(error.message);
      next(error);
    }
    /*.then((category) => res.status(201).json(category))
    .catch((error) => res.status(400).json('Category creation failed'));*/
    //.catch((error) => res.status(400).json(next(`${error.message} - Category creation failed`)));
    //.catch((error) => next(error));
    /*.catch((error) => {
        // Send error response with status code 400 and error message
        res.status(400).json({ error: `${error.message} - Category creation failed` });
    });*/
  };

  const fetchCategoryById = async (req, res, next) => {
    try{
    await useCaseFindById(req.params.id)
      .then((category) => {
       
        if (!category || category.length === 0) {
          res.status(400).json('No category found');
        }else{
          res.status(200).json(category);
        }
        
      });}catch(error){
        res.status(400).json(error.message);
        next(error);
      }
      //.catch((error) => next(error));
  };

  const fetchAllCategory = async (req, res, next) => {
  try{
   await useCasegetAll()
      .then((category) => {
        if (!category) {
          res.status(400).json(`No category found`);
        }
        res.status(200).json(category);
      })}catch(error){
        res.status(400).json(error.message);
        next(error);
      }
      //.catch((error) => res.status(400).json(next(`${error.message} - Category list failed`)));
      //.catch((error) => next(error));
  };

  const deleteCategoryById = async (req, res, next) => {
    try{
   await useCasedelete(req.params.id)
      /*.then(() => res.json('Category sucessfully deleted!'))
      .catch((error) => next(error));*/
      .then((message) => {
        const resultado = message.rowUpdate;
        if (resultado === 0) {
            res.status(400).json('No category found');
        }else{
          res.status(200).json('Category deleted');
        }
    })
    /*.then((message) => {
        // Send response
        res.status(204).json(message);
    })*/
    //.catch(next); // Pass any errors to the error handling middleware
    //.catch((error) => res.status(400).json(next(`${error.message} - Category delete failed`)));
    }catch(error){
      res.status(400).json(error.message);
      next(error);
    }
  };
  
  const updateCategoryById  = async (req, res, next) => {
    try{
    const {categoryName, description} = req.body;

   await useCaseUpdateById(
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
            res.status(400).json('No category found');
        }else{
          res.status(200).json('Category Updated');
        }
    });}catch(error){
      res.status(400).json(error.message);
      next(error);
    }
    /*.then((message) => {
        // Send response
        res.status(200).json(message);
    })
    .catch((error) => next(error));*/
    //.catch(next); // Pass any errors to the error handling middleware
    //.catch((error) => res.json(next(`${error.message} - Category updated failed`)));
  };
  
  return {
		addNewCategory,
    fetchAllCategory,
    fetchCategoryById,
    updateCategoryById,
    deleteCategoryById
  };
}