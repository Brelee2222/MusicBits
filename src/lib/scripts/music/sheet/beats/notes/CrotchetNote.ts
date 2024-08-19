import { NoteBeat } from "./NoteBeat";

export class CrotchetNote extends NoteBeat {
    readonly beats = 1;

    l() {
        console.log("hi");
    }
}