const { transactionQueryRunner, queryRunner } = require('../db');

const cartService = {

    async _ensureCart(userId, guestId) {
        if (!userId && !guestId) throw new Error("No owner provided");
        
        const col = userId ? 'user_id' : 'guest_id';
        const val = userId || guestId;

        // 1. Try to create (ignore if exists)
        await queryRunner(`INSERT IGNORE INTO carts (${col}) VALUES (?)`, [val]);

        // 2. Get ID
        const result = await queryRunner(`SELECT id FROM carts WHERE ${col} = ?`, [val]);
        return result[0]?.id;
    },

    async addToCart(userId, guestId, { productId, quantity, price }) {
        try {
            const cartId = await this._ensureCart(userId, guestId);
            if (!cartId) return { ok: false, message: "Could not create/find cart" };

            const qry = `
                INSERT INTO cart_items (cart_id, product_id, quantity, price_snapshot)
                VALUES (?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE 
                    quantity = quantity + VALUES(quantity),
                    price_snapshot = VALUES(price_snapshot)
            `;
            
            await queryRunner(qry, [cartId, productId, quantity, price]);
            return { ok: true };
        } catch (err) {
            console.error("addToCart error:", err);
            return { ok: false, message: "Failed to add item" };
        }
    },

    async getCart(userId, guestId) {
        try {
            // 1. Get cart ID
            const col = userId ? 'user_id' : 'guest_id';
            const val = userId || guestId;
            const cartRes = await queryRunner(`SELECT id FROM carts WHERE ${col} = ?`, [val]);
            const cartId = cartRes[0]?.id;

            if (!cartId) return { ok: true, data: [] };

            const qry = `
                SELECT ci.id, ci.product_id, ci.quantity, ci.price_snapshot,
                       p.title, p.thumbnail_url1, p.price, p.stock
                FROM cart_items ci
                JOIN products p ON ci.product_id = p.id
                WHERE ci.cart_id = ?
            `;
            const items = await queryRunner(qry, [cartId]);
            return { ok: true, data: items };
        } catch (err) {
            console.error("getCart error:", err);
            return { ok: false, message: "Failed to retrieve cart" };
        }
    },

    async updateItemQuantity(userId, guestId, productId, quantity) {
        try {
            const col = userId ? 'user_id' : 'guest_id';
            const val = userId || guestId;
            
            const qry = `
                UPDATE cart_items ci
                JOIN carts c ON ci.cart_id = c.id
                SET ci.quantity = ?
                WHERE c.${col} = ? AND ci.product_id = ?
            `;
            
            await queryRunner(qry, [quantity, val, productId]);
            return { ok: true };
        } catch (err) {
            console.error("updateItemQuantity error:", err);
            return { ok: false, message: "Failed to update quantity" };
        }
    },

    async removeItem(userId, guestId, productId) {
        try {
            const col = userId ? 'user_id' : 'guest_id';
            const val = userId || guestId;

            const qry = `
                DELETE ci FROM cart_items ci
                JOIN carts c ON ci.cart_id = c.id
                WHERE c.${col} = ? AND ci.product_id = ?
            `;
            
            await queryRunner(qry, [val, productId]);
            return { ok: true };
        } catch (err) {
            console.error("removeItem error:", err);
            return { ok: false, message: "Failed to remove item" };
        }
    },

    async clearCart(userId, guestId) {
        try {
            const col = userId ? 'user_id' : 'guest_id';
            const val = userId || guestId;
            
            const qry = `
                DELETE ci FROM cart_items ci
                JOIN carts c ON ci.cart_id = c.id
                WHERE c.${col} = ?
            `;
            await queryRunner(qry, [val]);
            return { ok: true };
        } catch (err) {
            console.error("clearCart error:", err);
            return { ok: false, message: "Failed to clear cart" };
        }
    },

    async syncGuestCart(userId, guestId) {
        if (!userId || !guestId) {
            return { ok: false, message: "Missing user ID or guest ID" };
        }

        try {
            const queries = [
                // 1. Ensure user cart exists
                { 
                    qry: `INSERT IGNORE INTO carts (user_id) VALUES (?)`, 
                    params: [userId] 
                },
                // 2. Set variables for cart IDs
                { 
                    qry: `SELECT @u_id := id FROM carts WHERE user_id = ?`, 
                    params: [userId] 
                },
                { 
                    qry: `SELECT @g_id := id FROM carts WHERE guest_id = ?`, 
                    params: [guestId] 
                },
                // 3. Move non-duplicate items from guest to user cart
                { 
                    qry: `UPDATE cart_items ci
                          LEFT JOIN cart_items cu ON cu.cart_id = @u_id AND cu.product_id = ci.product_id
                          SET ci.cart_id = @u_id
                          WHERE ci.cart_id = @g_id AND cu.id IS NULL`, 
                    params: [] 
                },
                // 4. Delete remaining guest items (duplicates)
                { 
                    qry: `DELETE FROM cart_items WHERE cart_id = @g_id`, 
                    params: [] 
                },
                // 5. Delete guest cart
                { 
                    qry: `DELETE FROM carts WHERE id = @g_id`, 
                    params: [] 
                }
            ];

            await transactionQueryRunner(queries);
            return { ok: true };

        } catch (err) {
            console.error("Error in syncGuestCart:", err);
            return { ok: false, message: "Cart sync failed", error: err };
        }
    }
};

module.exports = { cartService };
