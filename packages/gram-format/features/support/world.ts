// features/support/world.js
const { setWorldConstructor } = require("cucumber");

class CustomWorld {
  variable: number;
  constructor() {
    this.variable = 0;
  }

  setTo(n:number) {
    this.variable = n;
  }

  incrementBy(n:number) {
    this.variable += n;
  }
}

setWorldConstructor(CustomWorld);
