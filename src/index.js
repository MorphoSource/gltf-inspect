#! /usr/bin/env node

import pkg from '@caporal/core';
const { program } = pkg;

import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { inspect } from '@gltf-transform/functions';

import draco3d from 'draco3dgltf';
import { MeshoptEncoder, MeshoptDecoder } from 'meshoptimizer';

async function parse(documentPath) {
  await MeshoptDecoder.ready;
  await MeshoptEncoder.ready;
  const dependencies = {
    'draco3d.decoder': await draco3d.createDecoderModule(),
    'draco3d.encoder': await draco3d.createEncoderModule(),
    'meshopt.decoder': MeshoptDecoder,
    'meshopt.encoder': MeshoptEncoder,
  };

  const io = new NodeIO()
    .registerExtensions(ALL_EXTENSIONS)
    .registerDependencies(dependencies);

  const document = await io.read(documentPath);
  return inspect(document);
}

program
  .name("gltf-inspect")
  .version("0.2.0")
  .description("Export JSON information about GLTF or GLB 3D assets. Based on @gltf-transform/cli's inspect command.")
  .argument("<input>", "GLTF or GLB file to inspect")
  .action(async ({ args }) => {
    // Parse document
    const report = await parse(args.input);
    console.log(JSON.stringify(report, null, 4));
  })

program.run()
