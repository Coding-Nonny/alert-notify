import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
export default {
    input : "src/nonnyAlert.js",
    output: {
        file: "dist/alertify.js",
        format: "iife",
        name: "AlertNotify"
    },
    plugins: [
        resolve(),
        commonjs()
      ]
}