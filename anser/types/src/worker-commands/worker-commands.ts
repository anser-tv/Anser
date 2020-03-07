import { JobRunConfig } from '../job/job-run-config'

export const enum WorkerCommandType {
	SendSystemInfo = 'SEND_SYSTEM_INFO',
	SendCaptureDevices = 'SEND_CAPTURE_DEVICES',
	CheckJobCanRun = 'CHECK_JOB_CAN_RUN',
	ListFunctions = 'LIST_FUNCTIONS'
}

export interface WorkerCommandBase {
	commandId: string
	type: WorkerCommandType
}

export interface WorkerCommandSendSystemInfo extends WorkerCommandBase {
	type: WorkerCommandType.SendSystemInfo
}

export interface WorkerCommandSendCaptureDevices extends WorkerCommandBase {
	type: WorkerCommandType.SendCaptureDevices
}

export interface WorkerCommandCheckJobCanRun extends WorkerCommandBase {
	type: WorkerCommandType.CheckJobCanRun
	jobId: string
	job: JobRunConfig
}

export interface WorkerCommandListFunctions extends WorkerCommandBase {
	type: WorkerCommandType.ListFunctions
}

export type WorkerCommand =
	WorkerCommandSendSystemInfo |
	WorkerCommandSendCaptureDevices |
	WorkerCommandCheckJobCanRun |
	WorkerCommandListFunctions