/* eslint-disable default-case */
import Quill from "quill";

const Module = Quill.import("core/module");

class CustomImageResize extends Module {
  constructor(quill, options) {
    super(quill, options);
  }

  // Override the functionality for each handle
  handleImageResize(handle, image, width, height) {
    switch (handle) {
      case "nw": // Top-left handle
        image.style.width = width + "px";
        image.style.height = height + "px";
        break;
      case "ne": // Top-right handle
        image.style.width = width + "px";
        image.style.height = height + "px";
        break;
      case "sw": // Bottom-left handle
        image.style.width = width + "px";
        image.style.height = height + "px";
        break;
      case "se": // Bottom-right handle
        image.style.width = width + "px";
        image.style.height = height + "px";
        break;
    }
  }
}

CustomImageResize.DEFAULTS = {
  handleStyles: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    cursor: "pointer",
  },
};

// Quill.register("modules/customImageResize", CustomImageResize);

export default CustomImageResize;
