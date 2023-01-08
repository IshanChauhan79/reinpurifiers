import React from "react";
import { Link } from "react-router-dom";

import classes from "./Product.module.css";

function Product({ data, params }) {
    return (
        <div className={classes.Product}>
            <div className={classes.TitleRow}>
                <h2 className={classes.Title}>
                    {data.title}
                </h2>
                <div className={classes.ButtonDiv}>
                    <button className={classes.VarientButton}>VARIANTS</button>
                    {data.link
                        ? <Link to={data.link}>
                            <button className={classes.BuyButton}>BUY NOW</button>
                        </Link>
                        :
                        <Link to={`/buynow/${params}`}>
                         <button className={classes.BuyButton}>BUY NOW</button>

                        </Link>
                    }
                </div>
            </div>
            <div className={classes.CategoryRow}>
            </div>
        </div>
    );
}

export default Product;
