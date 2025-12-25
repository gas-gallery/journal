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
		case "getProjects":
			return {
				success: true,
				data: [
					{ id: "1", name: "Website Redesign" },
					{ id: "2", name: "Mobile App Development" },
					{ id: "3", name: "Marketing Campaign" },
				],
			};
		case "createProject":
			return {
				success: true,
				data: {
					id: Date.now().toString(),
					name: args[0],
				},
			};
		case "getProjectTasks":
			return {
				success: true,
				data: [
					{
						project_id: "1",
						project_name: "Website Redesign",
						milestone_id: "2",
						milestone_name: "Phase 2",
						task_id: "1",
						task_name: "Design homepage mockup",
						description: "Create wireframes and visual design",
					},
					{
						project_id: "1",
						project_name: "Website Redesign",
						milestone_id: "2",
						milestone_name: "Phase 2",
						task_id: "2",
						task_name: "Implement responsive layout",
						description: "Make design mobile-friendly",
					},
					{
						project_id: "1",
						project_name: "Website Redesign",
						milestone_id: "1",
						milestone_name: "Phase 1",
						task_id: "3",
						task_name: "Research competitors",
						description: "Analyze 5 competitor websites",
					},
					{
						project_id: "2",
						project_name: "Mobile App Development",
						milestone_id: "3",
						milestone_name: "MVP",
						task_id: "4",
						task_name: "Setup development environment",
						description: "Install tools and dependencies",
					},
				],
			};
		case "updateProjectName":
			return {
				success: true,
				data: { id: args[0], name: args[1] },
			};
		case "updateMilestoneName":
			return {
				success: true,
				data: { id: args[0], name: args[1] },
			};
		case "updateTaskName":
			return {
				success: true,
				data: { id: args[0], name: args[1] },
			};
		case "updateTaskDescription":
			return {
				success: true,
				data: { id: args[0], description: args[1] },
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

export interface Project {
	id: string;
	name: string;
}

export interface ProjectTask {
	project_id: string;
	project_name: string;
	milestone_id: string | null;
	milestone_name: string | null;
	task_id: string;
	task_name: string;
	description: string | null;
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

	getProjects: () => callGASFunction<APIResponse<Project[]>>("getProjects"),

	createProject: (name: string) => callGASFunction<APIResponse<Project>>("createProject", name),

	getProjectTasks: () => callGASFunction<APIResponse<ProjectTask[]>>("getProjectTasks"),

	updateProjectName: (id: string, name: string) => callGASFunction<APIResponse<{ id: string; name: string }>>("updateProjectName", id, name),

	updateMilestoneName: (id: string, name: string) => callGASFunction<APIResponse<{ id: string; name: string }>>("updateMilestoneName", id, name),

	updateTaskName: (id: string, name: string) => callGASFunction<APIResponse<{ id: string; name: string }>>("updateTaskName", id, name),

	updateTaskDescription: (id: string, description: string) => callGASFunction<APIResponse<{ id: string; description: string }>>("updateTaskDescription", id, description),
};
