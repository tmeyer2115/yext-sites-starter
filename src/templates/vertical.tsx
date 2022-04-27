import { renderToString } from 'react-dom/server';
import { reactWrapper } from '../wrapper';
import fetch from "cross-fetch";
import { AnswersHeadlessProvider, HeadlessConfig } from '@yext/answers-headless-react';
import { SearchBar, StandardCard, DirectAnswer, ResultsCount, SpellCheck, LocationBias, VerticalResults, AppliedFilters, AlternativeVerticals, FilterSearch } from '@yext/answers-react-components';
import { Facets } from '../components/facets';
import { StaticFilters } from '../components/staticfilters';

export const config = {
  name: 'vertical',
};

export const getPath = (data: any) => {
  return `vertical/${Math.random().toString()}`;
};

const answersConfig: HeadlessConfig = {
  apiKey: '3517add824e992916861b76e456724d9',
  experienceKey: 'answers-js-docs',
  locale: 'en',
  experienceVersion: 'PRODUCTION',
  verticalKey: 'locations'
};

export const getStaticProps: any = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon/1`;
  const pokemon = await fetch(url)
    .then(res => res.json());

  return pokemon;
};

const Vertical = ({ data }: { data: any }) => {
  return (
    <AnswersHeadlessProvider {...answersConfig}>
      <SearchBar />
      <div className='flex'>
        <div className='flex-grow'>
          <FilterSearch searchFields={[{fieldApiName: 'services', entityType: 'location'}]}/>
          <StaticFilters />
          <Facets />
        </div>
        <div className='flex-grow'>
          <DirectAnswer />
          <SpellCheck />
          <div className='flex items-baseline'>
            <ResultsCount />
            <AppliedFilters />
          </div>
          <AlternativeVerticals currentVerticalLabel='Locations' verticalConfigMap={{ 
            people: { label: 'People' },
            faqs: { label: 'FAQs' },
            events: { label: 'Events' },
            jobs: { label: 'Jobs' }
          }}/>
          <VerticalResults CardComponent={StandardCard}/>
        </div>
      </div>
      <LocationBias />
    </AnswersHeadlessProvider>
  );
};

export const render = (data: any) =>
  reactWrapper(data, 'vertical', 'vertical.tsx', renderToString(<Vertical data={data} />), true);

export default Vertical;
