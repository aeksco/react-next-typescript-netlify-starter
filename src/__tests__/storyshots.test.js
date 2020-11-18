import initStoryshots, {
  multiSnapshotWithOptions,
} from "@storybook/addon-storyshots";

// // // //

const options = {
  test: multiSnapshotWithOptions({
    createNodeMock: (element) => document.createElement(element.type),
  }),
};

initStoryshots(options);
