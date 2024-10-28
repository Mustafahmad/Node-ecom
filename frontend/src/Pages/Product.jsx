import React, { useContext, useEffect, useState } from "react";
import Breadcrums from "../Components/Breadcrums/Breadcrums";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

const Product = () => {
  const { products } = useContext(ShopContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(false);
  console.log("Product.js", products, productId);
  useEffect(() => {
    setProduct(products.find((e) => e._id === productId));
  }, [products, productId]);

  console.log("Product.js", product);
  return product ? (
    <div>
      <Breadcrums product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox product={product} />
      <RelatedProducts id={product._id} category={product.category} />
    </div>
  ) : null;
};

export default Product;
