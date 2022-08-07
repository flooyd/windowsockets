import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';

export let blah = [];
blah.push(5);

export const add = (item) => {
  blah = [...blah, item];
};

export const deleteAll = () => {
  blah = [];
};

const logger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike('windowsback'),
      ),
      level: 'silly',
      eol: '\r\n',
    }),
  ],
});

export default logger;
