import React, { useState } from "react";
import { useHistory } from "react-router";
// import { Link } from "react-router-dom";
import CSSTransition from "react-transition-group/CSSTransition";

import DropDown from "../../UI/DropDown/DropDown";

import close from "../../../assets/images/close.png";
import arrowRight from "../../../assets/images/arrowRight.png";
import arrowLeft from "../../../assets/images/arrowLeft.png";
import horizontalTransition from "./horizontalTransition.module.css";
import secondaryHorizontalTransition from "./secondaryHorizontalTransition.module.css";

import products, { support } from "../../../data/products";

import classes from "./BarsMenu.module.css";
import Social from "../../UI/Social/Social";

function BarsMenu(props) {
  const history = useHistory();
  const [menuSelected, setMenuSelected] = useState("");
  const [sideMenu, setSideMenu] = useState("");
  // const nodeRef = useRef(null);
  // const nodeRef2 = useRef(null);

  const data = [...products, support];
  const closeClicked = () => {
    setMenuSelected("");
    props.closed();
  };
  const menuclicked = (el) => {
    setMenuSelected(el);
    setSideMenu(el);
  };
  const backClicked = () => {
    setMenuSelected("");
  };

  const openPage = (link, thirdpage = false) => {
    setMenuSelected("");
    props.closed();
    if (thirdpage) {
      history.push(link);
    } else {
      history.push("/products/" + link);
    }
  };
  const productList = data.map((pd, i) => (
    <div className={classes.MenuType} key={pd.title}>
      {pd.route ? (
        <div onClick={() => openPage(pd.route)}>{pd.title}</div>
      ) : (
        // <Link to={"/products/" + pd.route}></Link>
        <div>{pd.title}</div>
      )}
      <img
        src={arrowRight}
        alt=">"
        height="12px"
        onClick={() => menuclicked(i)}
      ></img>
    </div>
  ));
  let menuSelctedElement = null;
  if (sideMenu !== "") {
    menuSelctedElement = (
      <div className={classes.Menu}>
        <div className={classes.Back} onClick={backClicked}>
          <img src={arrowLeft} alt="<" height="24px"></img>
        </div>
        <div>
          <div className={classes.Title}>{data[sideMenu].title}</div>
          <DropDown data={data[sideMenu]["types"]} openPage={openPage} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={classes.BarsMenu}
      style={{
        right: props.show ? "0" : "-100%",
        visibility: props.show ? "visible" : "hidden",
      }}
    >
      <div className={classes.Close}>
        <img src={close} alt="X" onClick={closeClicked}></img>
      </div>
      <CSSTransition
        in={menuSelected === ""}
        // nodeRef={nodeRef}
        mountOnEnter
        unmountOnExit
        timeout={500}
        classNames={horizontalTransition}
      >
        {(state) => <div className={classes.Menu}>{productList}</div>}
      </CSSTransition>
      <CSSTransition
        // nodeRef={nodeRef2}
        in={menuSelected !== ""}
        mountOnEnter
        unmountOnExit
        timeout={500}
        classNames={secondaryHorizontalTransition}
      >
        {(state) => menuSelctedElement}
      </CSSTransition>
      <div className={classes.Social}>
        <Social />
      </div>

      {/* {menuSelected === null ? productList : menuSelctedElement} */}
    </div>
  );
}

export default BarsMenu;
