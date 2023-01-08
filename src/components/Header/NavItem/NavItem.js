import React from "react";

import classes from "./NavItem.module.css";
import ProductDetails from "./ProductDetails";
import SideImage from "./SideImage";
import { Link } from "react-router-dom";

function NavItem(props) {
  return (
    <div
      className={classes.Nav}
      onMouseLeave={(e) => props.mouseLeave(e)}
      onMouseEnter={(e) => props.mouseEnter(e, props.data.title)}
    >
      <div className={classes.NavItem}>
        {props.data.id ? (
          <Link to={"/products/" + props.data.route}>
            <div>{props.data.title}</div>
          </Link>
        ) : (
          <div>{props.data.title}</div>
        )}

        {props.show === props.data.title && (
          <div className={classes.NavSlideDown}>
            <ProductDetails data={props.data} />
            <SideImage type={props.data.title} img={props.data.navImg} />
          </div>
        )}
      </div>
    </div>
  );
}

export default NavItem;
