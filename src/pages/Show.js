import React from 'react';
import {useParams} from 'react-router-dom';
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMaindata from '../components/show/ShowMaindata';

import { useShow } from '../misc/custom-hooks';
import { InfoBlock, ShowPageWrapper } from './Show.Styled';

const Show = () => {

    const { id } = useParams();

    const{show, isLoading, error } = useShow(id);

if(isLoading){
    return <div>Data is loaded</div>;
}

if(error){
    return <div> Error Ocured :{error}</div>;
}

  return (

    <ShowPageWrapper>
     <ShowMaindata image={show.image} name={show.name} rating={show.rating} summary={show.summary} tags={show.genres} />
     <InfoBlock >
        <h2>DETAILS</h2>
        <Details status={show.status} network={show.network} premiered={show.premiered}/>
     </InfoBlock>

     <InfoBlock v>
        <h2>SEASONS</h2>
        <Seasons seasons={show._embedded.seasons}/>
     </InfoBlock>

     <InfoBlock >
        <h2>CAST</h2>
        <Cast cast={show._embedded.cast}/>
     </InfoBlock>
    </ShowPageWrapper>
  )
};

export default Show ;
