import React, { useState } from "react";
import arrow from "../../../assets/images/arrowRight.png";
import ProductList from "./ProductList.js";
import { Link } from "react-router-dom";

import classes from "./ProductDetails.module.css";

function ProductDetails(props) {
  const types = props.data.types;
  const [showProductsList, setShowProductList] = useState(types[0].name);
  const subCategoryData =
    showProductsList && types.findIndex((el) => el.name === showProductsList);
  var ProductLists = null;
  if (showProductsList) {
    ProductLists = <ProductList subCat={types[subCategoryData].cate} />;
  }

  const mouseEnterProduct = (e, productName) => {
    setShowProductList(productName);
  };

  const ProductCategoryList = types.map((pc) => {
    return (
      <div
        key={pc.name}
        className={classes.Category}
        onMouseEnter={(e) => mouseEnterProduct(e, pc.name)}
      >
        {pc.link
          ? <Link to={pc.link}>
            <div
              className={classes.CategoryName}
              style={{
                color:
                  pc.name === showProductsList
                    ? "var(--clr-wb-900)"
                    : "var(--clr-wb-400)",
                fontSize: pc.name === showProductsList ? "1.8rem" : "1.7rem",
              }}
            >
              {pc.name}
            </div>
          </Link>
          :
          <div
            className={classes.CategoryName}
            style={{
              color:
                pc.name === showProductsList
                  ? "var(--clr-wb-900)"
                  : "var(--clr-wb-400)",
              fontSize: pc.name === showProductsList ? "1.8rem" : "1.7rem",
            }}
          >
            {pc.name}
          </div>
        }
        {pc.cate.length > 0 && (
          <div
            className={classes.Arrow}
            style={{
              opacity: pc.name === showProductsList ? 1 : 0,
              color:
                pc.name === showProductsList
                  ? "var(--clr-wb-900)"
                  : "var(--clr-wb-400)",
            }}
          >
            <img src={arrow} alt=">"></img>
          </div>
        )}
      </div>
    );
  });
  return (
    <div className={classes.ProductDetails}>
      {props.data.id ? (
        <Link to={"/products/" + props.data.route}>
          <div className={classes.Title}>{props.data.title}</div>
        </Link>
      ) : (
        <div className={classes.Title}>{props.data.title}</div>
      )}

      <div className={classes.ProductContainer}>
        {ProductCategoryList}
        {ProductLists}
      </div>
    </div>
  );
}

export default ProductDetails;
