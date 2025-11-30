import { z } from "zod"

import { cathedralMessageSchema, tokenUsageSchema } from "./message.js"
import { toolNamesSchema, toolUsageSchema } from "./tool.js"

/**
 * CathedralEventName
 */

export enum CathedralEventName {
	// Task Provider Lifecycle
	TaskCreated = "taskCreated",

	// Task Lifecycle
	TaskStarted = "taskStarted",
	TaskCompleted = "taskCompleted",
	TaskAborted = "taskAborted",
	TaskFocused = "taskFocused",
	TaskUnfocused = "taskUnfocused",
	TaskActive = "taskActive",
	TaskInteractive = "taskInteractive",
	TaskResumable = "taskResumable",
	TaskIdle = "taskIdle",

	// Subtask Lifecycle
	TaskPaused = "taskPaused",
	TaskUnpaused = "taskUnpaused",
	TaskSpawned = "taskSpawned",

	// Task Execution
	Message = "message",
	TaskModeSwitched = "taskModeSwitched",
	TaskAskResponded = "taskAskResponded",
	TaskUserMessage = "taskUserMessage",

	// Task Analytics
	TaskTokenUsageUpdated = "taskTokenUsageUpdated",
	TaskToolFailed = "taskToolFailed",

	// Configuration Changes
	ModeChanged = "modeChanged",
	ProviderProfileChanged = "providerProfileChanged",

	// Evals
	EvalPass = "evalPass",
	EvalFail = "evalFail",
}

/**
 * CathedralEvents
 */

export const CathedralEventsSchema = z.object({
	[CathedralEventName.TaskCreated]: z.tuple([z.string()]),

	[CathedralEventName.TaskStarted]: z.tuple([z.string()]),
	[CathedralEventName.TaskCompleted]: z.tuple([
		z.string(),
		tokenUsageSchema,
		toolUsageSchema,
		z.object({
			isSubtask: z.boolean(),
		}),
	]),
	[CathedralEventName.TaskAborted]: z.tuple([z.string()]),
	[CathedralEventName.TaskFocused]: z.tuple([z.string()]),
	[CathedralEventName.TaskUnfocused]: z.tuple([z.string()]),
	[CathedralEventName.TaskActive]: z.tuple([z.string()]),
	[CathedralEventName.TaskInteractive]: z.tuple([z.string()]),
	[CathedralEventName.TaskResumable]: z.tuple([z.string()]),
	[CathedralEventName.TaskIdle]: z.tuple([z.string()]),

	[CathedralEventName.TaskPaused]: z.tuple([z.string()]),
	[CathedralEventName.TaskUnpaused]: z.tuple([z.string()]),
	[CathedralEventName.TaskSpawned]: z.tuple([z.string(), z.string()]),

	[CathedralEventName.Message]: z.tuple([
		z.object({
			taskId: z.string(),
			action: z.union([z.literal("created"), z.literal("updated")]),
			message: cathedralMessageSchema,
		}),
	]),
	[CathedralEventName.TaskModeSwitched]: z.tuple([z.string(), z.string()]),
	[CathedralEventName.TaskAskResponded]: z.tuple([z.string()]),
	[CathedralEventName.TaskUserMessage]: z.tuple([z.string()]),

	[CathedralEventName.TaskToolFailed]: z.tuple([z.string(), toolNamesSchema, z.string()]),
	[CathedralEventName.TaskTokenUsageUpdated]: z.tuple([z.string(), tokenUsageSchema]),

	[CathedralEventName.ModeChanged]: z.tuple([z.string()]),
	[CathedralEventName.ProviderProfileChanged]: z.tuple([z.object({ name: z.string(), provider: z.string() })]),
})

export type CathedralEvents = z.infer<typeof CathedralEventsSchema>

/**
 * TaskEvent
 */

export const taskEventSchema = z.discriminatedUnion("eventName", [
	// Task Provider Lifecycle
	z.object({
		eventName: z.literal(CathedralEventName.TaskCreated),
		payload: CathedralEventsSchema.shape[CathedralEventName.TaskCreated],
		taskId: z.number().optional(),
	}),

	// Task Lifecycle
	z.object({
		eventName: z.literal(CathedralEventName.TaskStarted),
		payload: CathedralEventsSchema.shape[CathedralEventName.TaskStarted],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(CathedralEventName.TaskCompleted),
		payload: CathedralEventsSchema.shape[CathedralEventName.TaskCompleted],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(CathedralEventName.TaskAborted),
		payload: CathedralEventsSchema.shape[CathedralEventName.TaskAborted],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(CathedralEventName.TaskFocused),
		payload: CathedralEventsSchema.shape[CathedralEventName.TaskFocused],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(CathedralEventName.TaskUnfocused),
		payload: CathedralEventsSchema.shape[CathedralEventName.TaskUnfocused],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(CathedralEventName.TaskActive),
		payload: CathedralEventsSchema.shape[CathedralEventName.TaskActive],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(CathedralEventName.TaskInteractive),
		payload: CathedralEventsSchema.shape[CathedralEventName.TaskInteractive],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(CathedralEventName.TaskResumable),
		payload: CathedralEventsSchema.shape[CathedralEventName.TaskResumable],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(CathedralEventName.TaskIdle),
		payload: CathedralEventsSchema.shape[CathedralEventName.TaskIdle],
		taskId: z.number().optional(),
	}),

	// Subtask Lifecycle
	z.object({
		eventName: z.literal(CathedralEventName.TaskPaused),
		payload: CathedralEventsSchema.shape[CathedralEventName.TaskPaused],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(CathedralEventName.TaskUnpaused),
		payload: CathedralEventsSchema.shape[CathedralEventName.TaskUnpaused],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(CathedralEventName.TaskSpawned),
		payload: CathedralEventsSchema.shape[CathedralEventName.TaskSpawned],
		taskId: z.number().optional(),
	}),

	// Task Execution
	z.object({
		eventName: z.literal(CathedralEventName.Message),
		payload: CathedralEventsSchema.shape[CathedralEventName.Message],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(CathedralEventName.TaskModeSwitched),
		payload: CathedralEventsSchema.shape[CathedralEventName.TaskModeSwitched],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(CathedralEventName.TaskAskResponded),
		payload: CathedralEventsSchema.shape[CathedralEventName.TaskAskResponded],
		taskId: z.number().optional(),
	}),

	// Task Analytics
	z.object({
		eventName: z.literal(CathedralEventName.TaskToolFailed),
		payload: CathedralEventsSchema.shape[CathedralEventName.TaskToolFailed],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(CathedralEventName.TaskTokenUsageUpdated),
		payload: CathedralEventsSchema.shape[CathedralEventName.TaskTokenUsageUpdated],
		taskId: z.number().optional(),
	}),

	// Evals
	z.object({
		eventName: z.literal(CathedralEventName.EvalPass),
		payload: z.undefined(),
		taskId: z.number(),
	}),
	z.object({
		eventName: z.literal(CathedralEventName.EvalFail),
		payload: z.undefined(),
		taskId: z.number(),
	}),
])

export type TaskEvent = z.infer<typeof taskEventSchema>
