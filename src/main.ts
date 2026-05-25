import "./styles.css";
import { mount } from "./ui.js";

const root = document.getElementById("app");
if (!root) throw new Error("#app root element missing");
const handle = mount(root);
// expose for e2e probing
(window as unknown as { __ttt?: typeof handle }).__ttt = handle;
