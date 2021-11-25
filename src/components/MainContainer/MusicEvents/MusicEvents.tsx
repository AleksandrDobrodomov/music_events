import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import MusicEvent from '../MusicEvent/MusicEvent';
import './musicEvents.scss';
import { updateDetailsId } from '../../../state/MusicDetails';
export interface Event {
    images: Images[]
    id: string
    name: string
}

export interface Images {
    url: string
    height: number
    name: string
}

export interface Events {
    results: Event[];
}


const MusicEvents: React.FC = React.memo(
    () => {
        const [result, setResult] = useState<Events>({
            results: []
        });
        const [eventsEmpty, setEventsEmpty] = useState<boolean>(false);
        const dispatch = useAppDispatch()
        const selectedId = useAppSelector(state => state.genres.id);
        const searchData = useAppSelector(state => state.searchData.data);

        function ensure<T>(argument: T | undefined | null, message: string = 'This value was promised to be there.'): T {
            if (argument === undefined || argument === null) {
                throw new TypeError(message);
            }
            return argument;
        }
        useEffect(() => {
            const removeDetailsId = (id: string): void => {
                dispatch(updateDetailsId(id));
            }
            fetch(`https://app.ticketmaster.com/discovery/v2/events?countryCode=FI&classificationId=${selectedId}&apikey=0JIWxBrWrDwCSXZzhD9HKwPngGfGc9fq`)
                .then(response => response.json())
                .then(response => {
                    if (response.page.totalElements === 0) {
                        setEventsEmpty(true);
                    }
                    else {
                        setResult({ results: response._embedded.events })
                        setEventsEmpty(false);
                    }
                })
                .catch(error => console.log(error));
            removeDetailsId("");
        }, [selectedId, dispatch]);
        return (
            <main className="main-content">
                {eventsEmpty ? <div className="empty-events">No events found</div> :
                    <section className="music-event__wrapper">
                        {searchData !== "" ? result.results.filter(person =>
                            person.name.toLowerCase().includes(searchData.toLowerCase())
                        ).map((e, i) => (
                            <MusicEvent key={i} imgUrl={ensure(e.images.find(item => item.height === 683)).url} eventId={e.id} name={e.name} />
                        )) : result.results.map((e, i) => (
                            <MusicEvent key={i} imgUrl={ensure(e.images.find(item => item.height === 683)).url} eventId={e.id} name={e.name} />
                        ))}
                    </section>}
            </main>
        );
    }
);

export default MusicEvents;