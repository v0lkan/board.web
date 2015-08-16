'use strict';

/*
 *  ______                     _________
 *  ___  /_____________ _____________  /
 *  __  __ \  __ \  __ `/_  ___/  __  /
 *  _  /_/ / /_/ / /_/ /_  /   / /_/ /
 *  /_.___/\____/\__,_/ /_/    \__,_/
 *      a minimalist dashboard and monitoring solution.
 *
 * This program is distributed under the terms of the MIT license.
 * Please see `LICENSE.md` file for details.
 *
 * Send your comments and suggestions to…
 * <https://github.com/v0lkan/board/issues>
 */

/**
 * @module board.web
 *
 * This is a web server "Factory"; that is, it's goal is to use different server
 * technologies to serve the board files based on the environment.
 *
 * - An express static file server for development;
 * - An NGINX application for production.
 *
 * Currently it only creates the express.js server.
 */

// TODO: add some basic logging.

import express from 'express';
import {join} from 'path';
import {createReadStream} from 'fs';
const PORT = 4244;

/**
 * Creates a board web server.
 *
 * @param pathToBoards - Path to board templates.
 * @param boards - Board configuration object.
 */
let create = (cwd, pathToBoards, boards) => {
    void boards;

    let app = express();

    app.use(express.static(join(__dirname, 'public')));
    app.use('/boards', express.static(join(cwd, pathToBoards)));

    // TODO: instead of doing this relative to board path, use cwd to resolve
    // all the paths. which also means getting rid of  `pathToBoards` parameter
    // as well, since it can be computed from cwd anyways.
    app.use('/css', express.static(join(cwd, pathToBoards, '../assets/css')));

    app.get('/:board', function(req, res) {
        // TODO: sanity check

        createReadStream(join(__dirname, 'layout/index.html')).pipe(res);
    });

    app.listen(PORT);
};

export {create};
