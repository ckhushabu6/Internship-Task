import { useParams } from "react-router-dom"
import products from "../data/products"

function ProductDetails() {
  const { id } = useParams()

  const product = products.find((p) => p.id === Number(id))

  return (
    <div>
      <img src={product.image} width="300" />
      <h1>{product.name}</h1>
      <h2>{product.price}</h2>
      <button>Add To Cart</button>
    </div>
  )
}

export default ProductDetails