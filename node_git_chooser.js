const { exec } = require('child_process');

process.stdout.write('\n');
process.stdout.write('---------------');
process.stdout.write('\n');

exec('git branch', (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    return;
  }

  // get branches from the stdout
  let branches = stdout.split('\n').map((line, index) => {
    return [index, line];
  }).slice(0, -1);

  // display the branches
  branches.forEach((branch) => {
    process.stdout.write(`${branch[0]}) ${branch[1]} \n`);
  })

  process.stdout.write('\n');
  let stdin = process.openStdin();
  process.stdout.write(': ');

  stdin.addListener("data", function(input) {
    // note: input is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that
    // with toString() and then trim()

    process.stdout.write('\n');

    if (isNaN(input.toString().trim()) || input.toString().trim() === '' || parseInt(input.toString().trim()) > branches.length - 1 || parseInt(input.toString().trim()) < 0) {
      process.stdout.write('---------------');
      process.stdout.write('\n');
      process.stdout.write('INPUT NOT VALID');
      process.stdout.write('\n');
      process.stdout.write('---------------');
      process.stdout.write('\n');
      process.exit();
    } else {
      exec(`git checkout ${branches[input.toString().trim()][1]}`, (err, stdout, stderr) => {
        if (err) {
          console.log(stderr);
        }
        exec(`git branch`, (err, stdout, stderr) => {
          process.stdout.write(stdout);
          process.stdout.write('\n');
          process.exit();
        });
      });
    };
  });
});
