import { Collection } from "collecty";
import { Holding } from "./Holding";

export class HoldingCollection extends Collection {
    item(element) {
        return new Holding(element);
    }
}