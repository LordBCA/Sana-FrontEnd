import productItemModel from "./productItemModel";

export default interface productResultModel {
    items: productItemModel[];
    itemsFrom: number;
    itemsTo: number;
    totalItemsCount: number;
    totalPages: number;
}