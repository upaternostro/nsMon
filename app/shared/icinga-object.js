// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
import { STATE_OK, STATE_SERVICE_WARNING, STATE_SERVICE_CRITICAL, STATE_SERVICE_UNKNOWN, NOT_ACKNOWLEDGED, STICKY_ACKNOWLEDGED, HARD_STATE, STATE_HOST_DOWN } from '~/shared/constants'

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

    get isNotAcknowledged() {
        return this.attrs.acknowledgement == NOT_ACKNOWLEDGED;
    }

    get isStickyAcknowledged() {
        return this.attrs.acknowledgement == STICKY_ACKNOWLEDGED;
    }

    get isHardState() {
        return this.attrs.state_type == HARD_STATE;
    }

    compare(other) {
        if (!other instanceof IcingaObject) {
            throw new Error("Can't compare with alien class!");
        }

        if (this.attrs.problem && !other.attrs.problem) return -1;
        if (!this.attrs.problem && other.attrs.problem) return 1;

        var c = other.attrs.acknowledgement - this.attrs.acknowledgement;
        if (c != 0) return -c;

        c = other.attrs.state - this.attrs.state;
        if (c != 0) return c;

        return 0;
    }
}

export class IcingaHost extends IcingaObject {
    constructor() {
        super('Host');
    }

    get isDown() {
        return this.attrs.state == STATE_HOST_DOWN;
    }

    compare(other) {
        var c = super.compare(other);
        if (c != 0) return c;

        c = this.attrs.name.localeCompare(other.attrs.name);
        if (c != 0) return c;

        return 0;
    }
}

export class IcingaService extends IcingaObject {
    constructor() {
        super('Service');
    }

    get isWarning() {
        return this.attrs.state == STATE_SERVICE_WARNING;
    }

    get isCritical() {
        return this.attrs.state == STATE_SERVICE_CRITICAL;
    }

    get isUnknown() {
        return this.attrs.state == STATE_SERVICE_UNKNOWN;
    }

    compare(other) {
        var c = super.compare(other);
        if (c != 0) return c;

        c = other.attrs.state - this.attrs.state;
        if (c != 0) return c;

        c = this.attrs.host_name.localeCompare(other.attrs.host_name);
        if (c != 0) return c;

        c = this.attrs.name.localeCompare(other.attrs.name);
        if (c != 0) return c;

        return 0;
    }
}
