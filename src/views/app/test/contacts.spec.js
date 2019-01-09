import {shallowMount} from '@vue/test-utils'
import contactsComponent from './CRM/contacts/contacts.vue'


describe('contactsComponent',() => {

  it('renders the correct loading', () => {

    const loading = false

    const wrapper = shallowMount('contactsComponent',{
      propsData:{msg}
    })

    expect(wrapper.text()).toMatch('hello world')
  })
})