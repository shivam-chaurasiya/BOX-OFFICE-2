import React from 'react'
import Nav from './Nav';
import Title from './Title';

const MainPageLayout = ( {children} ) => {
  return (
    <div>
    <Title title="BOX OFFICE" subtitle="ARE U LOOKING FOR A MOVIE OR AN ACTOR ?"/>
    <Nav/>
     
     { children }
  </div>
  );
};

export default MainPageLayout;
