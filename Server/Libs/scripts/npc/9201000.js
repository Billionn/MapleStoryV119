var status = -1;
var firstSelection = -1;
var secondSelection = -1;
var ingredients_0 = Array(4011004, 4021007);
var ingredients_1 = Array(4011006, 4021007);
var ingredients_2 = Array(4011007, 4021007);
var ingredients_3 = Array(4021009, 4021007);
var mats = Array();
var mesos = Array(10000000, 20000000, 30000000);

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	status--;
    }
    if (status == 0) {
	if (cm.getPlayer().getMarriageId() > 0) {
	    cm.sendNext("�A�w�g���B�F�A���ݭn�A�s�@�٫�!");
	    cm.dispose();
	} else {
	    cm.sendSimple("�A�n�A�ڥi�H���U�A�ƻ�?\r\n#b#L0#�s�@����٫�#l\r\n#L1#�s�@�P���٫�#l\r\n#L2#�s�@���ߧ٫�#l\r\n#L3#�s�@���p�٫�#l#k");
	}
    } else if (status == 1) {
	firstSelection = selection;
	cm.sendSimple("�ڪ��D�F�A�A�n�ƻ�ؤo?\r\n#b#L0#1 �J��#l\r\n#L1#2 �J��#l\r\n#L2#3 �J��#l#k");
    } else if (status == 2) {
	secondSelection = selection;
	var prompt = "In that case, I'm going to need specific items from you in order to make it. Make sure you have room in your inventory, though!#b";
	switch(firstSelection) {
	    case 0:
		mats = ingredients_0;
		break;
	    case 1:
		mats = ingredients_1;
		break;
	    case 2:
		mats = ingredients_2;
		break;
	    case 3:
		mats = ingredients_3;
		break;
	    default:
		cm.dispose();
		return;
	}
	for(var i = 0; i < mats.length; i++) {
	    prompt += "\r\n#i"+mats[i]+"##t" + mats[i] + "# x 1";
	}
	prompt += "\r\n#i4031138# " + mesos[secondSelection]; + " meso";
	cm.sendYesNo(prompt);
    } else if (status == 3) {
	var complete = true;
	if (cm.getMeso() < mesos[secondSelection]) {
	    cm.sendOk("No meso, no item.");
		complete = false;
	} else {
	    for (var i = 0; i < mats.length; i++) {
		if (!cm.haveItem(mats[i], 1)) {
		    complete = false;
		    break;
		}
	    }
	    if (!complete) {
		cm.sendOk("No ingredients, no item.");
	    } else {
		cm.sendOk("There we go! Fresh ring made with your materials and mesos! Go propose to someone!");
		cm.gainMeso(-mesos[secondSelection]);
		for (var i = 0; i < mats.length; i++) {
		    cm.gainItem(mats[i], -1);
		}
		cm.gainItem(2240004 + (firstSelection * 3) + secondSelection, 1);
	    }
	}
	cm.dispose();
    }
}