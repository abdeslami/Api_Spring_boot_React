import { useEffect, useState } from "react";
import { getAllOrders, createOrder, updateOrder, deleteOrder } from "./api";

export default function OrderList() {
    const [orders, setOrders] = useState([]);
    const [newOrder, setNewOrder] = useState({
        orderId: "",
        customerId: "",
        items: [],
        shippingAddress: {
            street: "",
            city: "",
            postalCode: "",
            country: "",
        },
        paymentMethod: "",
        totalAmount: "",
        currency: "",
        status: "",
        createdAt: "",
    });
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await getAllOrders();
            setOrders(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des commandes", error);
        }
    };

    const handleSaveOrder = async () => {
   

        try {
            if (editMode) {
                await updateOrder(selectedId, newOrder);
                alert("Commande modifiée avec succès.");
                setEditMode(false);
                setSelectedId(null);
            } else {
                await createOrder(newOrder);
                alert("Commande ajoutée avec succès.");
            }
            setNewOrder({
                orderId: "",
                customerId: "",
                items: [],
                shippingAddress: {
                    street: "",
                    city: "",
                    postalCode: "",
                    country: "",
                },
                paymentMethod: "",
                totalAmount: "",
                currency: "",
                status: "",
                createdAt: "",
            });

            fetchOrders(); 
        } catch (error) {
            console.error("Erreur lors de la sauvegarde de la commande", error);
            alert("Une erreur est survenue. Veuillez réessayer.");
        }
    };

    const handleEdit = async (order) => {
        setNewOrder({
            orderId: order.orderId,
            customerId: order.customerId,
            items: order.items,
            shippingAddress: order.shippingAddress,
            paymentMethod: order.paymentMethod,
            totalAmount: order.totalAmount,
            currency: order.currency,
            status: order.status,
            createdAt: order.createdAt,
        });
        setEditMode(true);
        await setSelectedId(order.id); 
    };

    const handleDelete = async (id) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cette commande ?")) {
            try {
                await deleteOrder(id);
                alert("Commande supprimée avec succès.");
                fetchOrders(); 
            } catch (error) {
                console.error("Erreur lors de la suppression de la commande", error);
                alert("Une erreur est survenue lors de la suppression.");
            }
        }
    };

    return (
        <div className="p-4 w-full h-full flex flex-col justify-center items-center">
            <h3 className="mt-6 text-xl">{editMode ? "Modifier la Commande" : "Ajouter une nouvelle Commande"}</h3>

            <div className="mt-4 w-96 flex flex-col justify-center items-center">
                <input
                    className="border px-4 py-2 rounded-md w-full mb-4"
                    type="text"
                    placeholder="Order ID"
                    value={newOrder.orderId}
                    onChange={(e) => setNewOrder({ ...newOrder, orderId: e.target.value })}
                />
                <input
                    className="border px-4 py-2 rounded-md w-full mb-4"
                    type="text"
                    placeholder="Customer ID"
                    value={newOrder.customerId}
                    onChange={(e) => setNewOrder({ ...newOrder, customerId: e.target.value })}
                />
                <input
                    className="border px-4 py-2 rounded-md w-full mb-4"
                    type="text"
                    placeholder="Street"
                    value={newOrder.shippingAddress.street}
                    onChange={(e) =>
                        setNewOrder({
                            ...newOrder,
                            shippingAddress: { ...newOrder.shippingAddress, street: e.target.value },
                        })
                    }
                />
                <input
                    className="border px-4 py-2 rounded-md w-full mb-4"
                    type="text"
                    placeholder="Payment Method"
                    value={newOrder.paymentMethod}
                    onChange={(e) => setNewOrder({ ...newOrder, paymentMethod: e.target.value })}
                />
                <input
                    className="border px-4 py-2 rounded-md w-full mb-4"
                    type="number"
                    placeholder="Total Amount"
                    value={newOrder.totalAmount}
                    onChange={(e) => setNewOrder({ ...newOrder, totalAmount: e.target.value })}
                />
                <input
                    className="border px-4 py-2 rounded-md w-full mb-4"
                    type="text"
                    placeholder="Currency"
                    value={newOrder.currency}
                    onChange={(e) => setNewOrder({ ...newOrder, currency: e.target.value })}
                />
                <input
                    className="border px-4 py-2 rounded-md w-full mb-4"
                    type="text"
                    placeholder="Status"
                    value={newOrder.status}
                    onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
                />
                <input
                    className="border px-4 py-2 rounded-md w-full mb-4"
                    type="datetime-local"
                    value={newOrder.createdAt}
                    onChange={(e) => setNewOrder({ ...newOrder, createdAt: e.target.value })}
                />
                <button
                    className="bg-green-500 text-white px-6 py-2 rounded-md"
                    onClick={handleSaveOrder}
                >
                    {editMode ? "Modifier" : "Ajouter"}
                </button>
            </div>

            <h2 className="text-2xl text-center font-semibold mb-4">Liste des Commandes</h2>

            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2">Order ID</th>
                        <th className="px-4 py-2">Customer ID</th>
                        <th className="px-4 py-2">Items</th>
                        <th className="px-4 py-2">Shipping Address</th>
                        <th className="px-4 py-2">Payment Method</th>
                        <th className="px-4 py-2">Total Amount</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id} className="border-t">
                            <td className="px-4 py-2">{order.orderId}</td>
                            <td className="px-4 py-2">{order.customerId}</td>
                            <td className="px-4 py-2">
                                {order.items.map((item, index) => (
                                    <div key={index}>
                                        {item.productName} (x{item.quantity})
                                    </div>
                                ))}
                            </td>
                            <td className="px-4 py-2">
                                {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </td>
                            <td className="px-4 py-2">{order.paymentMethod}</td>
                            <td className="px-4 py-2">{order.totalAmount} {order.currency}</td>
                            <td className="px-4 py-2">{order.status}</td>
                            <td className="px-4 py-2">
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                                    onClick={() => handleDelete(order.id)}
                                >
                                    Supprimer
                                </button>
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                                    onClick={() => handleEdit(order)}
                                >
                                    Modifier
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
