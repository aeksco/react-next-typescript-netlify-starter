import theme from "./theme";

// TODO - find a way to ignore this, or make it work with @storybook/addon-storyshots
// import "../src/styles/index.css";

export const parameters = {
    layout: "centered",
    options: {
        storySort: (a, b) => {
            if (a[0].includes("docs-")) {
                if (a[0].includes("intro-")) {
                    return -1;
                }
                if (b[0].includes("intro-")) {
                    return 1;
                }
                if (a[0].includes("quick")) {
                    return -1;
                }
            }

            if (a[0].includes("examples-")) {
                return a - b;
            }

            return a - b;
        },
    },
    docs: {
        theme,
    },
};
