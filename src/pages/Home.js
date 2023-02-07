import React, {useState} from 'react';
import ActorGrid from '../components/Actor/ActorGrid';
import CustomRadio from '../components/CustomRadio';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import {apiGet} from '../misc/config'
import { useLastQuery } from '../misc/custom-hooks';
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from './Home.styled';

function Home() {
    const [input, setInput] = useLastQuery();
    const [results, setResults] = useState(null);
    const [searchOption, setSearchOption] =useState('shows');

    const isshowsearch = searchOption ==='shows';

    const oninputchange = ev =>{
        setInput(ev.target.value);
    };

    const onsearch = () => {
       apiGet(`/search/${searchOption}?q=${input}`).then(result => {
        setResults(result);
      });
    };
     
    const onkeydown = ev => {
        if(ev.keyCode === 13){
           onsearch()
        }
       };

    const renderResults = () =>{
    
        if(results && results.length === 0){
          return <div> NO RESULT </div>;
        }
        if(results && results.length > 0){
          return results[0].show 
          ? (<ShowGrid data={results} />)
          : (<ActorGrid data={results} />)
         
        }

        return null ;
    };

    const onradiochange = (ev) => {
     setSearchOption(ev.target.value)
    }
    console.log(searchOption);
   
return <MainPageLayout>
    <SearchInput type="text"  placeholder="Search for something" onChange={oninputchange} value={input} onKeyDown={onkeydown}/>
    <RadioInputsWrapper>
   <div>

    <CustomRadio
    label="Shows"
    id="show search"  value="shows" checked={isshowsearch} onChange={onradiochange}
    />

   </div>
   <div>
   
   <CustomRadio
    label="Actors"
    id="actor search"  value="people" checked={!isshowsearch} onChange={onradiochange} 
    />
    
   </div>
    </RadioInputsWrapper>
    <SearchButtonWrapper>

    <button type="button" onClick={onsearch}> SEARCH </button>
    </SearchButtonWrapper>
    {renderResults()}
  </MainPageLayout>;
};

export default Home;
