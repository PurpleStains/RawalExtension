import { productNameKey, quantityKey } from "../constants/const";
import { LogMessage } from "../serviceLogger";
import { getStorageData } from "../storage";
import { getHTMLElement } from "../utils/html-elements-finder";

export const highlightMultipliedProducts = async () => {
    LogMessage("started...")
    const productNameHTMLs = getHTMLElement(productNameKey);
    const quantityHTMLs = getHTMLElement(quantityKey);

    if (!productNameHTMLs || !quantityHTMLs) {
        LogMessage("Couldn't find enough elements for calculations.");
        return;
    }

    productNameHTMLs.forEach(x => highlightMultipliedName(x));
    quantityHTMLs.forEach(x => highlightMultipliedQuantities(x));
};


const highlightMultipliedName = async (productCell: Element) => {
    const { highlightColor }: any = await getStorageData();

    const text = getPlainTextFromElement(productCell);
    if (checkForQuantity(text)) {
        (productCell as HTMLElement).style.backgroundColor = highlightColor;
    } else {
        LogMessage("No quantity greater than 1 found in product text.");
    }
};

const highlightMultipliedQuantities = async (quantityCell: Element) => {
    const { highlightColor }: any = await getStorageData();

    const text = getPlainTextFromQuantity(quantityCell);
    const quantity = parseInt(text, 10);
    if (quantity > 1) {
        (quantityCell as HTMLElement).style.backgroundColor = highlightColor;
    } else {
        LogMessage("No quantity greater than 1 found in quantity text.");
    }
};

const getPlainTextFromElement = (element: Element) => {
    if (!element) {
        LogMessage("Element is null or undefined.");
        return "";
    }

    let plainText = "";

    element.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            plainText += node.textContent.trim();
        }
    });

    return plainText.trim();
};

const getPlainTextFromQuantity = (element: Element) => {
    if (element) {
        // Select the <a> tag inside the <td>
        const anchor = element.querySelector('a');

        if (anchor) {
            // Get the text content and remove spaces
            const textWithoutSpaces = anchor.textContent.replace(/\s/g, '');
            LogMessage(`Extracted text without spaces: ${textWithoutSpaces}`);
            return textWithoutSpaces;
        } else {
            LogMessage("No <a> tag found inside the <td>.");
            return "";
        }
    }

    return "";
};


const checkForQuantity = (text: string) => {
    // Regex to match patterns like "50 szt", "2szt", "2 szt", "2x"
    const quantityRegex = /\b(\d+)\s?(sztuk|szt)\b/;
    const match = text.toLowerCase().match(quantityRegex);
    if (match) {
        const quantity = parseInt(match[1], 10); // Extract and convert the quantity
        if (quantity > 1) {
            LogMessage(`Quantity found: ${quantity}`);
            return true;
        }
    }
    return false;
};

