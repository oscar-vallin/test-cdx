// noinspection ES6PreferShortImport

'use strict';

import fs from 'fs';
import { URL_ROUTES } from '../src/data/constants/RouteConstants.js';

(async () => {
  //console.log(chalk.blue('Extracting top level routes (URL_ROUTES) from RouteConstants.js'))

  const routes = Object.entries(URL_ROUTES)
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

  //console.log(chalk.yellow('Parsed routes:', JSON.stringify(routes)))

  try {
    fs.writeFileSync('./internals/parent-routes.json', JSON.stringify(routes));

    //console.log(chalk.green('Routes extracted successfully to /internals/parent-routes.json'))
  } catch (err) {
    //console.log(chalk.red('An error occurred while creating parent-routes.json'), err.message || err);
  }
})();
