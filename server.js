const express = require('express');
const app = express();
const ngrok = require('ngrok');
const { exec } = require("child_process");

const port = process.env.IFFT_PORT || 8080;
const shared_secret = process.env.IFFT_SHARED_SECRET || '3m)(1!P_2po(*1';
const cmd_prefix = 'IFFT_CMD_';

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
      console.log('\t/ifft/'+element.slice(cmd_prefix.length)+'?shared_secret='+shared_secret);
    });

});


ngrok.connect({
    proto : 'http',
    addr : process.env.PORT,
}, (err, url) => {
    if (err) {
        console.error('Error while connecting Ngrok',err);
        return new Error('Ngrok Failed');
    }
});

