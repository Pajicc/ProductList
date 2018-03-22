import { mount } from 'avoriaz';
import List from '@/components/List';
import Vue from 'vue';

describe('List.vue', () => {

  it('sets the correct default data', () => {
    const Constructor = Vue.extend(List)
    const list = new Constructor({
      data: {
        showModal: false,
        header: '',
        selectedItem: '',
        cart: [],
        notification: {
          type: '',
          message: ''
        }
      }
    }).$mount()

    expect(list.showModal)
    .to.equal(false)
    expect(list.header)
    .to.equal('')
    expect(list.selectedItem)
    .to.equal('')
    expect(list.notification.message)
    .to.equal('')
    expect(list.notification.type)
    .to.equal('')
  })

  it('renders list elements inside tr', () => {
    const wrapper = mount(List)
    const listElements = wrapper.find('tr')
    expect(listElements.length).to.equal(5)
  })

  it('selects an item on click', () => {
    const comp = mount(List)

    comp.setData({
      selectedItem: 'Chicken'
    })

    const select = comp.find('#trItem')[0]

    select.trigger('click')

    // assert list contains new item
    // expect(comp.$el.textContent).to.contain('Chicken')
    expect(comp.data().selectedItem).to.equal('Chicken')
  })

  it('remove item from cart on click', () => {
    const comp = mount(List)

    comp.setData({
      cart: [
        {
          item: 'Chicken',
          quantity: 3
        }
      ]
    });

    const remove = comp.find('button')[0]

    remove.trigger('click')

    expect(comp.data().cart.length).to.equal(0)
  })

  it('hide and show notification', done => {
    const comp = mount(List)

    comp.setData({
      notification: {
        type: '',
        message: ''
      }
    });
    const getObjectsStub = sinon.stub(comp.vm, 'showNotification')

    comp.vm.showNotification('success', 'asdf')

    comp.vm.hideNotifications()
    expect(comp.data().notification.type).to.equal('')
    expect(comp.data().notification.message).to.equal('')
   
    done()
  })

  it('submit purchase on click', () => {
    const comp = mount(List)

    comp.setData({
      cart: [
        {
          item: 'Chicken',
          quantity: 3
        }
      ]
    });

    const submit = comp.find('#submitPurchase')[0]

    submit.trigger('click')

    // assert list contains new item
    // expect(comp.$el.textContent).to.contain('Chicken')
    expect(comp.data().cart.length).to.equal(0)
  })

  it('confirm add new item', done => {
    const comp = mount(List)

    comp.setData({
      cart: []
    });

    let product = {
      name: 'Chicken',
      quantity: 2
    }

    comp.vm.confirmAddItem(product)

    expect(comp.data().cart.length).to.equal(1)
    done()
  })
})