var batteryDB = "osBattery";
var version = 1;

var db;
var request = indexedDB.open(batteryDB, version);

request.onerror = function(event) {
	console.error("Can't open indexedDB!!!", event);
};
request.onsuccess = function(event) {
	console.log("Database opened ok");
	db = event.target.result;
};

request.onupgradeneeded = function(event) {

	console.log("Running onUpgradeNeeded");

	db = event.target.result;

	if (!db.objectStoreNames.contains("osBatteryConfiguration")) {

		console.log("Creating objectStore for osBattery");

		var objectStore = db.createObjectStore("osBatteryConfiguration", {
			keyPath : "id",
			autoIncrement : true
		});
		objectStore.createIndex("name", "name", {
			unique : false
		});

		console.log("Adding a default osBattery configuration");
		var defaultOsBattery = new osBatteryConfiguration();
		objectStore.add(defaultOsBattery);
	}
};

/**
 * This osBattery function is used to create new osBattery configurations.
 * 
 * @constructor
 */

function osBatteryConfiguration() {
	this.name = "System";
	this.description = "Default osBattery configuration";
	this.alarmBatteryChargingChange = false;
	this.dataBatteryChargingChange = 0;
	this.alarmBatteryChargingFired = false;
	this.alarmBatteryLevelChange = false;
	this.dataBatteryLevelChange = 0;
	this.alarmBatteryLevelFired = false;
	this.created = Date.now();
	this.modified = Date.now();
}

/**
 * This function is used to save a osBatteryConfiguration into the indexedDB
 * database. It is called on the 'change' event of the text inputs, so it is
 * very aggressive. The idea behind this is that the user never needs to save a
 * osBatteryConfiguration for it is always in the saved state.
 * 
 * @param inosBattery
 * @param inCallback
 */
function saveOsBatteryConfiguration(inosBattery, inCallback) {
	var transaction = db.transaction(["osBatteryConfiguration"], "readwrite");
	console.log("Saving osBatteryConfiguration");

	transaction.oncomplete = function(event) {
		console.log("All done");
	};

	transaction.onerror = function(event) {
		console.error("Error saving osBatteryConfiguration:", event);
		inCallback({
			error : event
		}, null);

	};

	var objectStore = transaction.objectStore("osBatteryConfiguration");

	inosBattery.modified = Date.now();

	var request = objectStore.put(inosBattery);
	console.log("data saved" + inosBattery.dataBatteryLevelChange);
	request.onsuccess = function(event) {
		console.log("osBatteryConfiguration saved with id: " + request.result);
		inCallback(null, request.result);

	};
}

function getConfiguration(name, inCallBack) {
	var transaction = db.transaction("osBatteryConfiguration", "readonly");
	console.log("Get the default osBatteryConfiguration");
	var store = transaction.objectStore("osBatteryConfiguration");
	var index = store.index("name");
	var request = index.get("System");
	
	request.onsuccess = function() {
		var matching = request.result;
		if(matching !== 'undefined'){
			inCallBack(null, matching);
		}
	};
}