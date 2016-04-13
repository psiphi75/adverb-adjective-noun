/*********************************************************************
 *                                                                   *
 *   Copyright 2016 Simon M. Werner                                  *
 *                                                                   *
 *   Licensed to the Apache Software Foundation (ASF) under one      *
 *   or more contributor license agreements.  See the NOTICE file    *
 *   distributed with this work for additional information           *
 *   regarding copyright ownership.  The ASF licenses this file      *
 *   to you under the Apache License, Version 2.0 (the               *
 *   "License"); you may not use this file except in compliance      *
 *   with the License.  You may obtain a copy of the License at      *
 *                                                                   *
 *      http://www.apache.org/licenses/LICENSE-2.0                   *
 *                                                                   *
 *   Unless required by applicable law or agreed to in writing,      *
 *   software distributed under the License is distributed on an     *
 *   "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY          *
 *   KIND, either express or implied.  See the License for the       *
 *   specific language governing permissions and limitations         *
 *   under the License.                                              *
 *                                                                   *
 *********************************************************************/

'use strict';

/*******************************************************************************
 *                                                                             *
 *                                   Load Modules                              *
 *                                                                             *
 *******************************************************************************/

var fs = require('fs');
var config = require('./config');

/*******************************************************************************
 *                                                                             *
 *                                   Load word lists                           *
 *                                                                             *
 *******************************************************************************/

var adverbs = readFile(config.adverbs);
var adjectives = readFile(config.adjectives);
var nouns = readFile(config.nouns);
var used = readFile(config.used_filename);

/*******************************************************************************
 *                                                                             *
 *                                   Main                                      *
 *                                                                             *
 *******************************************************************************/


var aan = createAAN();
while (used.indexOf(aan) >= 0) {
    aan = createAAN();
}
console.log(aan);
fs.appendFileSync(config.used_filename, '\n' + aan);

function createAAN() {
    return rndWord(adverbs).trim() + ' ' + rndWord(adjectives).trim() + ' ' + rndWord(nouns).trim();
}

function rndWord(arr) {
    var i = Math.random() * (arr.length - 1);
    i = Math.round(i);
    return arr[i];
}

function readFile(filename) {
    var strList = fs.readFileSync(filename, 'utf8').split('\n');
    var result = [];
    strList.forEach(function (str) {
        str = str.trim();
        if (str !== '') {
            result.push(str.trim());
        }
    });
    return result;
}
