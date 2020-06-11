import axios from 'axios';
import { PeopleModel } from 'types/models';

export const getAllPeople = async (): Promise<PeopleModel[]> => {
  const res = await axios.get('https://swapi.dev/api/people');
  return res.data.results;
};