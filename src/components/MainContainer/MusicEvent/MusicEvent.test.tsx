import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import MusicEvent from './MusicEvent';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';

describe('Test music event', () => {
    test('Make sure the Music Event ID is added when the button is clicked', async () => {
        // Render the MusicEvents
        const { getByTestId } = render(<Provider store={store}><MusicEvent eventId={"Z698xZ8KZ17Geuy"} imgUrl={"test"} name={"test"} /></Provider>);
        window.HTMLElement.prototype.scrollIntoView = function () { };
        // Find the button to add id
        const button = getByTestId('event-box');
        expect(button).toBeInTheDocument();

        // Actually click the button.
        fireEvent.click(button);

        const book1 = await waitFor(
            () => getByTestId('event-box-child')
        );
        expect(book1).toBeInTheDocument();
    });
});