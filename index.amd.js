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

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _fs = require('fs');

var PORT = 4244;

/**
 * Creates a board web server.
 *
 * @param pathToBoards - Path to board templates.
 * @param boards - Board configuration object.
 */
var create = function create(cwd, pathToBoards, boards) {
  void boards;

  var app = (0, _express2['default'])();

  app.use(_express2['default']['static']((0, _path.join)(__dirname, 'public')));
  app.use('/boards', _express2['default']['static']((0, _path.join)(cwd, pathToBoards)));

  // TODO: instead of doing this relative to board path, use cwd to resolve
  // all the paths. which also means getting rid of  `pathToBoards` parameter
  // as well, since it can be computed from cwd anyways.
  app.use('/css', _express2['default']['static']((0, _path.join)(cwd, pathToBoards, '../assets/css')));

  app.get('/:board', function (req, res) {
    // TODO: sanity check

    (0, _fs.createReadStream)((0, _path.join)(__dirname, 'layout/index.html')).pipe(res);
  });

  app.listen(PORT);
};

exports.create = create;

//# sourceMappingURL=index.amd.js.map