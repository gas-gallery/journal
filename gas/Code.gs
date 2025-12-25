// Google Apps Script backend

// Web application publish function
function doGet() {
	return HtmlService.createHtmlOutputFromFile("index").setTitle("Task Management").setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Task management spreadsheet configuration
const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID"; // Set your spreadsheet ID here
const SHEET_NAME = "Tasks";

// Get all tasks
function getTasks() {
	try {
		const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
		if (!sheet) {
			return { success: false, error: "Sheet not found" };
		}

		const data = sheet.getDataRange().getValues();
		const headers = data[0];
		const tasks = [];

		for (let i = 1; i < data.length; i++) {
			const row = data[i];
			tasks.push({
				id: row[0],
				title: row[1],
				description: row[2],
				status: row[3],
				dueDate: row[4],
				createdAt: row[5],
				updatedAt: row[6],
			});
		}

		return { success: true, data: tasks };
	} catch (error) {
		return { success: false, error: error.toString() };
	}
}

// Create new task
function createTask(task) {
	try {
		const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
		if (!sheet) {
			return { success: false, error: "Sheet not found" };
		}

		const id = Utilities.getUuid();
		const now = new Date();

		sheet.appendRow([id, task.title, task.description, task.status || "todo", task.dueDate, now, now]);

		return { success: true, data: { id, ...task, createdAt: now, updatedAt: now } };
	} catch (error) {
		return { success: false, error: error.toString() };
	}
}

// Update task
function updateTask(id, updates) {
	try {
		const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
		if (!sheet) {
			return { success: false, error: "Sheet not found" };
		}

		const data = sheet.getDataRange().getValues();

		for (let i = 1; i < data.length; i++) {
			if (data[i][0] === id) {
				const now = new Date();
				if (updates.title !== undefined) sheet.getRange(i + 1, 2).setValue(updates.title);
				if (updates.description !== undefined) sheet.getRange(i + 1, 3).setValue(updates.description);
				if (updates.status !== undefined) sheet.getRange(i + 1, 4).setValue(updates.status);
				if (updates.dueDate !== undefined) sheet.getRange(i + 1, 5).setValue(updates.dueDate);
				sheet.getRange(i + 1, 7).setValue(now);

				return { success: true, data: { id, ...updates, updatedAt: now } };
			}
		}

		return { success: false, error: "Task not found" };
	} catch (error) {
		return { success: false, error: error.toString() };
	}
}

// Delete task
function deleteTask(id) {
	try {
		const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
		if (!sheet) {
			return { success: false, error: "Sheet not found" };
		}

		const data = sheet.getDataRange().getValues();

		for (let i = 1; i < data.length; i++) {
			if (data[i][0] === id) {
				sheet.deleteRow(i + 1);
				return { success: true };
			}
		}

		return { success: false, error: "Task not found" };
	} catch (error) {
		return { success: false, error: error.toString() };
	}
}

// Initialize task sheet
function initializeSheet() {
	try {
		const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
		let sheet = ss.getSheetByName(SHEET_NAME);

		if (!sheet) {
			sheet = ss.insertSheet(SHEET_NAME);
			sheet.appendRow(["ID", "Title", "Description", "Status", "Due Date", "Created At", "Updated At"]);
			sheet.getRange(1, 1, 1, 7).setFontWeight("bold");
		}

		return { success: true, message: "Sheet initialized" };
	} catch (error) {
		return { success: false, error: error.toString() };
	}
}
