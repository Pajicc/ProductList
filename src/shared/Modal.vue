<template>
<div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
        <p class="modal-card-title">{{ header }}</p>
        <button class="delete is-medium" aria-label="close" @click="$emit('close')"></button>
    </header>
    <section class="modal-card-body">
       <input type="number" min=1 class="input" :placeholder="'Quantity'" v-model="quantity" @keyup.enter="add()">
    </section>
    <footer class="modal-card-foot">
      <button id="add" class="button is-success" :disabled="quantity < 1" @click="add()">Add</button>
      <button class="button" @click="$emit('close')">Cancel</button>
    </footer>
  </div>
</div>
</template>

<script>
export default {
  name: 'modal',
  data() {
    return {
      quantity: 1
    }
  },
  methods: {
    add () {
      let product = {
        name: this.item,
        quantity: this.quantity
      }
      this.$emit('addItem', product)
    }
  },
  props: {
    header: {
      type: String,
      default: '!Error'
    },
    item: {
      type: String
    }
  }
}
</script>
