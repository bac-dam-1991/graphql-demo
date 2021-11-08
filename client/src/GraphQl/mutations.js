import { gql } from "@apollo/client";

export const CREATE_NEW_USER = gql`
	mutation createNewUser(
		$givenName: String!
		$familyName: String!
		$gender: String!
		$email: String!
	) {
		createNewUser(
			givenName: $givenName
			familyName: $familyName
			gender: $gender
			email: $email
		) {
			familyName
			givenName
			id
			email
			gender
		}
	}
`;

export const UPDATE_USER_BY_ID = gql`
	mutation updateUserById(
		$id: Int!
		$givenName: String!
		$familyName: String!
		$gender: String!
		$email: String!
	) {
		updateUserById(
			id: $id
			givenName: $givenName
			familyName: $familyName
			gender: $gender
			email: $email
		) {
			familyName
			givenName
			id
			email
			gender
		}
	}
`;

export const DELETE_USER_BY_ID = gql`
	mutation deleteUserById($id: Int!) {
		deleteUserById(id: $id) {
			id
		}
	}
`;
