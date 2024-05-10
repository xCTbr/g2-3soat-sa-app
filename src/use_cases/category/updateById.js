import category from "../../entities/Category.js";
import categoryGateway from "../../application/categoryGateway.js";

//const gateway = categoryGateway();

export default function updateCategoryById(
    id,
    categoryName,
    description,
    updatedAt
) {
    
  // validate
  if (!categoryName || !description) {
    return Promise.resolve('Category name and Description fields are mandatory');
  }
  const updatedCategory = category(
    categoryName,
    description,
    updatedAt
  );

  return  categoryGateway().updateById(id, updatedCategory);

  /*return gateway.findById(id).then((foundCategory) => {
    if (!foundCategory) {
      //throw new Error(`No customer found with id: ${id}`);
      return Promise.resolve(`No category found with id: ${id}`);
    }
    return gateway.updateById(id, updatedCategory);
  });*/
}
