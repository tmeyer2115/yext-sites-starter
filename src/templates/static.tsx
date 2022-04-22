import { useState } from 'react';
import { renderToString } from 'react-dom/server';
import { reactWrapper } from '../wrapper';
import fetch from "cross-fetch";
import { AnswersHeadlessProvider } from '@yext/answers-headless-react';
import { SearchBar, UniversalResults } from '@yext/answers-react-components';

export const config = {
  name: 'static',
};

export const getPath = (data: any) => {
  return `static/${Math.random().toString()}`;
};

const answersConfig = {
  apiKey: '2d8c550071a64ea23e263118a2b0680b',
  experienceKey: 'slanswers',
  locale: 'en',
  experienceVersion: 'PRODUCTION'
};

export const getStaticProps: any = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon/1`;
  const pokemon = await fetch(url)
    .then(res => res.json());

  return pokemon;
};

const Static = ({ data }: { data: any }) => {
  const { document } = data;
  const { streamOutput } = document;
  const { name } = streamOutput;

  const [num, setNum] = useState<number>(0);

  return (
    <AnswersHeadlessProvider {...answersConfig}>
      <SearchBar />
      <UniversalResults verticalConfigMap={{}}
      />
    </AnswersHeadlessProvider>
  );
};

export const render = (data: any) =>
  reactWrapper(data, 'static', 'static.tsx', renderToString(<Static data={data} />), true);

export default Static;
