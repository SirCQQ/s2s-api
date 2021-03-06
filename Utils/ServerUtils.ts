import { Schema,isValidObjectId } from "mongoose"
const { extractDbErrorMessage } = require('./database');

const PAGE_SIZE = 25;

const AUTH_EXPIRATION = 30; // days
const MAX_NAME_LENGTH = 255;
const MAX_DESCRIPTION_LENGTH = 255;
const MAX_USERNAME_LENGTH = 100;

class ServerError extends Error {
  code;

  message;

  constructor(code, err, ...rest) {
    super(...rest);

    this.code = code || 500;

    err = err || 'Oops! Asta nu trebuia să se întâmple 😬';

    if (typeof err === 'object') {
      this.message = extractDbErrorMessage(err);
    } else {
      this.message = err;
    }
  }

  send(res) {
    res.status(this.code);
    res.json({
      code: this.code,
      message: this.message,
    });
  }
}

function setTokenCookie(token, res) {
  res.cookie('token', token);
}

/** Verify that payload doesn't have extra props not present on the Schema */
function validateAgainstSchemaProps(payload, Schema) {
  const keys = Object.keys(payload);
  console.log("Keys:",keys,"\nschemaObj:",Schema.obj)
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    console.log(key in Schema.obj)
    if (!(key in Schema.obj)) {
      throw new ServerError(400, `Property '${key}' cannot be directly set.`);
    }
  }
}

function validateObjectId(_id:Schema.Types.ObjectId|string) {
  if (!isValidObjectId(_id)) {
    throw new ServerError(400, `Value '${_id}' is not a valid ObjectId identifier`);
  }
}

export  {
  ServerError,
  PAGE_SIZE,
  AUTH_EXPIRATION,
  MAX_NAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  setTokenCookie,
  validateAgainstSchemaProps,
  validateObjectId,
}