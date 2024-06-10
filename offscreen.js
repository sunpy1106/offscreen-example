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

// Registering this listener when the script is first executed ensures that the
// offscreen document will be able to receive messages when the promise returned
// by `offscreen.createDocument()` resolves.
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'add-exclamationmarks-to-headings') {
    sendResponse(addExclamationMarksToHeadings(msg.data));
  }
});

function addExclamationMarksToHeadings(htmls) {
  const parser = new DOMParser();
  return htmls.map(html => {
    const doc = parser.parseFromString(html, 'text/html');
    for (const el of doc.querySelectorAll('h1')) el.append('!!!');
    return doc.documentElement.outerHTML;
  });
}
