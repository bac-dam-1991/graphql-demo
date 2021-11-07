import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_ALL_USERS } from "../GraphQl/queries";

export const UserList = () => {
	const { loading, data } = useQuery(GET_ALL_USERS);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		if (!data) {
			return;
		}
		setUsers(data.getAllUsers);
	}, [data]);

	return (
		<div>
			<h1>User list</h1>
			{loading && <div>Loading...</div>}
			{users.map((u) => {
				return (
					<div key={u.id}>
						{u.familyName}, {u.givenName}
					</div>
				);
			})}
		</div>
	);
};
