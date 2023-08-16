#!/bin/bash

# This Bash script accepts a single argument that must be one of three specific values: "major", "minor", or "patch".
# It uses the standard-version library to update the project version based on the argument value.
#
# @see https://www.npmjs.com/package/standard-version

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 [major|minor|patch]"
  exit 1
fi

case $1 in
  major|minor|patch)
    npx standard-version --release-as $1
    ;;
  *)
    echo "Invalid argument value. Usage: $0 [major|minor|patch]"
    exit 1
    ;;
esac
