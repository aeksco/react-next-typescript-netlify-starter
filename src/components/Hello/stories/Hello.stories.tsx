import React from "react";
import { storiesOf } from "@storybook/react";
import { Hello } from "../component";

// // // //

storiesOf("Examples/Hello", module)
    .add("renders", () => {
        return (
            <Hello />
        );
    })