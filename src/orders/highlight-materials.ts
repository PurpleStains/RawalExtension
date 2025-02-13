import { productIdKey, productNameKey, saleItemRowKey } from "../constants/const";
import { LogMessage } from "../serviceLogger";
import { getHTMLElement } from "../utils/html-elements-finder";

export const highlightMaterials = () => {
    LogMessage("started...");
    const items = getHTMLElement(saleItemRowKey);

    if (!items) {
        LogMessage("Couldn't find any items in order");
        return;
    }

    items.forEach((e) => getPlainTextFromProductName(e));
};

const getPlainTextFromProductName = (element: Element) => {
    if (element) {
        // Use backticks to create a proper string for querySelector
        const productNameCell = element.querySelector(`[data-tid="${productNameKey}"]`);

        LogMessage(productNameCell);
        // Check if it contains a <span> element
        if (productNameCell && productNameCell.querySelector('span')) {
            // Select the productId cell with proper syntax
            const productIdCell = element.querySelector(`[data-tid="${productIdKey}"]`);
            if (productIdCell) {
                productIdCell.innerHTML = '<div><b>SUPER</b></div>';
            }
        }
    }

    return "";
};