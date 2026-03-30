import { Collection } from "collecty";
import { Holding } from "./Holding.js";

export class HoldingCollection extends Collection {
    item(element) {
        return new Holding(element);
    }
}