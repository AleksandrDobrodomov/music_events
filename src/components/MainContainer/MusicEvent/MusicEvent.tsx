import React, { Fragment } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import './musicEvent.scss';
import MusicEventFetch from '../MusicEventDetails/MusicEventFetch';
import { updateDetailsId } from '../../../state/MusicDetails';

export type Event = {
    imgUrl: string;
    eventId: string
    name: string
    selectedDetailsId: string
};

const MusicEvent: React.FC<Event> = React.memo(
    ({ imgUrl, eventId, name, selectedDetailsId }) => {
        
        const dispatch = useAppDispatch()

        const updateId = (id: string): void => {
            dispatch(updateDetailsId(id));
        }
        return (
            <Fragment>
                <div onClick={() => updateId(eventId)} className={"music-event-box"} data-testid="event-box">
                    <img src={imgUrl} alt={name} />
                    {selectedDetailsId === eventId && <div className="triangle"></div>}
                </div>
                {selectedDetailsId === eventId && <MusicEventFetch id={eventId} />}
            </Fragment>
        );
    }
);

export default MusicEvent;