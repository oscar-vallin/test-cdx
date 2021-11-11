'use strict';

import fs from 'fs';
import path from 'path';
//import chalk from 'chalk';
import { URL_ROUTES } from './../src/data/constants/RouteConstants';

(async () => {
  //console.log(chalk.blue('Extracting top level routes (URL_ROUTES) from RouteContants.js'))

  const routes = Object.entries(URL_ROUTES)
    .filter(([key, value]) => value.split('/').filter((val) => val !== '').length === 1)
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

  //console.log(chalk.yellow('Parsed routes:', JSON.stringify(routes)))

  try {
    fs.writeFileSync('./internals/parent-routes.json', JSON.stringify(routes));

    //console.log(chalk.green('Routes extracted successfully to /internals/parent-routes.json'))
  } catch (err) {
    //console.log(chalk.red('An error occurred while creating parent-routes.json'), err.message || err);
  }
})();
