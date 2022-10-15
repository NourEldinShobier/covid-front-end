enum ResultType {
  Success = "Success",
  Failure = "Failure",
}

export type Result<S, F> = SuccessResult<S, F> | FailureResult<S, F>;
export type RollbackFunction = (() => void) | (() => Promise<void>);

abstract class ResultBase<S, F> {
  constructor(
    protected readonly resultType: ResultType,
    private valueOrFailure: S | F,
    private rollbackFn?: RollbackFunction
  ) {}

  public get canRollback(): boolean {
    return this.rollbackFn != null;
  }

  public get isSuccess(): boolean {
    return this.resultType === ResultType.Success;
  }

  public get isFailure(): boolean {
    return this.resultType === ResultType.Failure;
  }

  public get value(): S {
    if (this.isFailure)
      throw new Error("[Result] value is undefined, use failure instead");
    return this.valueOrFailure as S;
  }

  public get failure(): F {
    if (this.isSuccess)
      throw new Error("[Result] failure is undefined, use value instead");
    return this.valueOrFailure as F;
  }

  public get valueOrNull(): S | null {
    if (this.isFailure) return null;
    return this.valueOrFailure as S;
  }

  public get failureOrNull(): F | null {
    if (this.isSuccess) return null;
    return this.valueOrFailure as F;
  }

  public valueOrDefault(defualt: S): S {
    if (this.isFailure) return defualt;
    return this.value;
  }

  public ifSuccess<T>(callback: (value: S) => T): T;
  public async ifSuccess<T>(
    callback: (value: S) => Promise<T>
  ): Promise<T | undefined> {
    if (this.isSuccess) return callback(this.valueOrFailure as S);
  }

  public ifFailure<T>(callback: (value: F) => T): T;
  public async ifFailure<T>(
    callback: (value: F) => Promise<T>
  ): Promise<T | undefined> {
    if (this.isFailure) return callback(this.valueOrFailure as F);
  }

  public when(params: {
    success: (value: S) => void;
    failure: (value: F) => void;
  }): void {
    if (this.isSuccess) params.success(this.valueOrFailure as S);
    else if (this.isFailure) params.failure(this.valueOrFailure as F);
  }

  public toString(): string {
    return `[Result] type: ${this.resultType.toString()}, value: ${
      this.valueOrFailure
    }`;
  }

  public rollback(): void;
  public async rollback(): Promise<void> {
    if (this.rollbackFn) return this.rollbackFn();
    else throw new Error("[Result] rollback function is null");
  }
}

export class SuccessResult<S, F> extends ResultBase<S, F> {
  public constructor(public readonly v: S, rollbackFn?: RollbackFunction) {
    super(ResultType.Success, v, rollbackFn);
  }
}

export class FailureResult<S, F> extends ResultBase<S, F> {
  public constructor(public readonly f: F, rollbackFn?: RollbackFunction) {
    super(ResultType.Failure, f, rollbackFn);
  }
}

export namespace Result {
  export function success<S, F>(
    value: S,
    rollbackFn?: RollbackFunction
  ): SuccessResult<S, F> {
    return new SuccessResult(value, rollbackFn);
  }

  export function failure<S, F>(
    failure: F,
    rollbackFn?: RollbackFunction
  ): FailureResult<S, F> {
    return new FailureResult(failure, rollbackFn);
  }
}
