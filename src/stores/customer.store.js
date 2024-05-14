import { defineStore, acceptHMRUpdate } from "pinia";
import { supabase } from "@/services/supabase.service";
import PrintnodeEndpoints from "@/api/printnode";

export const useCustomerStore = defineStore("customerStore", {
  state: () => ({
    user: null,
    paymentMethodModal: false,
    shippingMethodModal: false,
    notesModal: false,
    createCustomerModal: false,
    orderDetails: null,
    addresses: [],
    neighborhoods: []
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

      // const { data, error } = await supabase
      //   .from("neighborhood")
      //   .insert([{}])
      //   .select();

      // if (error) {
      //   console.log(error);
      //   alert(error.details);
      //   return {
      //     success: false,
      //   };
      // } else {
      //   return {
      //     success: true,
      //     data: data[0],
      //   };
      // }

      // const { data, error } = await supabase
      //   .from("users")
      //   .insert([customer])
      //   .select();

      // if (error) {
      //   console.log(error);
      //   alert(error.details);
      //   return {
      //     success: false,
      //   };
      // } else {
      //   return {
      //     success: true,
      //     data: data[0],
      //   };
      // }

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

    async getNeighborhoods() {
        const { data, error } = await supabase
            .from("neighborhood")
            .select();
    
        if (error) {
            console.log(error);
            return {
            success: false,
            };
        } else {
            this.neighborhoods = data;
            return {
            success: true,
            data,
            };
        }
    },

    async createNeighborhood(neighborhood) {
        const { data, error } = await supabase
            .from("neighborhood")
            .insert([neighborhood])
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

    async getAddressesByUser(user_id) {
        const { data, error } = await supabase
            .from("address")
            .select(`*, neighborhood ( * )`)
            .eq("user_id", user_id);
    
        if (error) {
            console.log(error);
            return {
            success: false,
            };
        } else {
            console.log(data);
            this.addresses = data;
            return {
            success: true,
            data,
            };
        }
    },

    async createAddress(address) {
        const { data, error } = await supabase
            .from("address")
            .insert([address])
            .select();
    
        if (error) {
            console.log(error);
            return {
            success: false,
            };
        } else {
            console.log(data[0])
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
        total: Number(product?.total) || product.quantity * product.price,
        notes: product?.notes || ""
      }));

      const total = orderProducts.reduce((a, b) => a + b.total, 0);

      await supabase.from("orders_products").insert(orderProducts).select();

      const bill = await this.generateBill({
        id: order[0].id,
        date: new Date().toLocaleDateString(),
        products: this.orderProducts.map((product) => ({
          name: product.name,
          quantity: product.quantity,
          total: Number(product?.total) || product.quantity * product.price,
          notes: product?.notes || ""
        })),
        total: total,
        customer: this.orderCustomer,
        shipping_method: this.orderShippingMethod,
        shipping_cost: Number(this.orderShippingCost),
        payment_method: this.orderPaymentMethod,
        notes: this.orderNotes || "",
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

    async toggleCreateCustomerModal() {
      this.createCustomerModal = !this.createCustomerModal;
    },
  },

  getters: {},
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCustomerStore, import.meta.hot));
}
