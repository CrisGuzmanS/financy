import { Collection } from "@ellescript/collecty";
import { Stock } from "../entities/Stock";

export class StockCollection extends Collection {

    item(element) {
        return new Stock(element);
    }

}