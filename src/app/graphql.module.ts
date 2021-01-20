import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import {
  ApolloClientOptions,
  ApolloLink,
  InMemoryCache,
  split,
} from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../environments/environment';
import { onError } from '@apollo/client/link/error';
import { createPersistedQueryLink } from 'apollo-angular/persisted-queries';
import { sha256 } from 'crypto-hash';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const uri = environment.apiUrl; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.forEach(({ message, locations, path }) => {
            console.error(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
          });
        }

        if (networkError) {
          console.error(`[Network error]: ${networkError.message}`);
        }
      }),
      createPersistedQueryLink({ sha256 }),
      split(
        ({ query }) => {
          const mainDefinition = getMainDefinition(query);
          return (
            mainDefinition.kind === 'OperationDefinition' &&
            mainDefinition.operation === 'subscription'
          );
        },
        new WebSocketLink({
          uri: environment.wsUrl,
          options: {
            reconnect: true,
            lazy: true,
          },
        }),
        httpLink.create({ uri, withCredentials: true, useMultipart: true })
      ),
    ]),
    cache: new InMemoryCache({
      addTypename: false,
    }),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
