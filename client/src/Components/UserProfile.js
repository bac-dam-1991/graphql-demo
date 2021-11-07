import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GET_USER_BY_ID } from "../GraphQl/queries";

export const UserProfile = () => {
	const { id } = useParams();

	const { data, loading } = useQuery(GET_USER_BY_ID, {
		variables: { id: parseInt(id) },
	});
	const [user, setUser] = useState(null);

	useEffect(() => {
		if (!data) {
			return;
		}
		setUser(data.getUserById);
	}, [data]);

	return (
		<div>
			{loading && <div>Loading...</div>}
			{user && (
				<>
					<h1>
						{user.familyName.toUpperCase()}, {user.givenName}
					</h1>
					<div>{user.id}</div>
					<div>{user.gender}</div>
					<div>{user.email}</div>
				</>
			)}
		</div>
	);
};
