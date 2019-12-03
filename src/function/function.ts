import winston = require('winston')
import { logger as anserlog } from '../logger/logger'
import { FunctionConfig, FunctionDescription, VideoIO } from './description'

export enum FunctionStatus {
	NOTUSED = 'NOTUSED', // Created but no action has been run
	CHECKING = 'CHECKING', // Checking if can run
	RUNNING = 'RUNNING',
	STOPPED = 'STOPPED',
	ERROR = 'ERROR'
}

export interface FunctionRunConfig { [key: string]: number | string | boolean }

/**
 * Abstract implementation of Anser functions.
 */
export abstract class AnserFunction {
	constructor (
		public description: FunctionDescription,
		public config: FunctionRunConfig,
		public status: FunctionStatus = FunctionStatus.NOTUSED,
		public logger?: winston.Logger
	) {
		if (!logger) {
			this.logger = anserlog
		}
	}

	/** Returns true if it is possible for this function to be run on a particular worker. */
	public async CanRun (): Promise<boolean> {
		if (this.Validate()) {
			return this.canRun()
		}

		return Promise.resolve(false)
	}
	/** Starts this function. */
	public async Start (): Promise<boolean> {
		if (this.Validate()) {
			return this.start()
		}

		return Promise.resolve(false)
	}
	/** Stops this function. */
	public abstract async Stop (): Promise<boolean>
	/** Restarts this function. */
	public async Restart (): Promise<boolean> {
		await this.Stop()
		const started = await this.Start()
		return Promise.resolve(started)
	}
	/** Validates function config. */
	public abstract Validate (): boolean
	/** Function start implementation. */
	protected abstract start (): Promise<boolean>
	/** Checks on whether function can run. */
	protected abstract canRun (): Promise<boolean>
}
