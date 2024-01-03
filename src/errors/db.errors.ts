// Using any for all the errors as we don't know the type of error

export const isDuplicateKeyError = (error: any) => {
  return 'code' in error && error['code'] === '23505';
};

export const isForeignKeyError = (error: any) => {
  return 'code' in error && error['code'] === '23503';
};
