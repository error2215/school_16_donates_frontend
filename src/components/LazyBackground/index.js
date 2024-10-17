import React, { useState, useEffect } from "react";
import LazyLoad from "react-lazyload";
import PropTypes from "prop-types";

function LazyBackground({ className, style, src }) {
  console.log("src", src);
  return (
    <div
      className={className}
      style={{
        ...style,
        backgroundImage: `url(${src})`,
      }}
    ></div>
  );
}

export default LazyBackground;
