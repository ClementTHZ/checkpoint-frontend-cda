import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { PageLayout } from "./components/Layout";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { DetailCountry } from "./pages/DetailCountry";
import { NewCountryForm } from "./pages/NewCountryForm";

const client = new ApolloClient({
  uri: "/api",
  cache: new InMemoryCache(),
  credentials: "same-origin",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route Component={PageLayout}>
            <Route path="/" Component={HomePage} />
            <Route path="*" Component={() => <Navigate to="/" />} />
            <Route path="/:code" Component={DetailCountry} />
            <Route path="/addCountryForm" Component={NewCountryForm} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}
export default App;
