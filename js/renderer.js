const fkill = require('fkill');
const $ = require('jquery');
const child_process = require('child_process');
const fs = require('fs');
const os = require('os');
const eapp = require('electron').remote.app;

let log = (a) => {
	let prevText = $("#log").text();
	if (a === "!breaker") {
		$("#log").text(`${prevText}--------------------${os.EOL}`);
	} else {
		$("#log").text(`${prevText}${a}${os.EOL}`);
	}
};

//Navbar actions
$("#ext").click(() => {
	require('electron').remote.app.quit();
});

$("#minim").click(() => {
	require('electron').remote.getCurrentWindow().minimize();
});

//Other buttons' actions
$( "#kill" ).click(() => {
	//This is quite wide ranged and produces errors in the console but fine for now
	fkill("arma3server_x64.exe", {force: true}).then(() => {
		log("arma3server_x64.exe killed");
	});
	fkill("arma3_x64.exe", {force: true}).then(() => {
		log("arma3_x64.exe killed");
	});
	
	fkill("arma3server.exe", {force: true}).then(() => {
		log("arma3server.exe killed");
	});
	fkill("arma3.exe", {force: true}).then(() => {
		log("arma3.exe killed");
	});
});
$( "#pack" ).click(() => {
	let packpath = $('#packpath').val();
	child_process.exec(packpath, function(error, stdout, stderr) {
		log("!breaker");
		if (error) {
			log(error);
		}
		log(stdout);
		log("!breaker");
	});
});
$( "#build" ).click(() => {
	let packpath = $('#packpath').val();
	child_process.exec(packpath, function(error, stdout, stderr) {
		log("!breaker");
		if (error) {
			log(error);
		}
		log(stdout);
		log("!breaker");
	});
});
$( "#clear" ).click(() => {
	$("#log").text(`Here you go, a fresh log!${os.EOL}`);
	$("#alog").text("");
});
//Save settings to a json file from which they are loaded to the app
$( "#save" ).click(() => {
	fs.writeFile(`${eapp.getPath("userData")}\\settings.json`, JSON.stringify({"packpath": $('#packpath').val(),"buildpath": $('#buildpath').val(),"srvrpath": $('#srvrpath').val(),"params": $('#params').val(),"logs": $('#logs').val()}), (err) => {
		if (err) throw err;
		log("Saved preferences");
	});
});
//Take care of all logfiles and arma3server's rpts in the logs folder to not have million files there
$("#flush").click(() => {
	let path = $('#logs').val();
	if( fs.existsSync(path) ) {
		fs.readdirSync(path).forEach((file, index) => {
			if (file.substr(0,11) === "arma3server" || file.substr(0,7) === "logfile") {
				fs.unlinkSync(`${path}\\${file}`);
			}
		});
	}
	log("Flushed logs folder");
});
//Gets the file that was last edited and returns stuff
let getLatest = (logs) => {
	let bestTime = 0;
	let file = "";
	let thang = (newBest,f) => {
		bestTime = newBest;
		file = f;
	};
	fs.readdirSync(logs).forEach((file, index) => {
		if (file.substr(0,11) === "arma3server") {
			let time = fs.statSync(`${logs}\\${file}`).mtime;
			if (time > bestTime) {
				thang(time,file);
			};
		}
	});
	return {f: file, t: bestTime, ltm: (new Date().getTime() - bestTime) < 60000};
}

$("#refresh").click(() => {
	let logs = $('#logs').val();
	log(`Opening a3server log from: ${logs}\\${getLatest(logs).f}`);
	fs.open(`${logs}\\${getLatest(logs).f}`, 'wx', (err, fd) => {
	  if (err) {
		if (err.code === 'EEXIST') {
			fs.readFile(`${logs}\\${getLatest(logs).f}`, (err, data) => {
				$("#alog").text(data);
			});
		} else {
			$("#alog").text("No logs found!");
		}
	  }
	});
});

$( "#startsrvr" ).click(() => {
	let srvrpath = $('#srvrpath').val();
	let params = $('#params').val();
	let logs = $('#logs').val();
	let file = `"${srvrpath}" ${params}`;
	let dir = eapp.getPath("userData") + '\\Bats';
	let path = dir + '\\startserver.bat';
	
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}
	fs.writeFile(path, file, (err) => {
		if (err) throw err;
		log(`Arma 3 Server startup file created at ${path}`);
		child_process.exec(path, function(error, stdout, stderr) {
			log("!breaker");
			if (error) {
				log(error);
			} else {
				log(stdout);
			}
			log("!breaker");
		});
	});

	let wait = (interval) => {
		let checkFunc = function() {
			let res = getLatest(logs);
			if(res.ltm) {
				fs.watch(`${logs}\\${res.f}`, function(event, filename) {
					console.log("Event:", event);
					if (event == "change") {
						fs.readFile(`${logs}\\${res.f}`,"UTF-8", function(err, data) {
							if (err) throw err;
							$("#alog").text(data);
						});
					}

				});
			}
			else
			{
				setTimeout(checkFunc, interval);
			}
		};
		checkFunc();
	};
	wait(100);
	

});

// Express side of things. Here we listen for requests to the log

const express = require('express');
const app = express();

app.get("/log/:msg", function (req, res) {
  log(`WebLogger: ${req.params.msg}`);
  res.send({status: "Logged successfully", success: true});
});

let listener = app.listen(3000, function () {
	$("#log").text("");
	//Initialize message with version getting from rpf-data server
	$.get("https://rpf-data.glitch.me/v", function(version, stat){
		log(`Initialized RPFUtility. Current RPFramework version is ${version}. Current RPFUtility version is ${eapp.getVersion()}`);
		log('WebLogger: Your log listener is listening on port ' + listener.address().port);
		log('WebLogger: Test it in your browser "localhost:3000/log/Your message here"');
	});
});
