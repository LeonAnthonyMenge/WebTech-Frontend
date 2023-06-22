import { shallowMount } from '@vue/test-utils';
import NoteHome from '@/components/NoteHome.vue';
import fetchMock from 'jest-fetch-mock';


describe('NoteHome component', () => {
    beforeEach(() => {
        fetchMock.enableMocks();
        fetch.resetMocks();
    });
    afterEach(() => {
        fetchMock.resetMocks();
    });

    test('is a Vue instance', () => {
        const wrapper = shallowMount(NoteHome);

        expect(wrapper.vm).toBeTruthy();
    });

    test('renders the title of the component', () => {
        const testNote = "Test is rendered perfectly";
        const wrapper = shallowMount(NoteHome, {
            data() {
                return {
                    notes: [{id:1, name: "Test is rendered perfectly", done: false}]
                }
            }
        });

        expect(wrapper.html()).toContain(testNote);
    });

    test('calls delete note button', () => {
        const wrapper = shallowMount(NoteHome, {
            data() {
                return {
                    notes: [{id:1, name: "Test is rendered perfectly", done: false}]
                }
            }
        });
        const deleteNote = jest.fn();
        wrapper.vm.del = deleteNote;

        // Simulate a button click
        wrapper.find('button.del').trigger('click');

        expect(deleteNote).toHaveBeenCalled();
    });

    test('calls save note button', () => {
        const wrapper = shallowMount(NoteHome);
        const saveNote = jest.fn();
        wrapper.vm.save = saveNote;

        // Simulate a button click
        wrapper.find('button.save').trigger('click');

        expect(saveNote).toHaveBeenCalled();
    });

    test('calls loadNotes func and calls fetch', async () => {
        // Mock the API response
        const mockResponse = [
            { id: 1, name: 'Note 1' },
            { id: 2, name: 'Note 2' },
        ];
        fetch.mockResponseOnce(JSON.stringify(mockResponse));

        const wrapper = shallowMount(NoteHome, {
            data() {
                return{
                    pageId: 1,
                    notes: [
                        { id: 1, name: 'Note 1' },
                        { id: 2, name: 'Note 2' }
                    ]
                }
            }
        });

        // Wait for the loadThings method to complete
        await wrapper.vm.loadNotes();

        // Verify that the API call was made with the correct URL
        expect(fetch).toHaveBeenCalledWith('http://localhost:8080/page/notes/1', expect.anything());

        // Verify that the notes data property is updated correctly
        expect(wrapper.vm.notes).toEqual(mockResponse);
    });

    test('save method makes POST request', async () => {
        // Mock the API response
        const mockResponse = { success: true };
        fetch.mockResponseOnce(JSON.stringify(mockResponse));

        const wrapper = shallowMount(NoteHome, {
            data() {
                return {
                    pageId: 1,
                    notes: [
                        { id: 1, name: 'Note 1' },
                        { id: 2, name: 'Note 2' }
                    ]
                };
            }
          });

        // Set the value of notefield
        wrapper.setData({ notefield: 'New Note' });

        // Call the save method
        await wrapper.vm.save();

        // Verify that the API call was made with the correct URL and payload
        expect(fetch).toHaveBeenCalledWith('http://localhost:8080/page/note/1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ string: 'New Note' })
        });
});
    test('del method makes DELETE request', async () => {
        // Mock the API response
        const mockResponse = { success: true };
        fetch.mockResponseOnce(JSON.stringify(mockResponse));

        const wrapper = shallowMount(NoteHome);

        // Call the del method with an ID
        await wrapper.vm.del(1);

        // Verify that the API call was made with the correct URL and payload
        expect(fetch).toHaveBeenCalledWith('http://localhost:8080/note/delete/1', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: 1 })
        });
    });
});
