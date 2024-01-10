import { ref, computed } from "vue";
import { defineStore, acceptHMRUpdate } from "pinia";
import { supabase } from "@/services/supabase.service";

export const useMainStore = defineStore("mainStore", {
  state: () => ({
    user: null,
    orders: [],
    orderProducts: [],
    orderCustomer: null,
    orderPaymentMethod: null,
    orderShippingMethod: null,
    orderShippingCost: null,
    orderNotes: null,
    paymentMethodModal: false,
    shippingMethodModal: false,
    notesModal: false,
    orderDetails: null
  }),
  actions: {
    async findUser(values) {
      let query = supabase.from("user").select();

      if (values.idNumber) {
        query = query.eq("identification", values.idNumber);
      }
      if (values.idType) {
        query = query.eq("identification_type", values.idType);
      }
      if (values.name) {
        query = query.ilike("name", `%${values.name}%`);
      }
      if (values.secondName) {
        query = query.ilike("second_name", `%${values.secondName}%`);
      }
      if (values.surname) {
        query = query.ilike("surname", `%${values.surname}%`);
      }
      if (values.secondSurname) {
        query = query.ilike("second_surname", `%${values.secondSurname}%`);
      }
      query = query.limit(1).single();

      if (Object.keys(values).length !== 0 && values.constructor === Object) {
        const { data, error } = await query;
        if (error) {
          return { success: false };
        } else {
          return { success: true, data };
        }
      } else {
        return { success: false, data: "No data" };
      }
    },

    async getCustomers() {
      const { data: dataEnterprises, error } = await supabase
        .from("users")
        .select();

      if (error) {
        console.log(error);
        return {
          success: false,
        };
      } else {
        return {
          success: true,
          data: dataEnterprises,
        };
      }
    },

    async createCustomer(customer) {
      const { data, error } = await supabase
        .from("users")
        .insert([customer])
        .select();

      if (error) {
        console.log(error);
        return {
          success: false,
        };
      } else {
        return {
          success: true,
          data: data[0],
        };
      }
    },

    async assignCustomerToOrder(customer) {
      this.orderCustomer = customer;
    },

    async assignPaymentMethodToOrder(payment) {
      this.orderPaymentMethod = payment;
    },

    async assignShippingMethodToOrder(shipping) {
      this.orderShippingMethod = shipping;
    },

    async addNotesToOrder(value) {
      this.orderNotes = value;
    },

    async addShippingCostToOrder(shipping_cost) {
      this.orderShippingCost = shipping_cost;
    },

    async getProducts() {
      const { data: dataEnterprises, error } = await supabase
        .from("products")
        .select();

      if (error) {
        console.log(error);
        return {
          success: false,
        };
      } else {
        return {
          success: true,
          data: dataEnterprises,
        };
      }
    },

    async getOrders() {
      const { data: dataEnterprises, error } = await supabase.from("orders").select(`
      *,
      users (
        *
      ),
      orders_products (
        *,
        products (
          *
        )
      )
    `)

      this.orders = dataEnterprises;

      if (error) {
        console.log(error);
        return {
          success: false,
        };
      } else {
        return {
          success: true,
          data: dataEnterprises,
        };
      }
    },

    setOrders(orders) {
      this.orders = orders;
    },

    async addProductToOrder(product) {
      const productIndex = this.orderProducts.findIndex(
        (item) => item.id === product.id
      );
      if (productIndex === -1) {
        this.orderProducts.push({ ...product, quantity: 1 });
      } else {
        this.orderProducts[productIndex].quantity += 1;
      }
    },

    async removeProductFromOrder(product) {
      const productIndex = this.orderProducts.findIndex(
        (item) => item.id === product.id
      );
      if (this.orderProducts[productIndex].quantity === 1) {
        this.orderProducts.splice(productIndex, 1);
      } else {
        this.orderProducts[productIndex].quantity -= 1;
      }
    },

    async createOrder() {
      const { data: order, error } = await supabase
        .from("orders")
        .insert({
          shipping_method: this.orderShippingMethod,
          payment_method: this.orderPaymentMethod,
          shipping_cost: Number(this.orderShippingCost),
          notes: this.orderNotes,
          user_id: this.orderCustomer.id,
        })
        .select();

      console.log("here", order, error);

      const orderProducts = this.orderProducts.map((product) => ({
        order_id: order[0].id,
        product_id: product.id,
        quantity: product.quantity,
      }));

      await supabase.from("orders_products").insert(orderProducts).select();

      this.orderProducts = [];
      this.orderCustomer = null;
      this.orderPaymentMethod = null;
      this.orderShippingMethod = null;
      this.orderShippingCost = null;
      this.orderNotes = null;

      if (error) {
        console.log(error);
        return {
          success: false,
        };
      } else {
        return {
          success: true,
          data: order,
        };
      }
    },

    async updateOrderStatus({ id, status }) {
      const { data: dataEnterprises, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()

      if (error) {
        console.log(error);
        return {
          success: false,
        };
      } else {
        return {
          success: true,
          data: dataEnterprises,
        };
      }
    },

    async updateOrderShipping({ id, shipping_method }) {

      const { data: dataEnterprises, error } = await supabase
        .from('orders')
        .update({ shipping_method })
        .eq('id', id)
        .select()

      const orders = this.orders.map((order) => {
        if (order.id === id) {
          order.shipping_method = shipping_method;
        }
        return order;
      });

      this.setOrders(orders);

      if (error) {
        console.log(error);
        return {
          success: false,
        };
      } else {
        return {
          success: true,
          data: dataEnterprises,
        };
      }
    },

    async togglePaymentMethodModal() {
      this.paymentMethodModal = !this.paymentMethodModal;
    },

    async toggleShippingMethodModal() {
      this.shippingMethodModal = !this.shippingMethodModal;
    },

    async toggleNotesModal() {
      this.notesModal = !this.notesModal;
    },

    setOrderDetails(order) {
      this.orderDetails = order;
    }
  },

  getters: {
    subtotalOrder() {
      return this.orderProducts.reduce((a, b) => a + b.quantity * b.price, 0);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot));
}
