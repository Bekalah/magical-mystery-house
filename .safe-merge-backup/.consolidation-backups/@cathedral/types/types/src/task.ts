import { z } from "zod"

import { CathedralEventName } from "./events.js"
import type { CathedralSettings } from "./global-settings.js"
import type { cathedralMessage, QueuedMessage, TokenUsage } from "./message.js"
import type { ToolUsage, ToolName } from "./tool.js"
import type { StaticAppProperties, GitProperties, TelemetryProperties } from "./telemetry.js"
import type { TodoItem } from "./todo.js"

/**
 * TaskProviderLike
 */

export interface TaskProviderLike {
	// Tasks
	getCurrentTask(): TaskLike | undefined
	getRecentTasks(): string[]
	createTask(
		text?: string,
		images?: string[],
		parentTask?: TaskLike,
		options?: CreateTaskOptions,
		configuration?: CathedralSettings,
	): Promise<TaskLike>
	cancelTask(): Promise<void>
	clearTask(): Promise<void>
	resumeTask(taskId: string): void

	// Modes
	getModes(): Promise<{ slug: string; name: string }[]>
	getMode(): Promise<string>
	setMode(mode: string): Promise<void>

	// Provider Profiles
	getProviderProfiles(): Promise<{ name: string; provider?: string }[]>
	getProviderProfile(): Promise<string>
	setProviderProfile(providerProfile: string): Promise<void>

	// Telemetry
	readonly appProperties: StaticAppProperties
	readonly gitProperties: GitProperties | undefined
	getTelemetryProperties(): Promise<TelemetryProperties>
	readonly cwd: string

	// Event Emitter
	on<K extends keyof TaskProviderEvents>(
		event: K,
		listener: (...args: TaskProviderEvents[K]) => void | Promise<void>,
	): this

	off<K extends keyof TaskProviderEvents>(
		event: K,
		listener: (...args: TaskProviderEvents[K]) => void | Promise<void>,
	): this

	// @TODO: Find a better way to do this.
	postStateToWebview(): Promise<void>
}

export type TaskProviderEvents = {
	[CathedralEventName.TaskCreated]: [task: TaskLike]
	[CathedralEventName.TaskStarted]: [taskId: string]
	[CathedralEventName.TaskCompleted]: [taskId: string, tokenUsage: TokenUsage, toolUsage: ToolUsage]
	[CathedralEventName.TaskAborted]: [taskId: string]
	[CathedralEventName.TaskFocused]: [taskId: string]
	[CathedralEventName.TaskUnfocused]: [taskId: string]
	[CathedralEventName.TaskActive]: [taskId: string]
	[CathedralEventName.TaskInteractive]: [taskId: string]
	[CathedralEventName.TaskResumable]: [taskId: string]
	[CathedralEventName.TaskIdle]: [taskId: string]

	[CathedralEventName.TaskPaused]: [taskId: string]
	[CathedralEventName.TaskUnpaused]: [taskId: string]
	[CathedralEventName.TaskSpawned]: [taskId: string]

	[CathedralEventName.TaskUserMessage]: [taskId: string]

	[CathedralEventName.TaskTokenUsageUpdated]: [taskId: string, tokenUsage: TokenUsage]

	[CathedralEventName.ModeChanged]: [mode: string]
	[CathedralEventName.ProviderProfileChanged]: [config: { name: string; provider?: string }]
}

/**
 * TaskLike
 */

export interface CreateTaskOptions {
	enableDiff?: boolean
	enableCheckpoints?: boolean
	fuzzyMatchThreshold?: number
	consecutiveMistakeLimit?: number
	experiments?: Record<string, boolean>
	initialTodos?: TodoItem[]
}

export enum TaskStatus {
	Running = "running",
	Interactive = "interactive",
	Resumable = "resumable",
	Idle = "idle",
	None = "none",
}

export const taskMetadataSchema = z.object({
	task: z.string().optional(),
	images: z.array(z.string()).optional(),
})

export type TaskMetadata = z.infer<typeof taskMetadataSchema>

export interface TaskLike {
	readonly taskId: string
	readonly rootTaskId?: string
	readonly parentTaskId?: string
	readonly childTaskId?: string
	readonly metadata: TaskMetadata
	readonly taskStatus: TaskStatus
	readonly taskAsk: cathedralMessage | undefined
	readonly queuedMessages: QueuedMessage[]
	readonly tokenUsage: TokenUsage | undefined

	on<K extends keyof TaskEvents>(event: K, listener: (...args: TaskEvents[K]) => void | Promise<void>): this
	off<K extends keyof TaskEvents>(event: K, listener: (...args: TaskEvents[K]) => void | Promise<void>): this

	approveAsk(options?: { text?: string; images?: string[] }): void
	denyAsk(options?: { text?: string; images?: string[] }): void
	submitUserMessage(text: string, images?: string[], mode?: string, providerProfile?: string): Promise<void>
	abortTask(): void
}

export type TaskEvents = {
	// Task Lifecycle
	[CathedralEventName.TaskStarted]: []
	[CathedralEventName.TaskCompleted]: [taskId: string, tokenUsage: TokenUsage, toolUsage: ToolUsage]
	[CathedralEventName.TaskAborted]: []
	[CathedralEventName.TaskFocused]: []
	[CathedralEventName.TaskUnfocused]: []
	[CathedralEventName.TaskActive]: [taskId: string]
	[CathedralEventName.TaskInteractive]: [taskId: string]
	[CathedralEventName.TaskResumable]: [taskId: string]
	[CathedralEventName.TaskIdle]: [taskId: string]

	// Subtask Lifecycle
	[CathedralEventName.TaskPaused]: [taskId: string]
	[CathedralEventName.TaskUnpaused]: [taskId: string]
	[CathedralEventName.TaskSpawned]: [taskId: string]

	// Task Execution
	[CathedralEventName.Message]: [{ action: "created" | "updated"; message: cathedralMessage }]
	[CathedralEventName.TaskModeSwitched]: [taskId: string, mode: string]
	[CathedralEventName.TaskAskResponded]: []
	[CathedralEventName.TaskUserMessage]: [taskId: string]

	// Task Analytics
	[CathedralEventName.TaskToolFailed]: [taskId: string, tool: ToolName, error: string]
	[CathedralEventName.TaskTokenUsageUpdated]: [taskId: string, tokenUsage: TokenUsage]
}
