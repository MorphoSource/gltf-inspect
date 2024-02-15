#! /usr/bin/env node

import pkg from '@caporal/core';
const { program } = pkg;

import { NodeIO } from '@gltf-transform/core';
import { inspect } from '@gltf-transform/functions';

async function parse(documentPath) {
  let io = new NodeIO();
  const jsonDoc = await io.readAsJSON(documentPath);
  const document = await io.readJSON(jsonDoc);
  return inspect(document);
}

program
  .name("gltf-inspect")
  .version("0.0.1")
  .description("Export JSON information about GLTF or GLB 3D assets. Based on @gltf-transform/cli's inspect command.")
  .argument("<input>", "GLTF or GLB file to inspect")
  .action(async ({ args }) => {
    // Parse document
    const report = await parse(args.input);
    console.log(JSON.stringify(report, null, 4));
  })

program.run()
