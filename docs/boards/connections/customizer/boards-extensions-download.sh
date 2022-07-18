#!/usr/bin/env bash
# You must get your GITHUB_TOKEN correct, or nothing will happen!
curl -s \
-H "Accept: application/vnd.github.v3+json" \
-H "Authorization: token ${GITHUB_TOKEN}" \
https://api.github.com/repos/isw-kudos/boards-extensions/releases/latest | \
  grep -Eo "https:\/\/api\.github\.com\/repos\/isw-kudos\/boards-extensions\/releases\/assets\/[0-9]+" | \
    xargs curl -vLJ --output ./boards-extensions.tgz \
    -H "Accept: application/octet-stream" \
    -H "Authorization: token ${GITHUB_TOKEN}"