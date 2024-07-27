export class Vector2InstanceError extends Error {
	constructor(paramName: string, paramValue: unknown) {
		const message = `Name: ${paramName}\nValue: ${paramValue}\nError: ${paramName} is not an instance of Vector2 class.`;
		super(message);
		this.name = "Vector2InstanceError";
	}
}
