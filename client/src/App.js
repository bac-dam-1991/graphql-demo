import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Route, Routes } from "react-router-dom";
import { UserList } from "./Components/UserList";

const client = new ApolloClient({
	uri: "http://localhost:6969/graphql",
	cache: new InMemoryCache(),
});

const App = () => {
	return (
		<ApolloProvider client={client}>
			<Routes>
				<Route path="/users" exact element={<UserList />} />
			</Routes>
		</ApolloProvider>
	);
};

export default App;
