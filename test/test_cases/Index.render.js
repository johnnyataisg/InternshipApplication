import { shallowMount } from '@vue/test-utils'
import Index from '@/components/Index'

describe('Index.vue', () => {
    it('testing Index component', () => {
        const wrapper = shallowMount(Index)
        const message = wrapper.find('h3').text()
        expect(message).toBe('Welcome to the site')
        expect(wrapper.vm.$data.msg).toBe('Choose what you would like to do')
    })
})