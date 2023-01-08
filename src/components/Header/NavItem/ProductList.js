import React from "react";

import classes from "./ProductList.module.css";

function ProductList(props) {
  const SubCategoryList = props.subCat.map((prod) => {
    return (
      <div className={classes.SubCategory} key={prod}>
        {prod}
      </div>
    );
  });

  return <div className={classes.ProductList}>{SubCategoryList}</div>;
}

export default ProductList;
