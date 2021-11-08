import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DELETE_USER_BY_ID } from "../GraphQl/mutations";
import { GET_USER_BY_ID } from "../GraphQl/queries";

export const UserProfile = () => {
	const { id } = useParams();

	const { data: userData, loading } = useQuery(GET_USER_BY_ID, {
		variables: { id: parseInt(id) },
	});
	const [user, setUser] = useState(null);

	useEffect(() => {
		if (!userData) {
			return;
		}
		setUser(userData.getUserById);
	}, [userData]);

	const navigate = useNavigate();

	const [deleteUser, { loading: deleteLoading }] =
		useMutation(DELETE_USER_BY_ID);

	const editUser = () => {
		navigate(`/users/edit/${id}`);
	};

	const handleDeleteButtonClick = async () => {
		await deleteUser({ variables: { id: parseInt(id) } });
		navigate("/users/add");
	};

	const handleAddNewUserClick = () => {
		navigate("/users/add");
	};

	return (
		<div>
			{loading && <div>Loading...</div>}
			{user ? (
				<>
					<h1>
						{user.familyName.toUpperCase()}, {user.givenName}
					</h1>
					<div>{user.id}</div>
					<div>{user.gender}</div>
					<div>{user.email}</div>
					<button onClick={editUser} disabled={deleteLoading}>
						Edit
					</button>
					<button
						onClick={handleDeleteButtonClick}
						disabled={deleteLoading}
					>
						Delete
					</button>
				</>
			) : (
				<div>
					<p>No user matching id {id}</p>
					<button onClick={handleAddNewUserClick}>
						Add new user
					</button>
				</div>
			)}
		</div>
	);
};
