import React, { useEffect, useState } from 'react';
import AppHeaderNavLink from './HeaderNavLink';
import './header.scss';
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { updateId } from '../../state/MusicGenres';
import { updateData } from '../../state/SearchData';

export interface MusicGenre {
  name: string;
  id: string;
}

export interface MusicGenres {
  results: MusicGenre[];
}

export interface Errors {
  error: string;
}


const AppHeader: React.FC = React.memo(
  () => {
    const [result, setResult] = useState<MusicGenres>({
      results: []
    });


    const selectedId = useAppSelector(state => state.genres.id)
    const dispatch = useAppDispatch()

    useEffect(() => {
      fetch('https://app.ticketmaster.com/discovery/v2/classifications/KZFzniwnSyZfZ7v7nJ?apikey=0JIWxBrWrDwCSXZzhD9HKwPngGfGc9fq')
        .then(response => response.json())
        .then(response => setResult({ results: response.segment._embedded.genres }))
        .catch(error => console.log(error));
    }, []);

    const updateSelecteId = (id: string): void => {
      dispatch(updateId(id));
    }

    const updateSearchData = (e: React.FormEvent<HTMLInputElement>) => {
      dispatch(updateData(e.currentTarget.value));
  }

    return (
      <header className="app-header">
        <section className="app-title">
          <h1>Music events</h1>
          <div className="search">
            <span className="fa fa-search"></span>
            <input onChange={updateSearchData} type="search" id="search" placeholder="Search for events..." />
          </div>

        </section>
        <span className="fill-space" />
        <section className="app-links">
          <AppHeaderNavLink key={"all"} id={"KZFzniwnSyZfZ7v7nJ"} name={"All genres"} selectedId={selectedId} updateId={updateSelecteId} />
          {result.results.slice(0, 3).map((e, i) => (
            <AppHeaderNavLink key={i} id={e.id} name={e.name} selectedId={selectedId} updateId={updateSelecteId} />
          ))}
          <AppHeaderNavLink key={"more"} id={""} name={"More..."} selectedId={selectedId} updateId={updateSelecteId} />
        </section>
      </header>
    );
  }
);

export default AppHeader;