import React, { useEffect, useState, Fragment } from 'react';
import MusicEventDetails from './musicEventDetails';

export type EventDetails = {
    id: string;
};


export interface Images {
    url: string
    width: number
}

export interface Info {
    details: {
        name: string,
        images: Images[],
        dates: {
            start: {
                localDate: string;
                localTime: string
            }
        },
        _embedded: {
            venues: Venues[]
        },

    }
}

export interface Venues {
    name: string,
    city: {
        name: string
    },
    country: {
        name: string
    }
}


const MusicEventFetch: React.FC<EventDetails> = React.memo(
    ({ id }) => {
        const [eventDetails, setDetails] = useState<Info>({
            details: {
                name: "",
                images: [],
                dates: {
                    start: {
                        localDate: "",
                        localTime: ""
                    }
                },
                _embedded: {
                    venues: []
                },

            }
        });

        const [loaded, setloaded] = useState<boolean>(false);

        useEffect(() => {
            fetch(`https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=0JIWxBrWrDwCSXZzhD9HKwPngGfGc9fq`)
                .then(response => response.json())
                .then(response => {
                    setDetails({ details: response })
                    setloaded(true)
                })
                .catch(error => {
                    console.log(error)
                    setloaded(false)
                });
        }, [id]);

        function ensure<T>(argument: T | undefined | null, message: string = 'This value was promised to be there.'): T {
            if (argument === undefined || argument === null) {
                throw new TypeError(message);
            }
            return argument;
        }

        return (
            <Fragment>
                {loaded &&
                    <MusicEventDetails country={eventDetails.details._embedded.venues[0].country.name}
                        city={eventDetails.details._embedded.venues[0].city.name} place={eventDetails.details._embedded.venues[0].name}
                        localTime={eventDetails.details.dates.start.localTime} name={eventDetails.details.name} images={ensure(eventDetails.details.images.sort(function(a, b) {
                            return a.width - b.width;
                        }).find(item => item.width > window.innerWidth )).url}
                        localDate={eventDetails.details.dates.start.localDate} />
                }
            </Fragment>
        );
    }
);

export default MusicEventFetch;