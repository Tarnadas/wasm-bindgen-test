const fs = require('fs');
const path = require('path');
const exec = require('child_process').execSync;

exec('cargo +nightly build --target=wasm32-unknown-unknown');
exec('wasm-bindgen target/wasm32-unknown-unknown/debug/wasm_bindgen_test.wasm --out-dir .');
const rsTypingsPath = path.join(__dirname, 'wasm_bindgen_test.d.ts');
const rsPath = path.join(__dirname, 'wasm_bindgen_test.js');
let rsTypings = fs.readFileSync(
  rsTypingsPath,
  {
    encoding: 'utf8'
  }
);
rsTypings += 'export function wasmBooted(): () => Promise<void>;';
fs.writeFileSync(path.join(__dirname, 'src/rust/lib.rs.d.ts'), rsTypings);
fs.unlinkSync(rsPath);
fs.unlinkSync(rsTypingsPath);
