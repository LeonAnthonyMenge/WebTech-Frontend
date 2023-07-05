import { shallowMount } from '@vue/test-utils';
import PagesHome from '@/components/PagesHome.vue';
import fetchMock from "jest-fetch-mock";
import App from "@/App";

describe('PagesHome component', () => {
    beforeEach(() => {
        fetchMock.enableMocks();
        fetch.resetMocks();
        App.methods.setIsLoggedIn(true);
    });

    const url = process.env.VUE_APP_BACKEND_BASE_URL;


    test('is a Vue instance', () => {
        const wrapper = shallowMount(PagesHome);

        expect(wrapper.vm).toBeTruthy();
    });

    test('renders the name of a page', () => {
        const wrapper = shallowMount(PagesHome, {
            data(){
                return {
                    pages: [{id: 1, name: "Test is rendered perfectly"}]
                }
            }
        });

        expect(wrapper.html()).toContain("Test is rendered perfectly");
    });

    test('calls delete page button', () => {
        const wrapper = shallowMount(PagesHome, {
            data(){
                return {
                    pages: [{id: 1, name: "Test is rendered perfectly"}]
                }
            }
        });        const deletePage = jest.fn();
        wrapper.vm.del = deletePage;

        // Simulate a button click
        wrapper.find('button.del').trigger('click');

        expect(deletePage).toHaveBeenCalled();
    });

    test('calls save page button', () => {
        const wrapper = shallowMount(PagesHome);
        const save = jest.fn();
        wrapper.vm.save = save;

        // Simulate a button click
        wrapper.find('button.save').trigger('click');

        expect(save).toHaveBeenCalled();
    });

    test('calls loadPages func and calls fetch', async () => {
        // Mock the API response
        const mockResponse = [
            { id: 1, name: 'Page 1' },
            { id: 2, name: 'Page 2' },
        ];
        fetch.mockResponseOnce(JSON.stringify(mockResponse));

        const wrapper = shallowMount(PagesHome, {
            mocks: {
                $route: {
                    params: {
                        ownerId: '1',
                    },
                },
            },
            data() {
                return {
                    pages: [
                        { id: 1, name: 'Page 1' },
                        { id: 2, name: 'Page 2' },
                    ],
                    ownerId: 1
                };
            },
        });

        // Wait for the loadPages method to complete
        await wrapper.vm.loadPages();

        // Verify that the API call was made with the correct URL
        expect(fetch).toHaveBeenCalledWith(url +'/pagebyowner/1', expect.anything());

        // Verify that the pages data property is updated correctly
        expect(wrapper.vm.pages).toEqual(mockResponse);
    });

    test('del method makes DELETE request and reloads the page', async () => {
        // Mock the API response
        const mockResponse = { success: true };
        fetch.mockResponseOnce(JSON.stringify(mockResponse));

        const wrapper = shallowMount(PagesHome);

        // Call the del method with an ID
        await wrapper.vm.del(1);

        // Verify that the API call was made with the correct URL and payload
        expect(fetch).toHaveBeenCalledWith(url + '/deletepage/1', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    });
});
