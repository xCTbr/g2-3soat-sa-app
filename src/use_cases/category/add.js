import category from "../../entities/Category.js";
import categoryGateway from "../../application/categoryGateway.js";

//const gateway = categoryGateway();

export default function createCategory(
    categoryName,
    description,
    createdAt,
    updatedAt
){
    if (!categoryName || !description) {
      return Promise.resolve(`Category Name and Description fields cannot be empty`);
    }
    
    return categoryGateway().add(category(categoryName, description, createdAt, updatedAt));
}