import React, { Fragment } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import './musicEvent.scss';
import MusicEventFetch from '../MusicEventDetails/MusicEventFetch';
import { updateDetailsId } from '../../../state/MusicDetails';

export type Event = {
    imgUrl: string;
    eventId: string
    name: string
};

const MusicEvent: React.FC<Event> = React.memo(
    ({ imgUrl, eventId, name }) => {
        const selectedId = useAppSelector(state => state.details.id)
        const dispatch = useAppDispatch()

        const updateId = (id: string): void => {
            dispatch(updateDetailsId(id));
        }
        return (
            <Fragment>
                <div onClick={() => updateId(eventId)} className={"music-event-box"} data-testid="event-box">
                    <img src={imgUrl} alt={name} />
                    {selectedId === eventId && <div className="triangle"></div>}
                </div>
                {selectedId === eventId && <MusicEventFetch id={eventId} />}
            </Fragment>
        );
    }
);

export default MusicEvent;