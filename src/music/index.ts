class P {
    u : number = 0;
    constructor() {
        this.u = 1;
    }
}

class I extends P {
    y = this.u;
}

console.log(new I().y)