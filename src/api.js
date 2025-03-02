import axios from "axios";

const API_URL = "http://localhost:8080/api/orders";

export const getAllOrders = async () => {
    return await axios.get(API_URL);
};

export const createOrder = async (order) => {
    try {
        const response = await fetch("http://localhost:8080/api/orders", {
            method: "POST",
            body: JSON.stringify(order), 
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Erreur lors de l'ajout de la commande");
        }
        return await response.json(); 
    } catch (error) {
        console.error("Erreur lors de l'ajout de la commande:", error);
        throw error; 
    }
};
export const updateOrder = async (id, order) => {
    try {
        const response = await fetch(`http://localhost:8080/api/orders/${id}`, {
            method: "PUT",
            body: JSON.stringify(order), 
            headers: {
                "Content-Type": "application/json", 
            },
        });
        if (!response.ok) {
            throw new Error("Erreur lors de la mise à jour de la commande");
        }
        console.log("ID:", id);
        return await response.json(); 
    } catch (error) {
        console.log("ID:", id);
        console.error("Erreur lors de la mise à jour de la commande:", error);
        throw error; 
    }
};

export const deleteOrder = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/orders/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Erreur lors de la suppression de la commande");
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la suppression de la commande:", error);
        throw error; 
    }
};
