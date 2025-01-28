import { getStorageData } from "./storage";
import { LogMessage } from "./serviceLogger"; 

(async function () {

    const productNameKey = "productName";
    const quantityKey = "productQuantity";
    const { highlightColor } : any  = await getStorageData();

    const getPlainTextFromElement = (element) => {
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

    const getPlainTextFromQuantity = (element) => {
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

    const getHTMLElement = (keyName) => {
        LogMessage(`Searching for element with data-tid: ${keyName}`);
        const element = document.querySelectorAll(`[data-tid="${keyName}"]`);
        LogMessage(element)
        if (!element) {
            LogMessage(`Couldn't find element with data-tid: ${keyName}`);
            return null;
        }
        return element;
    };

    const checkForQuantity = (text) => {
        // Regex to match patterns like "50 szt", "2szt", "2 szt", "2x"
        const quantityRegex = /\b(\d+)\s?(sztuk|szt|x)\b/;
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

    const isMultipliedName = async (productCell) => {
        const text = getPlainTextFromElement(productCell);
        if (checkForQuantity(text)) {
            productCell.style.backgroundColor = highlightColor;
        } else {
            LogMessage("No quantity greater than 1 found in product text.");
        }
    };

    const isMultipliedByQuantity = async (quantityCell) => {
        const text = getPlainTextFromQuantity(quantityCell);
        const quantity = parseInt(text, 10);
        if (quantity > 1) {
            quantityCell.style.backgroundColor = highlightColor;
        } else {
            LogMessage("No quantity greater than 1 found in quantity text.");
        }
    };

    const highlightMultipliedProducts = () => {
        LogMessage("started...")
        const productNameHTMLs = getHTMLElement(productNameKey);
        const quantityHTMLs = getHTMLElement(quantityKey);

        if (!productNameHTMLs || !quantityHTMLs) {
            LogMessage("Couldn't find enough elements for calculations.");
            return;
        }

        productNameHTMLs.forEach(x => isMultipliedName(x));
        quantityHTMLs.forEach(x => isMultipliedByQuantity(x));
    };


    // const pollForChanges = () => {
    //     const interval = setInterval(() => {
    //         const target = getHTMLElement(productNameKey); // Update with your selector
    //         if (target) {
    //             highlightMultipliedProducts()
    //         }
    //     }, 750);
    // };

    // pollForChanges()
    setTimeout(highlightMultipliedProducts, 500);

})();