import React, { Children } from "react";

const Container = ({ children }) => {
  return <section className="max-w-7xl mx-auto">{children}</section>;
};

export default Container;
