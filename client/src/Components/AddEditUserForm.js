import { useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CREATE_NEW_USER, UPDATE_USER_BY_ID } from "../GraphQl/mutations";
import { useNavigate, useParams } from "react-router-dom";
import { GET_USER_BY_ID } from "../GraphQl/queries";

export const AddEditUserForm = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const { data: userData } = useQuery(GET_USER_BY_ID, {
		variables: { id: parseInt(id) },
	});

	const { register, handleSubmit, reset } = useForm();
	const [mutateUser, { data, loading }] = useMutation(
		id ? UPDATE_USER_BY_ID : CREATE_NEW_USER
	);

	const onSubmit = (formData) => {
		const payload = {
			...formData,
		};

		if (id) {
			payload.id = parseInt(id);
		}

		mutateUser({
			variables: payload,
		});
	};

	useEffect(() => {
		if (!userData) {
			return;
		}
		reset(userData.getUserById);
	}, [userData, reset]);

	useEffect(() => {
		if (!data) {
			return;
		}
		const userId = id || data.createNewUser.id;
		navigate(`/users/${userId}`);
	}, [data, navigate, id]);

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "8px",
					maxWidth: 400,
					margin: "auto",
				}}
			>
				<input
					type="text"
					{...register("givenName")}
					placeholder="Given name"
					autoFocus
					disabled={loading}
				/>
				<input
					type="text"
					{...register("familyName")}
					placeholder="Family name"
					disabled={loading}
				/>
				<input
					type="text"
					{...register("email")}
					placeholder="Email"
					disabled={loading}
				/>
				<input
					type="text"
					{...register("gender")}
					placeholder="Gender"
					disabled={loading}
				/>
				<input type="submit" value="Save" disabled={loading} />
			</form>
		</>
	);
};
