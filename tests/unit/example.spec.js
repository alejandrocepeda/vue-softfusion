import {mount} from '@vue/test-utils'
import App from '@/views/app/CRM/contacts/contacts'


describe('contacts.vue', () => {
  it('get contacts', (done) => {

    const wrapper = mount(App, {
      stubs: ['pagination', 'router-link']
    })


    setTimeout(() => {
      let contacts = wrapper.vm.contacts
      expect(contacts.length).toBeGreaterThan(0)
      done();
    }, 2000);


  })


})
