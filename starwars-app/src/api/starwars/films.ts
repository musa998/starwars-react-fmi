/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { FilmModel } from 'types/models';

export const getAllFilms = async (): Promise<FilmModel[]> => {
  const res = await axios.get('https://swapi.dev/api/films');
  return res.data.results;
};

export const deleteFilm = async () : Promise<string> => {
  return 'succes';
};