import { wasmBooted, send_example_to_js } from '../rust/lib.rs';

(async () => {
  await wasmBooted;
  const a = send_example_to_js();
  console.log(a);
})();
