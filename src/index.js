import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";
import jsCookies from 'js-cookies';
import {setContext} from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
<<<<<<< HEAD
  uri: 'http://3.36.229.240:4000',
=======
  uri: 'http://3.36.229.240:4000/',
>>>>>>> 63b39241001a6c730a329c56502ea31b0baf1a3e
});

const authLink = setContext((_, {headers}) => {
  const token = jsCookies.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token !== null? `Bearer ${token}` : "",
    }
  }
});

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: authLink.concat(errorLink).concat(httpLink),
  cache: new InMemoryCache()
});


<<<<<<< HEAD
const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(  
<React.StrictMode>
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
</React.StrictMode>
);

=======
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
);
>>>>>>> 63b39241001a6c730a329c56502ea31b0baf1a3e
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
reportWebVitals();