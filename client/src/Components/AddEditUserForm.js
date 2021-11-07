import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CREATE_NEW_USER } from "../GraphQl/mutations";
import { useNavigate } from "react-router-dom";

export const AddEditUserForm = () => {
	const navigate = useNavigate();

	const { register, handleSubmit } = useForm({
		defaultValues: {
			givenName: "Bac",
			familyName: "Dam",
			gender: "Male",
			email: "bac.dam.1991@gmail.com",
		},
	});
	const [addUser, { data, loading }] = useMutation(CREATE_NEW_USER);

	const onSubmit = (formData) => {
		console.log({ formData });
		addUser({
			variables: formData,
		});
	};

	useEffect(() => {
		if (!data) {
			return;
		}
		navigate(`/users/${data.createNewUser.id}`);
	}, [data, navigate]);

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
				/>
				<input
					type="text"
					{...register("familyName")}
					placeholder="Family name"
				/>
				<input type="text" {...register("email")} placeholder="Email" />
				<input
					type="text"
					{...register("gender")}
					placeholder="Gender"
					disabled={loading}
				/>
				<input type="submit" value="Save" />
			</form>
		</>
	);
};
