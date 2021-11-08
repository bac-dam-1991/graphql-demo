import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Route, Routes } from "react-router-dom";
import { AddEditUserForm } from "./Components/AddEditUserForm";
import { UserList } from "./Components/UserList";
import { UserProfile } from "./Components/UserProfile";

const client = new ApolloClient({
	uri: "/graphql",
	cache: new InMemoryCache(),
});

const App = () => {
	return (
		<ApolloProvider client={client}>
			<Routes>
				<Route path="/users" exact element={<UserList />} />
				<Route path="/users/add" exact element={<AddEditUserForm />} />
				<Route
					path="/users/edit/:id"
					exact
					element={<AddEditUserForm />}
				/>
				<Route path="/users/:id" exact element={<UserProfile />} />
			</Routes>
		</ApolloProvider>
	);
};

export default App;
