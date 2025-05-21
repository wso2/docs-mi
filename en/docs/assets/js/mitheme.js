/*!
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/*
* Handle opening external links in a new tab
*/
/* 
 * Initialize highlightjs 
 */
window.addEventListener("DOMContentLoaded", function() {
    hljs.initHighlightingOnLoad();
});
(function() {
    if(document.querySelector('.tab-selector')){
        document.querySelector('.tab-selector').addEventListener('click', function(e) {
            // Show hide tab content next to the clicked tab
            var tabContentToShow = e.target.nextElementSibling;
            if(tabContentToShow.style.display === 'none') {
                tabContentToShow.style.display = 'block';
            } else {
                tabContentToShow.style.display = 'none';
            }
        });
    }
})();

/*
 * Initialize custom dropdown component
 */
var dropdowns = document.getElementsByClassName('md-tabs__dropdown-link');
var dropdownItems = document.getElementsByClassName('mb-tabs__dropdown-item');

function indexInParent(node) {
    var children = node.parentNode.childNodes;
    var num = 0;
    for (var i=0; i < children.length; i++) {
         if (children[i]==node) return num;
         if (children[i].nodeType==1) num++;
    }
    return -1;
}

for (var i = 0; i < dropdowns.length; i++) {
    var el = dropdowns[i];
    var openClass = 'open';

    el.onclick = function () {
        if (this.parentElement.classList) {
            this.parentElement.classList.toggle(openClass);
        } else {
            var classes = this.parentElement.className.split(' ');
            var existingIndex = classes.indexOf(openClass);

            if (existingIndex >= 0)
                classes.splice(existingIndex, 1);
            else
                classes.push(openClass);

            this.parentElement.className = classes.join(' ');
        }
    };
};

/*
 * Reading versions
 */
var pageHeader = document.getElementById('page-header');
var docSetLang = pageHeader.getAttribute('data-lang');

(window.location.pathname.split('/')[1] !== docSetLang) ?
    docSetLang = '' :
    docSetLang = docSetLang + '/';

var docSetUrl = window.location.origin + '/' + docSetLang;
var request = new XMLHttpRequest();

request.open('GET', docSetUrl +
             'versions/assets/versions.json', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {

      var data = JSON.parse(request.responseText);
      var dropdown =  document.getElementById('version-select-dropdown');
      var checkVersionsPage = document.getElementById('current-version-stable');

      /*
       * Appending versions to the version selector dropdown
       */
      if (dropdown){
          data.list.sort().forEach(function(key, index){
              var versionData = data.all[key];

              if(versionData) {
                  var liElem = document.createElement('li');
                  var docLinkType = data.all[key].doc.split(':')[0];
                  var target = '_self';
                  var url = data.all[key].doc;

                  var currentPath= window.location.pathname;
                     // Find the index of '/en/'
                  var pathWithoutEn = currentPath.substring(4,currentPath.length);
                  var pathWithoutVersion = pathWithoutEn.substring(pathWithoutEn.indexOf("/"), pathWithoutEn.length)

                  url = docSetUrl + key+ pathWithoutVersion;


                  liElem.className = 'md-tabs__item mb-tabs__dropdown';
                  liElem.innerHTML =  '<a href="'+ url+'">' + key + '</a>';

                  dropdown.insertBefore(liElem, dropdown.firstChild);
              }
          });

          document.getElementById('show-all-versions-link')
              .setAttribute('href', docSetUrl + 'versions');
      }

      /*
       * Appending versions to the version tables in versions page
       */
      if (checkVersionsPage){
          var previousVersions = [];

          Object.keys(data.all).forEach(function(key, index){
              if ((key !== data.current) && (key !== data['pre-release'])) {
                  var docLinkType = data.all[key].doc.split(':')[0];
                  var target = '_self';

                  if ((docLinkType == 'https') || (docLinkType == 'http')) {
                      target = '_blank'
                  }

                  previousVersions.push('<tr>' +
                    '<th>' + key + '</th>' +
                        '<td>' +
                            '<a href="' + data.all[key].doc + '" target="' +
                                target + '">Documentation</a>' +
                        '</td>' +
                        '<td>' +
                            '<a href="' + data.all[key].notes + '" target="' +
                                target + '">Release Notes</a>' +
                        '</td>' +
                    '</tr>');
              }
          });

          // Past releases update
          document.getElementById('previous-versions').innerHTML =
                  previousVersions.join(' ');

          // Current released version update
          document.getElementById('current-version-number').innerHTML =
                  data.current;
          document.getElementById('current-version-documentation-link')
                  .setAttribute('href', docSetUrl + data.all[data.current].doc);
          document.getElementById('current-version-release-notes-link')
                  .setAttribute('href', docSetUrl + data.all[data.current].notes);

          // Pre-release version update
          document.getElementById('pre-release-version-documentation-link')
              .setAttribute('href', docSetUrl + 'next/');
      }

  } else {
      console.error("We reached our target server, but it returned an error");
  }
};

