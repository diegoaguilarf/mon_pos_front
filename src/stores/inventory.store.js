import { defineStore, acceptHMRUpdate } from "pinia";
import { supabase } from "@/services/supabase.service";

export const useInventoryStore = defineStore("inventoryStore", {
  state: () => ({
    items: null,
    currentItem: null,
    itemTransactions: null,
  }),
  getters: {
    averageItemCost() {

      if (!this.itemTransactions) {
        return 0;
      }

      const onlyInputTransactions = this.itemTransactions.filter((transaction) => 
        transaction.type === "input" && transaction.price > 0 && transaction.quantity !== null
      )

      const sum = onlyInputTransactions.reduce((a, b) => a + b.price, 0);

      return sum === 0 ? 0 : sum / onlyInputTransactions.length;
    },
  },
  actions: {

    setItem(item) {
      this.currentItem = item;
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

      this.inventory = dataEnterprises;
      return {
        success: true,
        data: dataEnterprises,
      };
    },

    async getItem({ id }) {
      const { data: dataEnterprises, error } = await supabase
        .from("items")
        .select()
        .eq('id', id);;

      if (error) {
        console.log(error);
        return {
          success: false,
        };
      }

      this.currentItem = dataEnterprises[0];
      return {
        success: true,
        data: dataEnterprises,
      };
    },

    async getItemTransactions({ item_id }) {
      const { data: dataEnterprises, error } = await supabase
        .from("items_transactions")
        .select()
        .eq('item_id', item_id);

      if (error) {
        console.log(error);
        return {
          success: false,
        };
      }

      this.itemTransactions = dataEnterprises;
      return {
        success: true,
        data: dataEnterprises,
      };
    },

    async createItem({ name, category, uom, min_stock, stock, price }) {
      try {
        const { data, error } = await supabase
          .from('items')
          .insert([
            {
              name,
              category,
              uom,
              min_stock,
              stock,
            },
          ])
          .select()

        await supabase
          .from('items_transactions')
          .insert([
            {
              item_id: data[0].id,
              type: 'input',
              quantity: stock,
              price,
              notes: 'Initial stock'
            },
          ])
          .select()

      } catch (error) {
        console.log(error);
      }
    },

    async createItemTransaction({ item_id, type, quantity, price, notes }) {
      try {
        await supabase
          .from('items_transactions')
          .insert([
            {
              item_id,
              type,
              quantity,
              price,
              notes
            },
          ])
          .select()

        console.log(item_id);
        const { data } = await supabase
          .from('items')
          .select('stock')
          .eq('id', item_id)

        const quantityModificate = type === 'input' ? quantity : quantity * -1;
        const { data: item } = await supabase
          .from('items')
          .update({
            stock: data[0].stock + quantityModificate
          })
          .eq('id', item_id)
          .select()
        this.currentItem = item[0];

      } catch (error) {
        console.log(error);
      }
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useInventoryStore, import.meta.hot));
}
