// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
import { STATE_OK, STATE_WARNING, STATE_CRITICAL, STATE_UNKNOWN, NOT_ACKNOWLEDGED, STICKY_ACKNOWLEDGED, HARD_STATE } from '~/shared/constants'

/**
 * @abstract
 */
export class IcingaObject {
    attrs;
    joins;
    meta;
    name;
    type;

    constructor(type) {
        if (this.constructor === IcingaObject) {
            throw new Error("Can't instantiate abstract class!");
        }

        this.attrs = {};
        this.joins = {};
        this.meta = {};
        this.name = '';
        this.type = type;
    }

    static instantiateObject(jsonObject) {
        var retval;

        switch (jsonObject.type) {
            case 'Host':
                retval = new IcingaHost();
                break;
            case 'Service':
                retval = new IcingaService();
                break;
            default:
                throw new Error("Unknown Icinga object type " + jsonObject.type);
        }

        return retval;
    }

    static assignObject(jsonObject) {
        return Object.assign(this.instantiateObject(jsonObject), jsonObject);
    }

    get isOk() {
        return this.attrs.state == STATE_OK;
    }

    get isWarning() {
        return this.attrs.state == STATE_WARNING;
    }

    get isCritical() {
        return this.attrs.state == STATE_CRITICAL;
    }

    get isUnknown() {
        return this.attrs.state == STATE_UNKNOWN;
    }

    get isNotAcknowledged() {
        return this.attrs.acknowledgement == NOT_ACKNOWLEDGED;
    }

    get isStickyAcknowledged() {
        return this.attrs.acknowledgement == STICKY_ACKNOWLEDGED;
    }

    get isHardState() {
        return this.attrs.state_type == HARD_STATE;
    }
}

export class IcingaHost extends IcingaObject {
    constructor() {
        super('Host');
    }
}

export class IcingaService extends IcingaObject {
    constructor() {
        super('Service');
    }
}
