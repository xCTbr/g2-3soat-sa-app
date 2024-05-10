import categoryGateway from "../../application/categoryGateway.js";

export default function findById(id) {
    return categoryGateway().findById(id);
  }
  