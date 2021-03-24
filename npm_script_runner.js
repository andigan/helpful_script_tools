const { exec, spawn } = require('child_process');

process.stdout.write('\n');
process.stdout.write('---------------');
process.stdout.write('\n');

exec('npm run', (err, stdout, stderr) => {

  if (err) {
    // node couldn't execute the command
    return;
  }

  // get scripts from the stdout
  const output = stdout.split('\n');

  const markerIndex = output.findIndex((line) => {return line === 'available via `npm run-script`:'});

  const scripts = output
    .slice(markerIndex + 1)
    .filter((line, i) => {return i % 2 === 0})
    .slice(0, -1)
    .map((el, i) => { return [i, el.slice(2)] });

  // display the scripts
  scripts.forEach((script) => {
    process.stdout.write(`${script[0]}) ${script[1]}\n`);
  })

  process.stdout.write('\n');
  let stdin = process.openStdin();
  process.stdout.write(': ');

  stdin.addListener("data", function(input) {
    // note: input is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that
    // with toString() and then trim()

    process.stdout.write('\n');

    let trimmedInput = input.toString().trim();
    let scriptName;

    if (
      isNaN(trimmedInput)
      || trimmedInput === ''
      || parseInt(trimmedInput) > scripts.length - 1
      || parseInt(trimmedInput) < 0
    ) {
      process.stdout.write('---------------');
      process.stdout.write('\n');
      process.stdout.write('INPUT NOT VALID');
      process.stdout.write('\n');
      process.stdout.write('---------------');
      process.stdout.write('\n');
      process.exit();
    } else {

      scriptName = scripts[trimmedInput][1]

      spawn('npm', ['run', scriptName], { stdio: 'inherit' });

    };
  });
});
