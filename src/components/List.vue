<template>
<div>
  <!-- Title -->
  <section class="hero is-primary is-bold">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Products list
        </h1>
      </div>
    </div>
  </section>
  
  <!-- Modal -->
  <transition mode="out-in" name="fade">
    <modal @close="showModal = false" @addItem='confirmAddItem' :item="selectedItem" v-if="showModal" :header="header"/>
  </transition>

  <!-- List of items -->
  <div class="productList">
    <div class="columns">
      <div class="column is-two-thirds">
        <table class="table is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th></th>
              <th><abbr title="ID">ID</abbr></th>
              <th>Name</th>
              <th>Department</th>
              <th>Display quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr id="trItem" v-for="(item, index) in items.Items" :key="index" @click="selectItem(item.Name)">
              <td><img :src="item.imageUrl"></td>
              <th>{{ item.ItemID }}</th>
              <td class="itemName" >{{ item.Name }}</td>
              <td class="department">{{ item.Department }}</td>
              <td>{{ item.DisplayQuantity }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="column">   
        <h4 class="title is-4">Cart</h4>
        <table class="table is-striped is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cartItem, cartItemKey) in cart" :key="cartItemKey">
              <th>{{ cartItem.name }}</th>
              <td>{{ cartItem.quantity }}</td>
              <td><button class="delete is-medium" @click="removeFromCart(cartItem)"></button ></td>
            </tr>
          </tbody>
        </table><br><br>
        <button id="submitPurchase" :disabled="!cart.length" class="button is-success" @click="submitPurchase()">Submit</button>
      </div>
    </div>
  </div>

   <!-- Notification -->
  <transition mode="out-in" name="fade" class="notif" >
    <div v-if="notification.message" :class="'notification is-' + notification.type">
      <button class="delete" @click="hideNotifications"></button>{{notification.message}}
    </div>
  </transition>
</div>
</template>

<script>
import Items from '../../static/list.json'
import notifier from '@/mixins/notifier'
import modal from '@/shared/Modal'
export default {
  name: 'list',
  mixins: [notifier],
  data () {
    return {
      items: Items,
      showModal: false,
      header: '',
      selectedItem: '',
      cart: []
    }
  },
  methods: {
    selectItem(name) {
      this.selectedItem = name
      this.header = 'How many ' + name + ' do you want to add to cart?'
      this.showModal = true
    },
    confirmAddItem (value) {
      this.cart.push(value)
      this.showNotification('info', value.quantity + ' ' + value.name + ' added to cart.')
      this.showModal = false
    },
    removeFromCart(item) {
      this.cart.splice(this.cart.indexOf(item), 1)
    },
    submitPurchase() {
       this.showNotification('success', 'Congratulations! Your purchase was successfull!')
       this.cart = []
    }
  },
  components: {
    modal
  }
}
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
img {
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 150px;
    height: 80px;
}
img:hover {
    box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
}
.productList {
  padding: 50px 20px 0px 20px;
}
#trItem {
  cursor: pointer;
}
</style>