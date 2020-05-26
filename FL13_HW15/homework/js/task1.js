function assign(target, varArgs) { 
      if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object');
      }
      console.log(varArgs);
      let to = Object(target);

      for (let index = 1; index < arguments.length; index++) {
        let nextSource = arguments[index];

        if (nextSource !== null && nextSource !== undefined) { 
          for (let nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
}
