export default class EventEmitter {
    private listeners;
    addListener(name: string, callback: (data: unknown) => unknown): void;
    removeListener(name: string, callback: (data: unknown) => unknown): void;
    on: (name: string, callback: (data: unknown) => unknown) => void;
    off: (name: string, callback: (data: unknown) => unknown) => void;
    emit(name: string, data?: unknown): void;
}
//# sourceMappingURL=events.d.ts.map