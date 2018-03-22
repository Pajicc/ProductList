import { mount } from 'avoriaz';
import Modal from '@/shared/Modal';
import Vue from 'vue';

describe('Modal.vue', () => {

  it(`should render props as its text content`, () => {
    // Extend the component to get the constructor, which we can then initialize directly.
    const Constructor = Vue.extend(Modal);

    const comp = new Constructor({
      propsData: {
        item: 'Chicken',
        header: 'Header title'
      }
    }).$mount()

    expect(comp.item)
      .to.equal('Chicken')
    expect(comp.header)
      .to.equal('Header title')

  })

  it('sets quantity when add button is clicked', () => {
    const comp = mount(Modal)

    comp.setData({
      quantity: 5
    });

    const add = comp.find('#add')[0]
    add.trigger('click')

    expect(comp.data().quantity).to.equal(5)
  })
})