#!/bin/bash

# Check if a filename was provided
if [ -z "$1" ]; then
  echo "Usage: $0 <three-digit ex number, e.g. 010>"
  echo "e.g. npm run ex 010"
  exit 1
fi

# Ensure $1 is a three-digit string
if [[ ! "$1" =~ ^[0-9]{3}$ ]]; then
  echo "Error: Argument must be a three-digit string like 010"
  exit 1
fi

# Find the file matching ex$1?????????????
filename=$(ls ex"$1"* 2>/dev/null | head -n 1)

if [ -z "$filename" ]; then
  echo "Error: No file found matching ex$1?????????????"
  exit 1
fi

# Type-check with tsc (no output files), then execute with tsx
clear
echo "> npm run ex $1"
echo "==================================="
echo "$filename"
echo "==================================="
npx tsc --noEmit "$filename" && npx tsx "$filename"
echo "==================================="