import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root',
})
export class AllCountriesService extends Query<Response> {
  document = gql`
    query allCountries {
      allCountries {
        id
        name
      }
    }
  `;
}

interface Response {
  allCountries: Country[];
}
