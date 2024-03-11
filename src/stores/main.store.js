import { jsPDF } from "jspdf";
import { ref, computed } from "vue";
import { defineStore, acceptHMRUpdate } from "pinia";
import { supabase } from "@/services/supabase.service";
import PrintnodeEndpoints from "@/api/printnode";
import ApitemplateioEndpoints from "@/api/apitemplateio";

export const useMainStore = defineStore("mainStore", {
  state: () => ({
    user: null,
    orders: [],
    orderItem: null,
    orderProducts: [],
    orderCustomer: null,
    orderPaymentMethod: null,
    orderShippingMethod: null,
    orderShippingCost: null,
    orderNotes: null,
    orderItemModal: false,
    paymentMethodModal: false,
    shippingMethodModal: false,
    notesModal: false,
    createCustomerModal: false,
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
        alert(error.details);
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

    async getCouponsByUser(user_id) {
      const { data, error } = await supabase
        .from("coupons")
        .select()
        .eq("user_id", user_id);

      if (error) {
        console.log(error);
        return {
          success: false,
        };
      } else {
        return {
          success: true,
          data,
        };
      }
    },

    async createCoupon(coupon) {
      const { data, error } = await supabase
        .from("coupons")
        .insert([coupon])
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
        this.orderProducts[productIndex].total = null;
        this.orderProducts[productIndex].notes = null;
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
        this.orderProducts[productIndex].total = null;
        this.orderProducts[productIndex].notes = null;
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

      const orderProducts = this.orderProducts.map((product) => ({
        order_id: order[0].id,
        product_id: product.id,
        quantity: product.quantity,
        total: product?.total || product.quantity * product.price,
        notes: product?.notes || null
      }));

      await supabase.from("orders_products").insert(orderProducts).select();

      const bill = this.generateBill({
        id: order[0].id,
        products: this.orderProducts,
        customer: this.orderCustomer,
        shipping_method: this.orderShippingMethod,
        shipping_cost: this.orderShippingCost,
        payment_method: this.orderPaymentMethod,
        notes: this.orderNotes,
      });
      await PrintnodeEndpoints.createPrintJob({
        title: order[0].id,
        content: bill
      });

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

    async setOrderItem(product) {
      this.orderItem = product;
    },

    async updateOrderItem(newValues) {
      this.orderProducts = this.orderProducts.map((product) => {
        if (newValues.id === product.id) {
          return {
            ...product,
            total: newValues.total,
            notes: newValues.notes
          }
        }
        return product;
      })
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

    async toggleCreateCustomerModal() {
      this.createCustomerModal = !this.createCustomerModal;
    },

    async toggleOrderItemModal() {
      this.orderItemModal = !this.orderItemModal;
    },

    setOrderDetails(order) {
      this.orderDetails = order;
    },

    async generateBill(order) {
      const response = await ApitemplateioEndpoints.createPDF({
        template_id: "1ae77b234045eef6",
        body: {
          "date": "15/05/2022",
          "invoice_no": "435568799",
          "sender_address1": "3244 Jurong Drive",
          "sender_address2": "Falmouth Maine 1703",
          "sender_phone": "255-781-6789",
          "sender_email": "hello@logos.com",
          "customer_name": "Diego Aguilar",
          "customer_address": "2354 Lakeside Drive",
          "customer_phone": "34333-84-223",
          "items": [
            {
              "item_name": "Oil",
              "unit": 1,
              "unit_price": 100,
              "total": 100
            },
            {
              "item_name": "Rice",
              "unit": 2,
              "unit_price": 200,
              "total": 400
            },
            {
              "item_name": "Mangoes",
              "unit": 3,
              "unit_price": 300,
              "total": 900
            },
            {
              "item_name": "Cloth",
              "unit": 4,
              "unit_price": 400,
              "total": 1600
            },
            {
              "item_name": "Orange",
              "unit": 7,
              "unit_price": 20,
              "total": 1400
            }
          ],
          "total": "total",
          "footer_email": "hello@logos.com"
        }
      })
      console.log("PDF", response.data);
    },

    async getInventory() {
      const { data: dataEnterprises, error } = await supabase
        .from("items")
        .select();

      if (error) {
        console.log(error);
        return {
          success: false,
        };
      }

      console.log(dataEnterprises)
      this.inventory = dataEnterprises;
      return {
        success: true,
        data: dataEnterprises,
      };
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
