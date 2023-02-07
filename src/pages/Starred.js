import React,{ useState, useEffect } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useShows } from '../misc/custom-hooks';

function Starred() {

  const [starred] = useShows();

  const[shows, setShows] = useState(null);
  const[isLoading, setIsLoading] = useState(true);
  const[error, setError] = useState(null);

  useEffect(() => {
  
   if(starred && starred.length > 0){
   const promises = starred.map(showId => apiGet(`/shows/${ showId }`))
   Promise.all(promises)
   .then(apiData => apiData.map(show => ({show})))
   .then (results => {
    console.log('results', results);

    setShows(results);
    setIsLoading(false);
   }).catch(err => {
    setError(err.message);
    setIsLoading(false);
   });
   }
   else{
    setIsLoading(false);
   }

  }, [starred]);

  return <MainPageLayout>{isLoading && <div> Shows are still loading</div>} 
  { error && <div> ERROR OCCURED : {error} </div>}
  {!isLoading && !shows && <div>NO SHOW WERE ADDED</div>}
  {!isLoading && !error && shows && <ShowGrid data={shows}/>}
  </MainPageLayout>;
    
};

export default Starred;
