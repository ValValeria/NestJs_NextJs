import {Injectable, Scope} from '@nestjs/common';

@Injectable({
    scope: Scope.TRANSIENT
})
export class ResponseService<T> {
    private _data: {[prop: string]: T} = {};
    private _status: 'ok' | 'bad' = 'bad';
    private _messages: string[] = [];
    private _errors: string[] = [];


    get data(): { [p: string]: T } {
        return this._data;
    }

    set data(value: { [p: string]: T }) {
        this._data = value;
    }

    get status(): "ok" | "bad" {
        return this._status;
    }

    set status(value: "ok" | "bad") {
        this._status = value;
    }

    get messages(): string[] {
        return this._messages;
    }

    set messages(value: string[]) {
        this._messages = value;
    }

    get errors(): string[] {
        return this._errors;
    }

    set errors(value: string[]) {
        this._errors = value;
    }

    getResponseJson(...propertiesToHide: string[]): string{
        if(propertiesToHide.length){
            const func = (key: string, value: any) => {
                return propertiesToHide.includes(key) ? undefined: value;
            }

            return JSON.stringify(this, func)
        }

        return JSON.stringify(this);
    }
}
