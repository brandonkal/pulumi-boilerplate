import {
	type InlineProgramArgs,
	LocalWorkspace
} from "@pulumi/pulumi/automation/index.js";
import { deployExample } from "./example/example.js";
import * as process from "node:process";

// Scaffold args used when called directly
const args = process.argv.slice(2);
let auto = false;
let destroy = false;
if (args.length > 0 && args[0]) {
	auto = args[0] === "auto";
}
if (auto && args[1]) {
	destroy = args[1] === "destroy";
}

const run = async () => {
	// Create our stack
	const args: InlineProgramArgs = {
		stackName: "pulumi-boilerplate",
		projectName: "pulumi-boilerplate",
		program: pulumiProgram,
	};

	// create (or select if one already exists) a stack that uses our inline program
	const stack = await LocalWorkspace.createOrSelectStack(args);

	console.info("successfully initialized stack");
	console.info("installing no plugins...");
	// await stack.workspace.installPlugin("aws", "v4.0.0");
	console.info("plugins installed");
	// console.info("setting up config");
	// await stack.setConfig("aws:region", { value: "us-west-2" });
	console.info("config set");
	console.info("refreshing stack...");
	await stack.refresh({ onOutput: console.info });
	console.info("refresh complete");

	if (destroy) {
		console.info("destroying stack...");
		await stack.destroy({ onOutput: console.info });
		console.info("stack destroy complete");
		process.exit(0);
	}

	console.info("updating stack...");
	const upRes = await stack.up({ onOutput: console.info });
	console.log(
		`update summary: \n${JSON.stringify(upRes.summary.resourceChanges, null, 4)}`,
	);
};

// Only run via automation API if argument auto is set. Otherwise, we are being called by the
// Pulumi CLI, which will automatically execute the default export pulumiProgram() function.
if (auto) {
	run().catch((err) => console.log(err));
}

/**
 * pulumiProgram, as the default export is called by the Pulumi CLI runtime
 * We also call it via the automation API above
 * @returns Stack Outputs
 */
export default async function pulumiProgram() {
	/**
	 * Here we call a seperate function, this allows us to seperate a large project into multiple
	 * functions without having to use pulumi.ComponentResource
	 */
	const outs = await deployExample();
	return {
		initialPassword: outs.initialPassword
	};
}
