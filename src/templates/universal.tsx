import { useState } from 'react';
import { renderToString } from 'react-dom/server';
import { reactWrapper } from '../wrapper';
import fetch from "cross-fetch";
import { AnswersHeadlessProvider } from '@yext/answers-headless-react';
import { SearchBar, UniversalResults, DirectAnswer, ResultsCount, SpellCheck, LocationBias } from '@yext/answers-react-components';

export const config = {
  name: 'universal',
};

export const getPath = (data: any) => {
  return `universal/${Math.random().toString()}`;
};

const answersConfig = {
  apiKey: '3517add824e992916861b76e456724d9',
  experienceKey: 'answers-js-docs',
  locale: 'en',
  experienceVersion: 'PRODUCTION'
};

export const getStaticProps: any = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon/1`;
  const pokemon = await fetch(url)
    .then(res => res.json());

  return pokemon;
};

const Universal = ({ data }: { data: any }) => {
  return (
    <AnswersHeadlessProvider {...answersConfig}>
      <SearchBar />
      <DirectAnswer />
      <SpellCheck />
      <ResultsCount />
      <UniversalResults verticalConfigMap={{}}/>
      <LocationBias />
    </AnswersHeadlessProvider>
  );
};

export const render = (data: any) =>
  reactWrapper(data, 'universal', 'universal.tsx', renderToString(<Universal data={data} />), true);

export default Universal;
