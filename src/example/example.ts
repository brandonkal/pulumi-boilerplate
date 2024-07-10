import * as pulumi from "@pulumi/pulumi";
import * as random from "@pulumi/random";

/** Example is a component of the deployment stack */
export async function deployExample() {

	const password = new random.RandomPassword("initialpassword", {
		length: 16,
	});

	return {
		initialPassword: password.result,
	};
}
