import createError from 'http-errors';

export const MISSING_PARAMETERS = createError(400, 'missing-parameters');
