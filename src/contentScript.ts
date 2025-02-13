import { highlightMaterials } from "./orders/highlight-materials";
import { highlightMultipliedProducts } from "./orders/highlight-multiplied";

(async function () {

    setTimeout(highlightMultipliedProducts, 500);
    setTimeout(highlightMaterials, 500);

})();