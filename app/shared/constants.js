// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
export const DATE_DIALOG_CLOSE_OK       = "date-dialog-close-ok";
export const DATE_DIALOG_CLOSE_CANCEL   = "date-dialog-close-cancel";
export const TIME_DIALOG_CLOSE_OK       = "time-dialog-close-ok";
export const TIME_DIALOG_CLOSE_CANCEL   = "time-dialog-close-cancel";

export const STATE_OK                   = 0;

export const STATE_SERVICE_OK           = STATE_OK;
export const STATE_SERVICE_WARNING      = 1;
export const STATE_SERVICE_CRITICAL     = 2;
export const STATE_SERVICE_UNKNOWN      = 3;

export const STATE_HOST_OK              = STATE_OK;
export const STATE_HOST_DOWN            = 1;

export const NOT_ACKNOWLEDGED           = 0;
export const ACKNOWLEDGED               = 1;
export const STICKY_ACKNOWLEDGED        = 2;

export const SOFT_STATE                 = 0;
export const HARD_STATE                 = 1;
