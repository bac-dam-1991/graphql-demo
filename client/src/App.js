import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	HttpLink,
	from,
} from '@apollo/client';
import { Route, Routes } from 'react-router-dom';
import { UserList } from './Components/UserList';

const App = () => {
	return (
		<Routes>
			<Route path="/users" exact element={<UserList />} />
		</Routes>
	);
};

export default App;
