var status = 0;
var exchange = false;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1)
		status++;
	else
		cm.dispose();
	if (status == 0 && mode == 1) {
		var selStr = "�п�ܤ@�ؾݥx�ɳ��a!\r\n#L100#���������лx�I��#l";
		var found = false;
		for (var i = 0; i < 3; i++) {
			if (getCPQField(i + 1) != "") {
				selStr += "\r\n#b#L" + i + "# " + getCPQField(i + 1) + "#l#k";
				found = true;
			}
		}
		if (cm.getParty() == null) {
			cm.sendSimple("�z�S������\r\n#L100#���������лx�I��#l");
		} else {
			if (cm.isLeader()) {
				if (found) {
					cm.sendSimple(selStr);
				} else {
					cm.sendSimple("There are no rooms at the moment.\r\n#L100#���������лx�I��#l");
				}
			} else {
				cm.sendSimple("�Хs�A�������ӧ��\r\n#L100#���������лx�I��#l");
			}
		}
	} else if (status == 1) {
		if (selection == 100) {
			exchange = true;
			cm.sendSimple("#b#L0#50 Maple Coin = Spiegelmann Necklace#l\r\n#L1#30 Maple Coin = Spiegelmann Marble#l\r\n#L2#50 Sparkling Maple Coin = Spiegelmann Necklace of Chaos#l#k");
		} else if (selection >= 0 && selection < 3) {
			var mapid = 980030000 + ((selection + 1) * 1000);
			if (cm.getEventManager("cpq2").getInstance("cpq" + mapid) == null) {
				if ((cm.getParty() != null && cm.getParty().getMembers().size() > (selection < 4 ? 1 : 2))) {
					if (checkLevelsAndMap(50, 200) == 1) {
						cm.sendOk("����̦��H���Ť��ŦX.");
						cm.dispose();
					} else if (checkLevelsAndMap(50, 200) == 2) {
						cm.sendOk("����̦���L�H���b���a��.");
						cm.dispose();
				} else if (checkLevelsAndMap(50, 200) == 3) {
					cm.sendOk("����̦���L�H���b���W�D.");
					cm.dispose();
					} else {
						cm.getEventManager("cpq2").startInstance("" + mapid, cm.getPlayer());
						cm.dispose();
					}
				} else {
					cm.sendOk("�z������H�Ƥ���.");
				}
			} else if (cm.getParty() != null && cm.getEventManager("cpq2").getInstance("cpq" + mapid).getPlayerCount() == cm.getParty().getMembers().size() && cm.getParty().getMembers().size() > 1 && cm.getEventManager("cpq2").getInstance("cpq" + mapid).getPlayerCount() > 1) {
				if (checkLevelsAndMap(50, 200) == 1) {
					cm.sendOk("����̦��H���Ť��ŦX.");
					cm.dispose();
				} else if (checkLevelsAndMap(50, 200) == 2) {
					cm.sendOk("����̦���L�H���b���a��.");
					cm.dispose();
				} else if (checkLevelsAndMap(50, 200) == 3) {
					cm.sendOk("����̦���L�H���b���W�D.");
					cm.dispose();
				} else {
					//Send challenge packet here
					var owner = cm.getChannelServer().getPlayerStorage().getCharacterByName(cm.getEventManager("cpq2").getInstance("cpq" + mapid).getPlayers().get(0).getParty().getLeader().getName());
					owner.addCarnivalRequest(cm.getCarnivalChallenge(cm.getChar()));
					//if (owner.getConversation() != 1) {
					cm.openNpc(owner.getClient(), 2042001);
					//}
					cm.sendOk("�z���D�ԽШD�w�g�o�e.");
					cm.dispose();
				}
			} else {
				cm.sendOk("�ⶤ�H�Ƥ��ۦP");
				cm.dispose();
			}
		} else {
			cm.dispose();
		}
	} else if (status == 2) {
		if (exchange) {
			if (selection == 0) {
				if (!cm.haveItem(4001129, 50)) {
					cm.sendOk("���W�S���D��.");
				} else if (!cm.canHold(1122007, 1)) {
					cm.sendOk("�I�]�Ŷ�����");
				} else {
					cm.gainItem(1122007, 1, true);
					cm.gainItem(4001129, -50);
				}
				cm.dispose();
			} else if (selection == 1) {
				if (!cm.haveItem(4001129, 30)) {
					cm.sendOk("���W�S���D��");
				} else if (!cm.canHold(2041211, 1)) {
					cm.sendOk("�I�]�Ŷ�����");
				} else {
					cm.gainItem(2041211, 1);
					cm.gainItem(4001129, -30);
				}
				cm.dispose();
			} else if (selection == 2) {
				if (!cm.haveItem(4001254, 50)) {
					cm.sendOk("���W�S���D��.");
				} else if (!cm.canHold(1122058, 1)) {
					cm.sendOk("�I�]�Ŷ�����");
				} else {
					cm.gainItem(1122058, 1, true);
					cm.gainItem(4001254, -50);
				}
				cm.dispose();
			}
		}
	}
}

function checkLevelsAndMap(lowestlevel, highestlevel) {
	var party = cm.getParty().getMembers();
	var mapId = cm.getMapId();
	var Ch = cm.getClient().getChannel();
	var valid = 0;
	var inMap = 0;

	var it = party.iterator();
	while (it.hasNext()) {
		var cPlayer = it.next();
		if (!(cPlayer.getLevel() >= lowestlevel && cPlayer.getLevel() <= highestlevel)) {
			valid = 1;
		}
		if (cPlayer.getMapid() != mapId) {
			valid = 2;
		}
		if (cPlayer.getChannel() != Ch) {
			valid = 3;
		}
	}
	return valid;
}

function getCPQField(fieldnumber) {
	var status = "";
	var event1 = cm.getEventManager("cpq2");
	if (event1 != null) {
		var event = event1.getInstance("cpq" + (980030000 + (fieldnumber * 1000)));
		if (event == null && fieldnumber < 1) {
			status = "�ݥx�ɳ��a " + fieldnumber + "(2v2)";
		} else if (event == null) {
			status = "�ݥx�ɳ��a " + fieldnumber + "(3v3)";
		} else if (event != null && (event.getProperty("started").equals("false"))) {
			var averagelevel = 0;
			for (i = 0; i < event.getPlayerCount(); i++) {
				averagelevel += event.getPlayers().get(i).getLevel();
			}
			averagelevel /= event.getPlayerCount();
			status = event.getPlayers().get(0).getParty().getLeader().getName() + "/" + event.getPlayerCount() + "users/�������� " + averagelevel;
		}
	}
	return status;
}
