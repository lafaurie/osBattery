(function() {

	var App = {
		version : 'v0.0.1',
		defaultConfiguration : {},
		settings : {
			INTERVAL_DEFAULT : 1000 * 10,
			INTERVAL_BATTERY_LOW : 1000 * 60 * 10,
			SELECTED_TAB : 'panel1',
			BATTERY_LEVEL_DATA : [ [ 1046.5591, 0.001 ], [ 1044.7091, 1.851 ],
					[ 1042.8569599999998, 3.70198 ], [ 1041.00589, 5.55297 ],
					[ 1039.15482, 7.40396 ], [ 1037.30375, 9.25495 ],
					[ 1035.4526799999999, 11.10594 ], [ 1033.60161, 12.95693 ],
					[ 1031.75054, 14.80792 ], [ 1029.8994699999998, 16.65891 ],
					[ 1028.0484, 18.5099 ], [ 1026.19733, 20.360889999999998 ],
					[ 1024.34626, 22.21188 ],
					[ 1022.49519, 24.062869999999997 ],
					[ 1020.6441199999999, 25.91386 ],
					[ 1018.79305, 27.764849999999996 ],
					[ 1016.94198, 29.61584 ], [ 1015.0909099999999, 31.46683 ],
					[ 1013.23984, 33.31782 ], [ 1011.3887699999999, 35.16881 ],
					[ 1009.5377, 37.0198 ], [ 1007.6866299999999, 38.87079 ],
					[ 1005.83556, 40.721779999999995 ],
					[ 1003.9844899999999, 42.57277 ],
					[ 1002.1334199999999, 44.42376 ], [ 1000.28235, 46.27475 ],
					[ 998.4312799999999, 48.12573999999999 ],
					[ 996.58021, 49.976729999999996 ],
					[ 994.7291399999999, 51.82772 ], [ 992.87807, 53.67871 ],
					[ 991.0269999999999, 55.52969999999999 ],
					[ 989.17593, 57.380689999999994 ], [ 987.32486, 59.23168 ],
					[ 985.4737899999999, 61.08267 ], [ 983.62272, 62.93366 ],
					[ 981.7716499999999, 64.78465 ], [ 979.92058, 66.63564 ],
					[ 978.0695099999999, 68.48662999999999 ],
					[ 976.21844, 70.33762 ], [ 974.3673699999999, 72.18861 ],
					[ 972.5163, 74.0396 ][970.66523, 75.89058999999999],
					[ 968.8141599999999, 77.74158 ], [ 966.96309, 79.59257 ],
					[ 965.1120199999999, 81.44355999999999 ],
					[ 963.26095, 83.29455 ], [ 961.4098799999999, 85.14554 ],
					[ 959.55881, 86.99653 ], [ 957.70774, 88.84752 ],
					[ 955.8566699999999, 90.69850999999998 ],
					[ 954.0056, 92.5495 ],
					[ 952.1545299999999, 94.40048999999999 ],
					[ 950.30346, 96.25147999999999 ],
					[ 948.4523899999999, 98.10247 ],
					[ 946.60132, 99.95345999999999 ],
					[ 944.7502499999999, 101.80445 ],
					[ 942.8991799999999, 103.65544 ], [ 941.04811, 105.50643 ],
					[ 939.1970399999999, 107.35742 ],
					[ 937.34597, 109.20840999999999 ],
					[ 935.4948999999999, 111.05939999999998 ],
					[ 933.64383, 112.91038999999999 ],
					[ 931.7927599999999, 114.76137999999999 ],
					[ 929.9416899999999, 116.61237 ], [ 928.09062, 118.46336 ],
					[ 926.23955, 120.31434999999999 ],
					[ 924.38848, 122.16534 ], [ 922.5374099999999, 124.01633 ],
					[ 920.68634, 125.86732 ], [ 918.8352699999999, 127.71831 ],
					[ 916.9841999999999, 129.5693 ],
					[ 915.1331299999999, 131.42029 ], [ 913.28206, 133.27128 ],
					[ 911.43099, 135.12227 ],
					[ 909.5799199999999, 136.97325999999998 ],
					[ 907.72885, 138.82425 ], [ 905.8777799999999, 140.67524 ],
					[ 904.02671, 142.52623 ], [ 902.1756399999999, 144.37722 ],
					[ 900.32457, 146.22821 ], [ 898.4735, 148.0792 ],
					[ 896.6224299999999, 149.93018999999998 ],
					[ 894.77136, 151.78117999999998 ],
					[ 892.9202899999999, 153.63216999999997 ],
					[ 891.06922, 155.48316 ], [ 889.2181499999999, 157.33415 ],
					[ 887.36708, 159.18514 ],
					[ 885.5160099999999, 161.03612999999999 ],
					[ 883.6649399999999, 162.88711999999998 ],
					[ 881.81387, 164.73810999999998 ], [ 879.9628, 166.5891 ],
					[ 878.11173, 168.44008999999997 ],
					[ 876.2606599999999, 170.29108 ], [ 874.40959, 172.14207 ],
					[ 872.5585199999999, 173.99306 ],
					[ 870.7074499999999, 175.84404999999998 ],
					[ 868.85638, 177.69504 ], [ 863.31219, 183.248 ],
					[ 865.16321, 181.397 ], [ 867.0141, 179.54601 ],
					[ 861.46112, 185.099 ] ]
		},

		run : function() {
			App.updateBatteryStatus();
			App.initDefaultConfiguration();
		},
		/**
		 * Load previously saved settings
		 */
		initDefaultConfiguration : function() {
			if (!db) {
				// HACK:
				// this condition may happen upon first time use when the
				// indexDB storage is under creation and refreshMemoList()
				// is called. Simply waiting for a bit longer before trying
				// again
				// will make it work.
				console.warn("Database is not ready yet");
				setTimeout(App.initDefaultConfiguration, 1000);
				return;
			}

			getConfiguration(
					"System",
					function(err, value) {
						if (value) {
							App.defaultConfiguration = value;
							App.initViewComponents();
							console.log("Default configuration loaded id: "
									+ App.defaultConfiguration.id);
							console.log("Configuration name is: "
									+ App.defaultConfiguration.name);
							console
									.log("Alarms data level: "
											+ App.defaultConfiguration.dataBatteryLevelChange);
							console
									.log("Alarms data chargin level: "
											+ App.defaultConfiguration.dataBatteryChargingChange);
						}
					});
		},

		/**
		 * Initializes the different components of the application
		 */
		initViewComponents : function() {
			if (App.defaultConfiguration.alarmBatteryLevelChange) {
				document.getElementById("checkbatterylevel").setAttribute(
						"checked", "checked");
				document.getElementById("batterylevel").setAttribute(
						"battery-level", true);
			}
			document.getElementById("ariabattery").setAttribute(
					"aria-valuenow",
					App.defaultConfiguration.dataBatteryLevelChange);
			document.getElementById("batteryleveltext").innerHTML = App.defaultConfiguration.dataBatteryLevelChange;
			if (App.defaultConfiguration.alarmBatteryChargingChange) {
				document.getElementById("checkchargelevel").setAttribute(
						"checked", "checked");
				document.getElementById("chargelevel").setAttribute(
						"charge-level", true);
			}
			document.getElementById("ariacharge").setAttribute("aria-valuenow",
					App.defaultConfiguration.dataBatteryChargingChange);
			document.getElementById("chargeleveltext").innerHTML = App.defaultConfiguration.dataBatteryChargingChange;
			utils.seekbars.init();
		},

		/**
		 * Saves the configuration of the alarms
		 */
		putAlarm : function() {
			var batteryCheked = document.getElementById("checkbatterylevel").checked;
			var chargeCheked = document.getElementById("checkchargelevel").checked;
			if (batteryCheked) {
				if (!App.defaultConfiguration.alarmBatteryLevelChange) {

					App.defaultConfiguration.dataBatteryLevelChange = parseInt(document
							.getElementById("ariabattery").getAttribute(
									"aria-valuenow"));
					if (App.defaultConfiguration.dataBatteryLevelChange > 0) {
						App.defaultConfiguration.alarmBatteryLevelChange = true;
					}
				} else {
					actualValue = parseInt(document.getElementById(
							"ariabattery").getAttribute("aria-valuenow"));
					if (actualValue != App.defaultConfiguration.dataBatteryLevelChange
							&& actualValue > 0) {
						App.defaultConfiguration.dataBatteryLevelChange = actualValue;
					}
				}
			} else {
				App.defaultConfiguration.alarmBatteryLevelChange = false;
			}
			/**/
			if (chargeCheked) {
				if (!App.defaultConfiguration.alarmBatteryChargingChange) {
					App.defaultConfiguration.dataBatteryChargingChange = parseInt(document
							.getElementById("ariacharge").getAttribute(
									"aria-valuenow"));
					if (App.defaultConfiguration.dataBatteryChargingChange > 0) {
						App.defaultConfiguration.alarmBatteryChargingChange = true;
					}
				} else {
					actualValue = parseInt(document
							.getElementById("ariacharge").getAttribute(
									"aria-valuenow"));
					if (actualValue != App.defaultConfiguration.dataBatteryChargingChange
							&& actualValue > 0) {
						App.defaultConfiguration.dataBatteryChargingChange = actualValue;
					}
				}
			} else {
				App.defaultConfiguration.alarmBatteryChargingChange = false;
			}

			saveOsBatteryConfiguration(App.defaultConfiguration, function(
					error, data) {

			});
			alert("The configuration was saved successfully!");
		},

		/**
		 * Updates the status of the battery each time it changes
		 */
		updateBatteryStatus : function() {

			var battery = navigator.battery || navigator.mozBattery
					|| navigator.webkitBattery;

			var output = document.querySelector("#battery-info");

			/* Gets the battery charge level */
			var charge = Math.floor(battery.level * 100);

			/* Detects whether the battery is charging */
			var charging = battery.charging ? 'Charging' : 'No charging';

			/* Gets the time remaining based on charging / discharging */
			var batteryLevel = App.settings.BATTERY_LEVEL_DATA[(charge < 100) ? charge
					: charge - 1];

			var batteryImage = document.querySelector('#rect3013');
			/* Set the level of the battery */
			batteryImage.setAttribute("height", batteryLevel[1]);
			batteryImage.setAttribute("y", batteryLevel[0]);
			/* Set the battery color */
			var cssClass = 'battery-good';
			if (charge <= 10) {
				cssClass = 'battery-bad';
			} else if (charge < 50) {
				cssClass = 'battery-less';
			}
			batteryImage.setAttribute("class", cssClass);

			var timeLeft = battery.charging ? ' ('
					+ Math.floor(battery.chargingTime / 60) + ' mins)' : ' ('
					+ Math.floor(battery.dischargingTime / 60) + ' mins)';

			output.innerHTML = 'Status : ' + charging + '<br />' + 'Level : '
					+ charge + ' % <br />' + 'Time left : ' + timeLeft;
		},

		changeTab : function(event) {
			var target = event.target;
			selectedTab = document.getElementById(App.settings.SELECTED_TAB);
			selectedTab.setAttribute("aria-selected", false);
			App.settings.SELECTED_TAB = target.getAttribute("tab");
			var newTab = document.getElementById(App.settings.SELECTED_TAB);
			newTab.setAttribute("aria-selected", true);
		},

		showTip : function(event) {
			var target = event.target;
			className = (target.className == 'cabtab2') ? 'show-tip'
					: 'cabtab2';
			continer = document.getElementById(target.getAttribute('continer'));
			showTip = (continer.getAttribute("show-tip") == 'true') ? false
					: true;
			continer.setAttribute("show-tip", showTip);
			target.className = className;
		},

		enableBatteryNotification : function(event) {
			var target = event.target;
			level = document.getElementById(target.getAttribute('type-bar'));
			type = level.getAttribute('type-level');
			enable = '';
			if (type == 'battery') {
				enable = level.getAttribute('battery-level');
				if (enable == 'true') {
					level.setAttribute("battery-level", false);
				} else {
					level.setAttribute("battery-level", true);
				}
			} else if (type == 'charge') {
				enable = level.getAttribute('charge-level');
				if (enable == 'true') {
					level.setAttribute("charge-level", false);
				} else {
					level.setAttribute("charge-level", true);
				}
			}
		},

		changeSpinnerValue : function(event) {
			var target = event.target;
			spinnerType = target.getAttribute("spinner-type");
			slider = document.getElementById(target.getAttribute("aria-id"));
			labelText = document.getElementById(slider.getAttribute("text-id"));
			value = parseInt(slider.getAttribute("aria-valuenow"));
			if (spinnerType == "more" && value < 100) {
				value++;
				slider.setAttribute("aria-valuenow", value);
				labelText.innerHTML = value;
				utils.seekbars.init();
			} else if (spinnerType == "less" && value > 0) {
				value--;
				slider.setAttribute("aria-valuenow", value);
				labelText.innerHTML = value;
				utils.seekbars.init();
			}
		},

		notify : function(subject, text, pic, callback) {
			App.lastNot = navigator.mozNotification.createNotification(subject,
					text, pic);
			App.lastNot.onclick = function() {
				callback();
			};
			App.lastNot.show();
		},

		alarmSet : function(data) {
			if (navigator.mozAlarms) {
				var req = navigator.mozAlarms.add(new Date(Date.now()
						+ App.settings.INTERVAL_BATTERY_LOW), 'ignoreTimezone',
						data);
				req.onsuccess = function() {
				}
				req.onerror = function() {
				}
			} else {
			}
		},

		/**
		 * Verified if the value is equal to the level battery
		 * 
		 * @param value
		 * @returns {the value 0 if the argument value is equal to battery
		 *          level; a value less than 0 if this value is less than the
		 *          battery level; and a value greater than 0 if this value is
		 *          greater than the battery level.}
		 */
		compareBatteryStatus : function(value) {
			var charge = App.actualBatteryLevel();
			if (value == charge)
				return 0;
			else if (value > charge)
				return 1;
			else
				return -1;
		},

		actualBatteryLevel : function() {
			var battery = navigator.battery || navigator.mozBattery
					|| navigator.webkitBattery;
			/* Gets the battery charge level */
			var charge = Math.floor(battery.level * 100);
			return charge;
		},

		isCharging : function() {
			var battery = navigator.battery || navigator.mozBattery
					|| navigator.webkitBattery;
			return battery.charging;
		},

		fireAlarm : function() {
			if (App.defaultConfiguration.alarmBatteryLevelChange) {
				var compare = App
						.compareBatteryStatus(App.defaultConfiguration.dataBatteryLevelChange);
				if (compare == 0) {
					App.notify("Battery notification!", "The level is: "
							+ App.defaultConfiguration.dataBatteryLevelChange
							+ "%", null, function() {

					});
				}
			}

			if (App.isCharging()
					&& App.defaultConfiguration.alarmBatteryChargingChange) {
				compare = App
						.compareBatteryStatus(App.defaultConfiguration.dataBatteryChargingChange);
				if (compare == 0) {
					App
							.notify(
									"Battery notification!",
									"The charge level is: "
											+ App.defaultConfiguration.dataBatteryChargingChange
											+ "%", null, function() {

									});
				}
			}
		}
	};

	window.addEventListener('load', function() {
		App.run();
		document.getElementById("linkpanel1").addEventListener("click",
				App.changeTab, false);
		document.getElementById("linkpanel2").addEventListener("click",
				App.changeTab, false);
		document.getElementById("linkpanel3").addEventListener("click",
				App.changeTab, false);
		document.getElementById("tip1").addEventListener("click", App.showTip,
				false);
		document.getElementById("tip2").addEventListener("click", App.showTip,
				false);
		document.getElementById("tip3").addEventListener("click", App.showTip,
				false);
		document.getElementById("tip4").addEventListener("click", App.showTip,
				false);
		document.getElementById("tip5").addEventListener("click", App.showTip,
				false);
		document.getElementById("tip6").addEventListener("click", App.showTip,
				false);
		document.getElementById("checkchargelevel").addEventListener("click",
				App.enableBatteryNotification, false);
		document.getElementById("checkbatterylevel").addEventListener("click",
				App.enableBatteryNotification, false);
		document.getElementById("spinner1").addEventListener("click",
				App.changeSpinnerValue, false);
		document.getElementById("spinner2").addEventListener("click",
				App.changeSpinnerValue, false);
		document.getElementById("spinner3").addEventListener("click",
				App.changeSpinnerValue, false);
		document.getElementById("spinner4").addEventListener("click",
				App.changeSpinnerValue, false);
		document.getElementById("buttonsettings").addEventListener("click",
				App.putAlarm, false);
	}, false);

	window.addEventListener("beforeunload", function() {
		if (App.defaultConfiguration.alarmBatteryLevelChange
				|| App.defaultConfiguration.alarmBatteryChargingChange)
			App.alarmSet({
				type : "appload"
			});
	}, false);
	
	window.addEventListener("unload", function() {
		if (App.defaultConfiguration.alarmBatteryLevelChange
				|| App.defaultConfiguration.alarmBatteryChargingChange)
			App.alarmSet({
				type : "appload"
			});
	}, false);

	var battery = navigator.battery || navigator.mozBattery
			|| navigator.webkitBattery;

	if (battery) {
		battery.addEventListener('chargingchange', function() {
			App.fireAlarm();
			App.updateBatteryStatus();
		}, false);
		battery.addEventListener('levelchange', function() {
			App.fireAlarm();
			App.updateBatteryStatus();
		}, false);
		battery.addEventListener('dischargingtimechange', function() {
			App.updateBatteryStatus();
		}, false);
	}

	navigator.mozSetMessageHandler("alarm", function(message) {
		navigator.mozApps.getSelf().onsuccess = function _onAppReady(evt) {
			var app = evt.target.result;
			app.launch();
		};
		navigator.mozAlarms.remove(message.id);
	});
})();
