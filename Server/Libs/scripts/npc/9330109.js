/* Kedrick
	Fishking King NPC
*/

/* global cm */

var status = -1;
var sel;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
		if (status == 0) {
			cm.dispose();
			return;
		}
	status--;
    }

    if (status == 0) {
	cm.sendSimple("�A�Q������H#b\n\r #L1#�ʶR������#l \n\r #L3#�ϥΰ��ų������Y#l#k");
    } else if (status == 1) {
	sel = selection;
	if (sel == 1) {
	    cm.sendYesNo("120����ݭn300000�����C �z�n�ʶR�ܡH");
	} else if (sel == 3) {
	    if (cm.canHold(2300001,120) && cm.haveItem(5350000,1)) {
		if (!cm.haveItem(2300001)) {
		    cm.gainItem(2300001, 120);
		    cm.gainItem(5350000,-1);
		    cm.sendNext("Happy Fishing~");
		} else {
		    cm.sendNext("�A�w�g������C");
		}
	    } else {
		cm.sendOk("Please check if you have sufficient inventory slot and the Delicious Bait Can from cash shop with you.");
	    }
	    cm.safeDispose();
	}
    } else if (status == 2) {
	if (sel == 1) {
	    if (cm.canHold(2300000,120) && cm.getMeso() >= 300000) {
		if (!cm.haveItem(2300000)) {
		    cm.gainMeso(-300000);
		    cm.gainItem(2300000, 120);
		    cm.sendNext("Happy Fishing~");
		} else {
		    cm.sendNext("�A�w�g������C");
		}
	    } else {
		cm.sendOk("Please check if you have the required meso or sufficient inventory slot.");
	    }
	    cm.safeDispose();
	}
    }
}