request.onerror = function() {
    console.error("There was a connection error of some sort");
};

request.send();

document.addEventListener("DOMContentLoaded", function () {
    var searchInput = document.querySelector("input.md-search__input");
    let timeout = null;

    if (searchInput) {
        searchInput.addEventListener("input", function (event) {
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                let searchTerm = event.target.value.trim();
                dataLayer.push({'event':'search','searchTerm':searchTerm});
            }, 500);
        });
    }
});

var feedback = document.forms.feedback

if (hasUserAcceptedCookies() && !isHomePage()) {
    feedback.hidden = false
}

feedback.addEventListener("submit", function(ev) {
  ev.preventDefault()

  var page = document.location.pathname
  var data = ev.submitter.getAttribute("data-md-value")

  const pageLabel = page + "_" + data;
  dataLayer.push({'event':'feedback','pageLabel':pageLabel});

  feedback.firstElementChild.disabled = true

  var note = feedback.querySelector(
    ".md-feedback__note [data-md-value='" + data + "']"
  )
  if (note)
    note.hidden = false
})

function isHomePage() {
    return window.location.pathname === "/" || window.location.pathname === "/en/latest/";
}

function hasUserAcceptedCookies() {
    const consentCookie = document.cookie.split('; ').find(row => row.startsWith('OptanonConsent='));
    if (consentCookie) {
        return consentCookie.includes('isGpcEnabled=0'); // Check if user has interacted with consent
    }
    return false;
}

// Utility function to process tutorial steps
function processTutorialSteps(title, steps) {
    document.querySelectorAll("label.md-nav__title").forEach(label => {
        if (label.textContent.trim() === title) {
            const ul = label.nextElementSibling;
            if (ul && ul.tagName === "UL") {
                ul.classList.add("custom-integration-list");
                const listItems = ul.querySelectorAll("li");
                let count = 1;
                let completed = true;
                listItems.forEach(li => {
                    const link = li.querySelector("a.md-nav__link");
                    if (link) {
                        const linkText = link.textContent.trim();
                        if (steps.includes(linkText)) {
                            // Remove any existing numbers (if script runs again)
                            link.innerHTML = link.innerHTML.replace(/^\d+\.\s*/, "");
                            link.innerHTML = `<span class="custom-number">${count}</span> ${link.innerHTML}`;
                            count++;
                            if (completed) {
                                li.classList.add("md-nav__link--completed");
                            }
                            if (li.classList.contains("md-nav__item--active")) {
                                console.log("active");
                                completed = false;
                            }
                        }
                    }
                });
            }
        }
    });
}

// Define the exact displayed names for "Build your first integration" steps
const integrationSteps = [
    "Develop an Integration API",
    "Route and Transform messages",
    "Connect to SaaS or B2B Systems",
    "Monitor and Manage Integrations"
];


// Define the exact displayed names for "Build your first ai integration" steps
const aiIntegrationSteps = [
    "Build an AI Chatbot",
    "Build a Knowledge Base",
    "Connect a Knowledge Base to the Chatbot",
    "Create an AI Agent"
];

// Process tutorials
processTutorialSteps("Build your first Integration", integrationSteps);
processTutorialSteps("Build your first AI Integration", aiIntegrationSteps);
