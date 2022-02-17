import React from 'react';
import { Link } from 'react-router-dom';
import { IEventAddress } from '../../models/Event';
import EventListItem from './EventListItem';
import classes from './EventList.module.css';

const EventList = () => {
  return (
    <>
      <div>
        {/* <EventListItem
          id={1}
          key={1}
          proceedings_time={new Date()}
          name="first meeting ever"
          note={null}
          going={['Fero', 'Jozo', 'Ignac']}
          interested={['Maros']}
          address={null}
          created_at={new Date()}
          creator="Veducko"
        />
        <EventListItem
          id={2}
          key={2}
          datetime={new Date()}
          note="nothing special to say"
          name="first meeting ever"
          going={[]}
          interested={['Mudr', 'Hovnocuc']}
          address={{
            id: 1,
            street: 'klacelova',
            street_number: '293/2',
            country: 'Czech Republic',
            city: 'Brno',
          }}
          created_at={new Date()}
          creator="Veducko"
        /> */}
      </div>
      <div className={classes['new-event__link']}>
        <Link to="/new-meeting">Create a new Meeting</Link>
      </div>
    </>
  );
};

export default EventList;
