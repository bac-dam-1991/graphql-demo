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
