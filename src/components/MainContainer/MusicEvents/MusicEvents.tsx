import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../app/hooks'
import MusicEvent from '../MusicEvent/MusicEvent';
import './musicEvents.scss';

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
        const selectedId = useAppSelector(state => state.genres.id);
        const searchData = useAppSelector(state => state.searchData.data);

        function ensure<T>(argument: T | undefined | null, message: string = 'This value was promised to be there.'): T {
            if (argument === undefined || argument === null) {
                throw new TypeError(message);
            }
            return argument;
        }

        useEffect(() => {
            fetch(`https://app.ticketmaster.com/discovery/v2/events?countryCode=FI&classificationId=${selectedId}&apikey=0JIWxBrWrDwCSXZzhD9HKwPngGfGc9fq`)
                .then(response => response.json())
                .then(response => setResult({ results: response._embedded.events }))
                .catch(error => console.log(error));
        }, [selectedId]);
        return (
            <main className="main-content">
                <section className="music-event__wrapper">
                    {searchData !== "" ? result.results.filter(person =>
                        person.name.toLowerCase().includes(searchData.toLowerCase())
                    ).map((e, i) => (
                        <MusicEvent key={i} imgUrl={ensure(e.images.find(item => item.height === 683)).url} eventId={e.id} name={e.name}/>
                    )) : result.results.map((e, i) => (
                        <MusicEvent key={i} imgUrl={ensure(e.images.find(item => item.height === 683)).url} eventId={e.id} name={e.name}/>
                    ))}
                </section>
            </main>
        );
    }
);

export default MusicEvents;