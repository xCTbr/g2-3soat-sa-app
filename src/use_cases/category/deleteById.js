import categoryGateway from "../../application/categoryGateway.js";

export default function deleteById(id) {
  return categoryGateway().deleteById(id);
  }