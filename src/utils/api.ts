// TypeScript declarations for Google Apps Script
declare const google: {
	script: {
		run: {
			withSuccessHandler: (callback: (result: any) => void) => any;
			withFailureHandler: (callback: (error: any) => void) => any;
			[key: string]: any;
		};
	};
};

// Environment detection
const isGASEnvironment = typeof google !== "undefined" && google.script;

// Mock data for local development
function getMockData(functionName: string, args: any[]): any {
	switch (functionName) {
		case "getInboxTasks":
			return {
				success: true,
				data: [
					{ id: "1", name: "Review project proposal", done: false, created_on: new Date().toISOString() },
					{ id: "2", name: "Update documentation", done: false, created_on: new Date().toISOString() },
					{ id: "3", name: "Schedule team meeting", done: false, created_on: new Date().toISOString() },
				],
			};
		case "createInboxTask":
			return {
				success: true,
				data: {
					id: Date.now().toString(),
					name: args[0],
					done: false,
					created_on: new Date().toISOString(),
				},
			};
		case "updateInboxTask":
			return {
				success: true,
				data: { id: args[0], done: args[1] },
			};
		case "deleteInboxTask":
			return {
				success: true,
				data: { id: args[0] },
			};
		case "setSomedayInboxTask":
			return {
				success: true,
				data: { id: args[0] },
			};
		default:
			return { success: false, error: "Unknown function" };
	}
}

// API wrapper method
export function callGASFunction<T>(functionName: string, ...args: any[]): Promise<T> {
	if (isGASEnvironment) {
		// Remote: Execute actual GAS function
		return new Promise((resolve, reject) => {
			google.script.run
				.withSuccessHandler(resolve)
				.withFailureHandler(reject)
				[functionName](...args);
		});
	} else {
		// Local: Return mock data
		console.log(`[Mock] ${functionName}(${JSON.stringify(args)})`);
		return Promise.resolve(getMockData(functionName, args) as T);
	}
}

// Specific API methods
export interface InboxTask {
	id: string;
	name: string;
	done: boolean;
	created_on: string;
}

export interface APIResponse<T> {
	success: boolean;
	data?: T;
	error?: string;
}

export const API = {
	getInboxTasks: () => callGASFunction<APIResponse<InboxTask[]>>("getInboxTasks"),

	createInboxTask: (name: string) => callGASFunction<APIResponse<InboxTask>>("createInboxTask", name),

	updateInboxTask: (id: string, done: boolean) => callGASFunction<APIResponse<{ id: string; done: boolean }>>("updateInboxTask", id, done),

	deleteInboxTask: (id: string) => callGASFunction<APIResponse<{ id: string }>>("deleteInboxTask", id),

	setSomedayInboxTask: (id: string) => callGASFunction<APIResponse<{ id: string }>>("setSomedayInboxTask", id),
};
