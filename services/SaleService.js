import SaleRepository from "../repositories/SaleRepository.js";
import ClientRepository from "../repositories/ClientRepository.js";
import ProductRepository from "../repositories/ProductRepository.js";

async function createSale(sale) {
    let error = "";
    if (!await ClientRepository.getClient(sale.client_id)) {
        error = "O client_id Informado, não existe.";
    }
    const product = await ProductRepository.getProduct(sale.product_id);
    if (!product) {
        error += "O Product_id informado, não existe.";
    }
    if (error) {
        throw new Error(error);
    }

    if (product.stock > 0) {
        sale = await SaleRepository.insertSale(sale);
        product.stock--;
        await ProductRepository.updateProduct(product);
        return sale;
    } else {
        throw new Error("O produto informado não possui em estoque.");
    }


}

async function getSales(productId) {
    if (productId) {
        return await SaleRepository.getSalesByProductId(productId)
    }
    return await SaleRepository.getSales();

}

async function getSale(id) {
    return await SaleRepository.getSale(id);
}

async function deleteSale(id) {
    const sale = await SaleRepository.getSale(id);
    if (sale) {
        const product = await ProductRepository.getProduct(sale.product_id);
        await SaleRepository.deleteSale(id);
        product.stock++;
        await ProductRepository.updateProduct(product);
    } else {
        throw new Error("O Id da sale informado não existe");
    }


}

async function updateSale(sale) {
    let error = "";
    if (!await ClientRepository.getClient(sale.client_id)) {
        error = "O client_id Informado, não existe.";
    }
    if (!await ProductRepository.getProduct(sale.product_id)) {
        error += "O Product_id informado, não existe.";
    }
    if (error) {
        throw new Error(error);
    }
    return await SaleRepository.updateSale(sale);
}


export default {
    createSale,
    getSales,
    getSale,
    deleteSale,
    updateSale
}