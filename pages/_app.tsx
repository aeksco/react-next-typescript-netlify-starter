import React from "react";
import App, { Container } from "next/app";
import { Container as SemanticUIContainer } from "semantic-ui-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default class extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <Navbar />
        <Container>
          <SemanticUIContainer>
            <Component {...pageProps} />
          </SemanticUIContainer>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}
