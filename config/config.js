import { config } from 'dotenv';
config({ path: process.ENV });

const constants = {
  dbUri: process.env.URI,
  port: process.env.PORT || '3000',
};

export default constants;
