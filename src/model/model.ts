export class ApplicationForm {
    private _address: string;
    private _importance: string;
    private _category: string;
    private _description: string;

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get category(): string {
        return this._category;
    }

    set category(value: string) {
        this._category = value;
    }

    get address(): string {
        return this._address;
    }

    set address(value: string) {
        this._address = value;
    }

    set importance(value: string) {
        this._importance = value;
    }


    constructor(_address: string,
                _importance: string,
                _category: string,
                _description: string) {
        this._address = _address
        this._importance = _importance
        this._category = _category
        this._description = _description
    }

}

export class ApplicationRequest extends ApplicationForm {
    get pfoto(): any {
        return this._pfoto;
    }

    set pfoto(value: any) {
        this._pfoto = value;
    }

    get date(): number {
        return this._date;
    }

    set date(value: number) {
        this._date = value;
    }

    get userId(): number {
        return this._userId;
    }

    set userId(value: number) {
        this._userId = value;
    }

    private _userId: number;
    private _date: number;
    private _pfoto: any;

    constructor(
        _address: string,
        _importance: string,
        _category: string,
        _description: string,
        _userId: number,
        _date: number,
        _pfoto: any
    ) {
        super(
            _address,
            _importance,
            _category,
            _description
        );
        this._date = _date;
        this._pfoto = _pfoto;
        this._userId = _userId
    }

}