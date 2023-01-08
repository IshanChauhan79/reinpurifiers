import React, { useState } from "react";
// import { useLocation, useParams } from "react-router";
import { ReactComponent as Search } from "../../assets/images/search.svg";
import { ReactComponent as Bar } from "../../assets/images/bars.svg";

import classes from "./Header.module.css";
import products, { support } from "../../data/products";

import Logo from "../Logo/Logo";
import NavItem from "./NavItem/NavItem";
import BarsMenu from "./BarsMenu/BarsMenu";
import Product from "./Product/Product";

// const mapBuyLink = {
//   'undersink1':'/buynow/underink',
//   "wallmountable": "/buynow/wallMounted"
// }

function Header(props) {
  const [showDropMenu, setDropMenu] = useState(false);
  const [showBackDrop, setBackDrop] = useState(false);
  const [delayHandler, setDelayHandler] = useState(null);

  const [showBarsMenu, setBarsMenu] = useState(false);

  // const params = useParams();
  // const location = useLocation();
  // console.log('loc', location);
  // console.log(params);

  const barMenuClicked = () => {
    setBarsMenu(true);
    // const html = document.querySelector("html");
    const body = document.querySelector("body");
    body.style.overflow = "hidden";
  };
  const closeBarsMenu = () => {
    setBarsMenu(false);
    const body = document.querySelector("body");
    body.style.overflow = "auto";
  };

  const mouseEnterNav = (e, nav) => {
    if (!showBackDrop) {
      setDelayHandler(
        setTimeout(() => {
          setBackDrop(true);
          setTimeout(() => {
            setDropMenu(nav);
          }, 200);
        }, 200)
      );
      return;
    }
    setDelayHandler(
      setTimeout(() => {
        setDropMenu(nav);
      }, 200)
    );
  };

  const mouseLeaveNav = (e) => {
    clearTimeout(delayHandler);
    setDropMenu(false);
  };
  const backdropMouseLeave = (e) => {
    setTimeout(() => {
      setBackDrop(false);
      setDropMenu(false);
    }, 200);
  };

  const navList = products.map((item) => {
    return (
      <NavItem
        data={item}
        key={item.title}
        mouseEnter={mouseEnterNav}
        mouseLeave={mouseLeaveNav}
        show={showDropMenu}
      ></NavItem>
    );
  });
  const supportElement = (
    <NavItem
      data={support}
      mouseEnter={mouseEnterNav}
      mouseLeave={mouseLeaveNav}
      show={showDropMenu}
    />
  );
  return (
    <header className={classes.Header}>
      <div className={classes.HeaderListDiv}>
        <div className={classes.HeaderList}>
          <Logo />
          <div style={{ width: '20px' }} />
          <div
            className={classes.Navigation}
            onMouseLeave={(e) => backdropMouseLeave(e)}
          >
            {navList}
            <div
              className={classes.NavHoverOpen}
              style={{
                maxHeight: showBackDrop ? "70vh" : "0",
                visibility: showBackDrop ? "visible" : "hidden",
              }}
            ></div>
          </div>
        </div>
        <div className={classes.HeaderList}>
          <div
            className={classes.Navigation}
            onMouseLeave={(e) => backdropMouseLeave(e)}
          >
            {supportElement}
            <div
              className={classes.NavHoverOpen}
              style={{
                maxHeight: showBackDrop ? "70vh" : "0",
                visibility: showBackDrop ? "visible" : "hidden",
              }}
            ></div>
          </div>

          <div className={classes.Search}>
            <Search />
          </div>
          <div className={classes.Bars} onClick={barMenuClicked}>
            <Bar />
          </div>
        </div>
        {showBarsMenu && (
          <div className={classes.BarsBackdrop} onClick={closeBarsMenu}></div>
        )}
        <BarsMenu show={showBarsMenu} closed={closeBarsMenu} />

        {showBackDrop && <div className={classes.Backdrop}></div>}
      </div>
      {props.nav ? <Product data={props.nav} params={props.params} /> : null}
    </header>
  );
}

export default Header;
