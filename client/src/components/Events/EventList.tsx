import React from 'react';
import { IEventAddress } from '../../models/Event';
import EventListItem from './EventListItem';

const EventList = () => {

  return (
    <div>
      <EventListItem
        id={1}
        key={1}
        datetime={new Date()}
        name="first meeting ever"
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
        name="first meeting ever"
        going={[]}
        interested={["Mudr", 'Hovnocuc']}
        address={{
          id: 1,
          street: 'klacelova',
          street_number: "293/2",
          country: 'Czech Republic',
          city: 'Brno',
        }}
        created_at={new Date()}
        creator="Veducko"
      />
    </div>
  );
};

export default EventList;
