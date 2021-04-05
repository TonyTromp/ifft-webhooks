const express = require('express');
const app = express();
const ngrok = require('ngrok');
const { exec } = require("child_process");

const port = process.env.IFFT_PORT;
const shared_secret = process.env.IFFT_SHARED_SECRET || '3m)(1!P_2po(*1';
const cmd_prefix = 'IFFT_CMD_';
const custom_var_prefix='IFFT_VAR_';

/* TEST CMD */
process.env.IFFT_CMD_WEBHOOK_TEST="ls -l"

app.get('/', (req, res) => {
    res.send('command not found. Commands should be in the form of: /ifft/COMMAND?shared_secret=xyz');
});

app.get('/ifft/:cmd', function(req , res){
  /* Validate if SHARED_SECRET is found */
  let rsecret  = req.query.shared_secret;
  if (rsecret == shared_secret) {
    console.log('Trying: '+cmd_prefix + req.params.cmd );
    let shell_cmd = process.env[ cmd_prefix + req.params.cmd];

    if (shell_cmd ) {
 
      // CHECK IF WE NEED TO REPLACE ANY VALUESa
      custom_vars = Object.keys(process.env).filter(
        key => key.match( custom_var_prefix )
      );

      custom_vars.forEach(element => {
	shell_cmd = shell_cmd.replace('['+ element.slice(custom_var_prefix.length) +']', process.env[element] );
      });

      console.log('executing: '+ shell_cmd);
      res.send('Executing: ' + shell_cmd);

      /* Executing pre-defined command */
      exec(shell_cmd, (error, stdout, stderr) => {
          if (error) {
              console.log(`error: ${error.message}`);
              return;
          }
          if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
          }
          console.log(`stdout: ${stdout}`);
      });


    } else {
      res.send('Command not found.');
    }
  } else { 
    res.send('Incorrect shared secret. /ifft/<COMMAND>?shared_secret=<SECRET>');
  }
});

function start_webserver(ngrok_url) {
  const server = app.listen(port, () => {
    console.log('IFFT Webhooks running on port: '+ port);
    console.log('IFFT_SHARED_SECRET: '+ shared_secret);
    console.log('\nPredifine your own webhook commands in bash/shell using environment variables');
    console.log('\texport IFFT_CMD_<YOUR_TRIGGER_NAME>="<YOUR_CMD_HERE>" ');

    console.log('\nAvailable Webhooks:" ');
    available_commands = Object.keys(process.env).filter(
        key => key.match( cmd_prefix )        
    );

    available_commands.forEach(element => {
      console.log('\t'+ngrok_url+'/ifft/'+element.slice(cmd_prefix.length)+'?shared_secret='+shared_secret);
    });

  });
}


ngrok.connect(port).then(function(result){
  start_webserver(result);
});

