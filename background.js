// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const OFFSCREEN_DOCUMENT_PATH = '/offscreen.html';

chrome.action.onClicked.addListener(async () => {
  await chrome.offscreen.createDocument({
    url: OFFSCREEN_DOCUMENT_PATH,
    reasons: [chrome.offscreen.Reason.DOM_PARSER],
    justification: 'Parse DOM'
  }).catch(e => {
    if (e.message !== 'Only a single offscreen document may be created.') throw e;
  });

  // Array of HTML contents
  const htmlContents = [
    '<html><head></head><body><h1>Hello World 1</h1></body></html>',
    '<html><head></head><body><h1>Hello World 2</h1></body></html>',
    '<html><head></head><body><h1>Hello World 3</h1></body></html>',
    '<html><head></head><body><h1>Hello World 4</h1></body></html>',
    '<html><head></head><body><h1>Hello World 5</h1></body></html>'
  ];

  // Send message to offscreen document
  const res = await chrome.runtime.sendMessage({
    type: 'add-exclamationmarks-to-headings',
    data: htmlContents,
  });

  console.log(res);
  await chrome.offscreen.closeDocument();
});
