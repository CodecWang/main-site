/**
 * 理解polyfill和shim
 */

Number.isInteger(9);
Number.isInteger(4 / 3);

// polyfill
Number.isInteger = Number.isInteger || function(value) {
  return typeof value === "number" && 
         isFinite(value) && 
         Math.floor(value) === value;
};

// shim
function myIsInteger(value) {
  // 重定向
  if (Number.isInteger) return Number.isInteger(value);
  
  // 自行操作
  return typeof value === "number" && 
         isFinite(value) && 
         Math.floor(value) === value;
};

// core-js
import "core-js/features/promise";
Promise.resolve(32).then(x => console.log(x));